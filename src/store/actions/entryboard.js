import STORE_TYPE from '../type';
import createAction from './common';

const setJointMeetingInputVisible = (visible) => createAction(STORE_TYPE.ENTRY_BOARD, {showJoinMeetingDialog: visible});
const setConfigInputVisible = (visible) => createAction(STORE_TYPE.ENTRY_BOARD, {showConfigInputDialog: visible})
const setNewMeetingInputVisible = (visible) => createAction(STORE_TYPE.ENTRY_BOARD, {showNewMeetingDialog: visible});

const actions = {
  setJointMeetingInputVisible,
  setConfigInputVisible,
  setNewMeetingInputVisible,
};

export {
  actions
};
