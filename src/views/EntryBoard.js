import React from 'react';
import {Button, Container} from 'react-bootstrap';
import {connect} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTES} from '../constants';
import {STORE_TYPE} from '../store';
import {entryBoardActions, meetingStatusActions, messageActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import ConfigInput from './ConfigInput';
import './EntryBoard.scss';
import JoinMeetingDialog from './JoinMeetingDialog';
import NewMeetingDialog from './NewMeetingDialog';


const EntryBoard = (props) => {
  const history = useHistory();

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

        <JoinMeetingDialog show={props.showJoinMeetingDialog}/>
        <NewMeetingDialog show={props.showNewMeetingDialog}/>
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
    setError: messageActions.setError,
  }
)(EntryBoard);
