export const action =
  <T extends string>(type: T) =>
  <P>() =>
  (payload: P) => ({
    type,
    payload,
  });
