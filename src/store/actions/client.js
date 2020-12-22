import STORE_TYPE from '../type';
import createAction from './common';

const setClient = (client) => createAction(STORE_TYPE.CLIENT, {client});

const actions = {
  setClient
};

export {
  actions
};
