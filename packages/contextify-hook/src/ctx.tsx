import * as React from "react"

function contextify<T>(useWhatever: () => T) {
  const Context = React.createContext<T>(undefined as unknown as T);

  const Provider: React.FC = ({ children }) => {
    const value = useWhatever()
    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  const useTheContext = (): T => {
    const value = React.useContext(Context)
    if (value === undefined) throw new TypeError(`Empty context`)
    return value
  }

  return [useTheContext, Provider] as const
}

const useStupidCounter = () => {
  const [count, setCount] = React.useState(0)
  const [incr, setIncr] = React.useState<1 | 2 | 3>(1);

  const cbs = React.useMemo(() => ({
    set1: () => setIncr(1),
    set2: () => setIncr(2),
    set3: () => setIncr(3),
    incr: () => setCount(count => count + incr)
  }), [incr])

  return {
    count,
    ...cbs
  }
}

const [useCounterCtx, Provider] = contextify(useStupidCounter);

const C: React.FC = () => {
  const { count, incr, set2 } = useCounterCtx()

  return (
    <>
    <button onClick={incr}>bump {count}</button>
    <button onClick={set2}>set 2</button>
    </>
  )
}

const x = (
  <Provider>
    <C />
  </Provider>
)
