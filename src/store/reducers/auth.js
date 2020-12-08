import STORE_TYPE from '../type';
import createReducer from './common';

const initialState = {
  channel: null,
  applicationId: null,
  token: null,
  userId: null,
};

const reducer = createReducer(STORE_TYPE.AUTH, initialState);

export {
  reducer,
};
