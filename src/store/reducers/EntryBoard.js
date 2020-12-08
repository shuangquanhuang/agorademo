import STORE_TYPE from '../type';
import createReducer from './common';

const initState = {
  showJoinMeetingInput: false,
}

const meetingStatusReducer = createReducer(STORE_TYPE.ENTRY_BOARD, initState);

export default meetingStatusReducer;
