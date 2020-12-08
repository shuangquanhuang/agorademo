import STORE_TYPE from '../type';
import createReducer from './common';

const initialState = {
  channel: null,
  applicationId: null,
  token: null,
};

const authReducer = createReducer(STORE_TYPE.AUTH, initialState);

export default authReducer;
