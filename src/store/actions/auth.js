import createAction from './common';
import STORE_TYPE from '../type';

const setChannelName = (channelName) => createAction(STORE_TYPE.AUTH, {channelName});
const setToken = (token) =>  createAction(STORE_TYPE.AUTH, {token});
const setApplicationId = (applicationId) => createAction(STORE_TYPE.AUTH, {applicationId});
const setUserId = (userId) => createAction(STORE_TYPE.AUTH, {userId});
const setExpireTimeInSeconds = (expireTimeInSeconds) => createAction(STORE_TYPE.AUTH, {expireTimeInSeconds});
const setCertificate = (certificate) => createAction(STORE_TYPE.AUTH, {certificate});

const actions = {
  setChannelName,
  setToken,
  setApplicationId,
  setUserId,
  setExpireTimeInSeconds,
  setCertificate,
};

export {
  actions
};
