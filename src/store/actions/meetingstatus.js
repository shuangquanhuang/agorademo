import createAction from './common';
import STORE_TYPE from '../type';

const setMeetingStarted = (started) => createAction(STORE_TYPE.MEETING_STATUE, {started});

const actions = {
  setMeetingStarted,
};

export {
  actions
};
