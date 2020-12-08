import STORE_TYPE from '../type';
import createReducer from './common';

const initState = {
  started: false,
}

const entryBoardReducer = createReducer(STORE_TYPE.MEETING_STATUE, initState);

export default entryBoardReducer;
