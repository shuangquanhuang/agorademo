import createAction from './common';
import STORE_TYPE from '../type';

const setMeetingStarted = (started) => createAction(STORE_TYPE.MEETING_STATUE, {started});
const setCreatingMetting = (creating) => createAction(STORE_TYPE.MEETING_STATUE, {creating});

const actions = {
  setMeetingStarted,
  setCreatingMetting,
};

export {
  actions
};
