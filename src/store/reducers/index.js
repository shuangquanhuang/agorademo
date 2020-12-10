import {combineReducers} from 'redux';
import {reducer as meetingStatusReducer} from './meetingstatus';
import {reducer as authReducer} from './auth';
import {reducer as entryBoardReducer} from './entryboard';
import {reducer as clientReducer} from './client';
import {reducer as messageReducer} from './message';
import {reducer as configReducer} from './config';

import STORE_TYPE from '../type';

const rootReducer = combineReducers({
  [STORE_TYPE.MEETING_STATUE]: meetingStatusReducer,
  [STORE_TYPE.AUTH]: authReducer,
  [STORE_TYPE.ENTRY_BOARD]: entryBoardReducer,
  [STORE_TYPE.CLIENT]: clientReducer,
  [STORE_TYPE.MESSAGE]: messageReducer,
  [STORE_TYPE.CONFIG]: configReducer,
});

export default rootReducer;
