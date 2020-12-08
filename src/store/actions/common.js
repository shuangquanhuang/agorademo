const createAction = (type, payload) => {
  console.log('action', type, payload);
  return {
    type,
    payload
  };
}

export default createAction;
