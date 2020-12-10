import createAction from './common';
import STORE_TYPE from '../type';

const setError = (error) => createAction(STORE_TYPE.MESSAGE, {error});
const setMessage = (message) => createAction(STORE_TYPE.MESSAGE, {message})

const actions = {
  setError,
  setMessage,
};

export {
  actions
};
