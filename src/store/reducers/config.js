import STORE_TYPE from '../type';
import createReducer from './common';

const initialState = {
  mode: null,
  codec: null,
  microphone: null,
  camera: null,
  cameraList: [],
  microphoneList: [],
};

const reducer = createReducer(STORE_TYPE.CONFIG, initialState);

export {
  reducer,
};
