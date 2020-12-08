import STORE_TYPE from '../type';
import createReducer from './common';

const initState = {
  showJoinMeetingInput: false,
}

const reducer = createReducer(STORE_TYPE.ENTRY_BOARD, initState);

export {
  reducer,
};
