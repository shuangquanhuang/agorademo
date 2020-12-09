import React from 'react';
import {Button, Container} from 'react-bootstrap';
import ConfigInput from './ConfigInput';
import JoinMeetingInput from './JoinMeetingInput';
import {entryBoardActions, errorActions, meetingStatusActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import {STORE_TYPE} from '../store';
import {connect} from 'react-redux';
import './EntryBoard.scss';


const EntryBoard = (props) => {

  const onJoinMeeting = () => {
    props.setMeetingStarted(true);
  }

  const onNewMeeting = () => {
    props.setError(new Error('This feature is still in progress.'));
  }

  return (
    <Container>
      <div className={'entry-board'}>
        <div className={'new-meeting'}>
          <Button variant='outline-primary' onClick={() => onNewMeeting()}>New Meeting</Button>
        </div>
        <div className={'join-meeting'}>
          <Button variant='outline-success' onClick={() => props.setJointMeetingInputVisible(true)}>Join Meeting</Button>
        </div>
        <div className={'config-meeting'}>
          <Button variant='outline-info' onClick={() => props.setConfigInputVisible(true)}>Config Meeting</Button>
        </div>
        <JoinMeetingInput show={props.showJoinMeetingInput} onSubmit={onJoinMeeting}/>
        <ConfigInput show={props.showConfigInput}/>
      </div>
    </Container>
  );
}

export default connect(
  state => {
    return {
      ...typedSelector(state, STORE_TYPE.ENTRY_BOARD),
    }
  },
  {
    setJointMeetingInputVisible: entryBoardActions.setJointMeetingInputVisible,
    setConfigInputVisible: entryBoardActions.setConfigInputVisible,
    setMeetingStarted: meetingStatusActions.setMeetingStarted,
    setError: errorActions.setError,
  }
)(EntryBoard);
