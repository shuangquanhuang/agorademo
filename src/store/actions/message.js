import STORE_TYPE from '../type';
import createAction from './common';

const setError = (error) => createAction(STORE_TYPE.MESSAGE, {error});
const setMessage = (message) => createAction(STORE_TYPE.MESSAGE, {message})

const actions = {
  setError,
  setMessage,
};

export {
  actions
};
