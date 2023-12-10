Experiment with implementing popular concepts like redux/react-query or
new ways to do stuff that's otherwise tedious in react.

## Contents
- [DIY Redux](./packages/redsux/src/lib/redsux.ts)
  - framework agnostic in 40 lines + react adapter in 15 lines
  - middleware is TODO
- [DIY useMutation](./packages/async-ops/src/index.ts)
  - async operation state tracking (loading, error, success)
  - unmount safety (abort signal is TODO)
  - last received callback safety
- [contextify](./packages/contextify-hook/src/ctx.tsx)
  - pass a hook to it, receive a `useContext` hook and a `Provider`
  - `useContext` accesses the hook return value in any descendants of the `Provider`
  - makes context creation a little less boilerplate-y
  - the code is nothing special, the approach of composing hooks with context is more interesting
