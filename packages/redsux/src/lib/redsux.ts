import * as React from "react";

export type Store<S extends Record<string, unknown>, A> = {
  state: () => S;
  sub: (fn: (state: S) => void) => () => void;
  dispatch: (action: A) => void;
};

const removeInplace = <T>(xs: T[], value: T) => {
  const index = xs.indexOf(value);
  if (index !== -1) xs.splice(index, 1);
};

export const mkStore = <S extends Record<string, unknown>, A>(
  reducer: (action: A, state: S) => S,
  initialState: S,
): Store<S, A> => {
  type Res = Store<S, A>;

  const listeners: ((state: S) => void)[] = [];

  const sub: Res[`sub`] = (fn) => {
    listeners.push(fn);
    return () => removeInplace(listeners, fn);
  };

  let state: Readonly<S> = initialState;

  const dispatch: Res[`dispatch`] = (action) => {
    state = reducer(action, state);
    for (const fn of listeners) {
      fn(state);
    }
  };

  return {
    state: () => state,
    sub,
    dispatch,
  };
};

export const makeUseSelector =
  <S extends Record<string, unknown>, A>(store: Store<S, A>) =>
  <R>(selector: (state: S) => R) => {
    const [state, setState] = React.useState<R>(() => selector(store.state()));

    const select = React.useRef<typeof selector>(selector);
    select.current = selector;

    React.useEffect(() => {
      const unsub = store.sub((state) => setState(select.current(state)));
      return unsub;
    }, []);

    return state;
  };
