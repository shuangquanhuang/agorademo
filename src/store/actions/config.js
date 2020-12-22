import STORE_TYPE from '../type';
import createAction from './common';

const setLiveMode = (mode) => createAction(STORE_TYPE.CONFIG, {mode});
const setCodec = (codec) => createAction(STORE_TYPE.CONFIG, {codec});
const setMicrophone = (microphone) => createAction(STORE_TYPE.CONFIG, {microphone});
const setCamera = (camera) => createAction(STORE_TYPE.CONFIG, {camera});
const setCameraList = (cameraList) => createAction(STORE_TYPE.CONFIG, {cameraList});
const setMicrophoneList = (microphoneList) => createAction(STORE_TYPE.CONFIG, {microphoneList});

const actions = {
  setLiveMode,
  setCodec,
  setMicrophone,
  setCamera,
  setCameraList,
  setMicrophoneList,
};

export {
  actions
};
