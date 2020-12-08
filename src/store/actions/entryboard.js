import createAction from './common';
import STORE_TYPE from '../type';

const setJointMeetingInputVisible = (visible) => createAction(STORE_TYPE.ENTRY_BOARD, {showJoinMeetingInput: visible});
const setConfigInputVisible = (visible) => createAction(STORE_TYPE.ENTRY_BOARD, {showConfigInput: visible})

const actions = {
  setJointMeetingInputVisible,
  setConfigInputVisible,
};

export {
  actions
};
