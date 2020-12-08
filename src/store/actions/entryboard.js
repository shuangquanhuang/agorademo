import createAction from './common';
import STORE_TYPE from '../type';

const setShowJoinMeetingInput = () => createAction(STORE_TYPE.ENTRY_BOARD, {showJoinMeetingInput: true});
const setHideJoinMeetingInput = () =>  createAction(STORE_TYPE.ENTRY_BOARD, {showJoinMeetingInput: false});

const actions = {
  setShowJoinMeetingInput,
  setHideJoinMeetingInput,
};

export {
  actions
};
