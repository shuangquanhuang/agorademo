import STORE_TYPE from '../type';
import createReducer from './common';

const initialState = {
  error: null,
};

const reducer = createReducer(STORE_TYPE.ERROR, initialState);

export {
  reducer,
};
