import React from 'react';
import NewMeeting from './NewMeeting';
import JoinMeeting from './JoinMeeting';
import {Container} from 'react-bootstrap';
import JoinMeetingInput from './JoinMeetingInput';
import {entryBoardActions, meetingStatusActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import {STORE_TYPE} from '../store';
import {connect} from 'react-redux';
import './EntryBoard.scss';


const EntryBoard = (props) => {

  const onJoinMeeting = () => {
    console.log('starting join meeting');
    props.setMeetingStarted(true);
  }

  return (
    <Container>
      <div className={'entry-board'}>
        <NewMeeting/>
        <JoinMeeting/>
        <JoinMeetingInput show={props.showJoinMeetingInput} onSubmit={onJoinMeeting}/>
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
    setShowJoinMeetingInput: entryBoardActions.setShowJoinMeetingInput,
    setMeetingStarted: meetingStatusActions.setMeetingStarted,
  }
)(EntryBoard);
