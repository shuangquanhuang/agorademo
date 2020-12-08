import {combineReducers} from 'redux';
import meetingStatusReducer from './MeetingStatus';
import authReducer from './Auth';
import entryBoardReducer from './EntryBoard';
import STORE_TYPE from '../type';

const rootReducer = combineReducers({
  [STORE_TYPE.MEETING_STATUE]: meetingStatusReducer,
  [STORE_TYPE.AUTH]: authReducer,
  [STORE_TYPE.ENTRY_BOARD]: entryBoardReducer,
});

export default rootReducer;
