import * as React from "react";
import "./App.css";

import { useSelector, dispatch } from "./store/app-store";
import * as actions from "./store/actions";

const AddCounterInput = () => {
  const nextId =
    useSelector((state) => Math.max(0, ...state.counters.keys())) + 1;
  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get(`name`) as string;
        dispatch(actions.newCounter({ name, id: nextId }));
      }}
    >
      <legend>Anotha one</legend>
      <label>
        <span>Name:</span>
        <input type="text" name="name" />
      </label>
      <input type="submit" />
    </form>
  );
};

function App() {
  const counters = useSelector((state) =>
    Array.from(state.counters).map(([id, counter]) => ({ id, ...counter })),
  );

  return (
    <>
      <header>
        <h1>Redsux </h1>
        <p>(minimal redux implementation without context)</p>
      </header>
      <div className="card">
        <AddCounterInput />
      </div>
      <ul>
        {counters.map((counter) => (
          <li key={counter.id} className="counter">
            <span>Counter: {counter.name}</span>
            <span>Value: {counter.value}</span>
            <button
              onClick={() =>
                dispatch(actions.add({ id: counter.id, amount: 1 }))
              }
            >
              Incr
            </button>
            <button
              onClick={() =>
                dispatch(actions.sub({ id: counter.id, amount: 1 }))
              }
            >
              Decr
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
