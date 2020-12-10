import STORE_TYPE from '../type';
import createReducer from './common';

const initialState = {
  channelName: null,
  applicationId: null,
  token: null,
  userId: null,
  expireTimeInSeconds: 0,
  certificate: null,
};

const reducer = createReducer(STORE_TYPE.AUTH, initialState);

export {
  reducer,
};
