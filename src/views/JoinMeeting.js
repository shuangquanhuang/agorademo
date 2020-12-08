import React from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import './JoinMeeting.scss';
import {entryBoardActions} from '../store/actions';

const JoinMeeting = (props) => {
  return (
    <div className={'join-meeting'}>
      <Button variant="outline-success" onClick={() => props.setShowJoinMeetingInput()}>Join Meeting</Button>
    </div>
  );
}

export default connect(
  null,
  {setShowJoinMeetingInput: entryBoardActions.setShowJoinMeetingInput}
)(JoinMeeting);
