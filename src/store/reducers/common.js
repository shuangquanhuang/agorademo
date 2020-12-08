const createReducer = (type, initState) => {

  function reducer(state = initState, action) {
    const {type: actualType, payload} = action;

    if (type === actualType) {
      return {...state, ...payload};
    }

    return state;
  }

  return reducer;
}

export default createReducer;
