import createAction from './common';
import STORE_TYPE from '../type';

const setClient = (client) => createAction(STORE_TYPE.CLIENT, {client});

const actions = {
  setClient
};

export {
  actions
};
