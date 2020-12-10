import STORE_TYPE from '../type';
import createReducer from './common';

const initialState = {
  error: null,
  message: null,
};

const reducer = createReducer(STORE_TYPE.MESSAGE, initialState);

export {
  reducer,
};
