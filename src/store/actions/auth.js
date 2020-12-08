import createAction from './common';
import STORE_TYPE from '../type';

const setChannel = (channel) => createAction(STORE_TYPE.AUTH, {channel});
const setToken = (token) =>  createAction(STORE_TYPE.AUTH, {token});
const setApplicationId = (applicationId) => createAction(STORE_TYPE.AUTH, {applicationId});
const setUserId = (userId) => createAction(STORE_TYPE.AUTH, {userId});

const actions = {
  setChannel,
  setToken,
  setApplicationId,
  setUserId,
};

export {
  actions
};
