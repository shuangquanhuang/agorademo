import STORE_TYPE from '../type';
import createReducer from './common';

const initState = {
  showJoinMeetingDialog: false,
  showNewMeetingDialog: false,
  showConfigInputDialog: false,
}

const reducer = createReducer(STORE_TYPE.ENTRY_BOARD, initState);

export {
  reducer,
};
