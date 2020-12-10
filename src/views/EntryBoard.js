import React from 'react';
import {Button, Container} from 'react-bootstrap';
import ConfigInput from './ConfigInput';
import JoinMeetingDialog from './JoinMeetingDialog';
import {entryBoardActions, errorActions, meetingStatusActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import {STORE_TYPE} from '../store';
import {connect} from 'react-redux';
import './EntryBoard.scss';
import {ROUTES} from '../constants';
import NewMeeingDialog from './NewMeeingDialog';
import { useHistory } from 'react-router-dom';


const EntryBoard = (props) => {

  const history = useHistory();

  const onJoinMeeting = () => {
    history.push(ROUTES.MEETING);
  }

  const onNewMeeting = () => {

  }

  const navigateToMeetingList = () => {
    history.push(ROUTES.MEETING_LIST)
  }

  return (
    <Container>
      <div className={'entry-board'}>
        <div className={'new-meeting'}>
          <Button variant='outline-primary' onClick={() => props.setNewMeetingInputVisible(true)}>New Meeting</Button>
        </div>
        <div className={'join-meeting'}>
          <Button variant='outline-success' onClick={() => props.setJointMeetingInputVisible(true)}>Join Meeting</Button>
        </div>
        <div className={'config-meeting'}>
          <Button variant='outline-info' onClick={navigateToMeetingList}>Meeting List</Button>
        </div>
        <div className={'config-meeting'}>
          <Button variant='outline-warning' onClick={() => props.setConfigInputVisible(true)}>Config Meeting</Button>
        </div>

        <JoinMeetingDialog show={props.showJoinMeetingDialog} onSubmit={onJoinMeeting}/>
        <NewMeeingDialog show={props.showNewMeetingDialog} onSubmit={onNewMeeting}/>
        <ConfigInput show={props.showConfigInputDialog}/>
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
    setNewMeetingInputVisible: entryBoardActions.setNewMeetingInputVisible,
    setConfigInputVisible: entryBoardActions.setConfigInputVisible,
    setMeetingStarted: meetingStatusActions.setMeetingStarted,
    setError: errorActions.setError,
  }
)(EntryBoard);
