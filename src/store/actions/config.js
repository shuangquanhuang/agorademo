import createAction from './common';
import STORE_TYPE from '../type';

const setLiveMode = (mode) => createAction(STORE_TYPE.CONFIG, {mode});
const setCodec = (codec) => createAction(STORE_TYPE.CONFIG, {codec});
const setMicrophone = (microphone) => createAction(STORE_TYPE.CONFIG, {microphone});
const setCamera = (camera) => createAction(STORE_TYPE.CONFIG, {camera});

const actions = {
  setLiveMode,
  setCodec,
  setMicrophone,
  setCamera,
};

export {
  actions
};
