import STORE_TYPE from '../type';
import createAction from './common';

const setMeetingStarted = (started) => createAction(STORE_TYPE.MEETING_STATUE, {started});

const actions = {
  setMeetingStarted,
};

export {
  actions
};
