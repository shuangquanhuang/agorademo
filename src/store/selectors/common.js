const typedSelector = (state, type) => {
  return state[type];
}

export default typedSelector;
