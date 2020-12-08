import STORE_TYPE from '../type';
import createReducer from './common';

const initState = {
  started: false,
}

const reducer = createReducer(STORE_TYPE.MEETING_STATUE, initState);

export {
  reducer,
};
