export default exercises => (exId, input) =>
  exercises[exId].assert({
    ...exercises[exId].givens,
    input,
  });