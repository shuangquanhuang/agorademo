import React from 'react';
import './App.css';
import {STORE_TYPE} from './store';
import {typedSelector} from './store/selectors';
import EntryBoard from './views/EntryBoard';
import MeetingBoard from './views/MeetingBoard';
import ErrorCard from './views/ErrorCard';
import {connect} from 'react-redux';
import {clientActions} from './store/actions';

function App(props) {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1> Agora Meeting Demo</h1>
      </header>
      {props.meetingStarted ? <MeetingBoard/> : <EntryBoard/>}
      {props.error && <ErrorCard/>}
    </div>
  );
}

export default connect(
  state => {
    const {started: meetingStarted} = typedSelector(state, STORE_TYPE.MEETING_STATUE);
    const {error} = typedSelector(state, STORE_TYPE.ERROR);

    return {
      meetingStarted,
      error,
    };
  },
  {
    setClient: clientActions.setClient,
  }
)(App);
