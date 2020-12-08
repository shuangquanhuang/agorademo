import STORE_TYPE from '../type';
import createReducer from './common';

const initialState = {
  client: null,
};

const reducer = createReducer(STORE_TYPE.CLIENT, initialState);

export {
  reducer,
};
