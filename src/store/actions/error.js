import createAction from './common';
import STORE_TYPE from '../type';

const setError = (error) => createAction(STORE_TYPE.ERROR, {error});

const actions = {
  setError,
};

export {
  actions
};
