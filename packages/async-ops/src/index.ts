import * as React from "react";

type State<T> =
  | { type: `idle` }
  | { type: `pending` }
  | { type: `error`; error: Error }
  | { type: `success`; data: T };

// eslint-disable-next-line
type AnyAsyncFn = (...args: any[]) => Promise<any>;

const useIsMounted = () => {
  const isMounted = React.useRef(false)

  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return React.useCallback(() => isMounted.current, [])
}

export const useAsyncOperation = <Fn extends AnyAsyncFn>(fn: Fn) => {
  type Ret = Awaited<ReturnType<Fn>>;
  const [state, setState] = React.useState<State<Ret>>({ type: `idle` });

  const fnRef = React.useRef<Fn>(fn);
  fnRef.current = fn;

  const isMounted = useIsMounted();

  const op = React.useCallback<Fn>((...args) => {
    setState({ type: `pending` });
    return fnRef
      .current(...args)
      .then((data: Ret) => {
        if (isMounted()) {
          setState({ type: `success`, data })
        }

        return data
      })
      .catch((error: Error) => {
        if (isMounted()) {
          setState({ type: `error`, error })
        }

        return Promise.reject(error)
      });
  }, [isMounted]);

  return [op, state] as const;
};
