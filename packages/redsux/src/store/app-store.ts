import { mkStore, makeUseSelector } from "../lib/redsux";
import * as actions from "./actions";

type Action = ReturnType<(typeof actions)[keyof typeof actions]>;

type State = {
  counters: Map<number, { name: string; value: number }>;
};

const store = mkStore<State, Action>(
  (action, state) => {
    switch (action.type) {
      case `add`: {
        const { amount, id } = action.payload;
        const counter = state.counters.get(id);
        if (!counter) return state;

        const newCounter = { ...counter, value: counter.value + amount };
        return {
          counters: new Map([...state.counters, [id, newCounter]]),
        };
      }

      case `sub`: {
        const { amount, id } = action.payload;
        const counter = state.counters.get(id);
        if (!counter) return state;

        const newCounter = { ...counter, value: counter.value - amount };
        return {
          counters: new Map([...state.counters, [id, newCounter]]),
        };
      }

      case `newcounter`: {
        const { name, id } = action.payload;
        const newCounter = { name, value: 0 };

        return {
          counters: new Map([...state.counters, [id, newCounter]]),
        };
      }

      default:
        return state;
    }
  },
  { counters: new Map([[0, { name: `initial`, value: 0 }]]) },
);

export const useSelector = makeUseSelector(store);

export const { dispatch } = store;
