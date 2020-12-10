import React, { useEffect } from 'react';
import './App.css';
import {STORE_TYPE} from './store';
import {typedSelector} from './store/selectors';
import EntryBoard from './views/EntryBoard';
import MeetingBoard from './views/MeetingBoard';
import ErrorCard from './views/ErrorCard';
import {connect} from 'react-redux';
import {clientActions, authActions, configActions} from './store/actions';
import { v4 as uuidv4 } from 'uuid';
import { MODE, CODEC } from './agora';

function App(props) {
  useEffect(() => {
    props.setUserId(uuidv4());
    props.setCodec(Object.values(CODEC)[0]);
    props.setLiveMode(Object.values(MODE)[0])
    props.setApplicationId(process.env.REACT_APP_APPLICATION_ID);
    props.setCertificate(process.env.REACT_APP_CERTIFICATE);
    props.setExpireTimeInSeconds(parseInt(process.env.REACT_APP_TOKEN_EXPIRE_TIME_IN_SECONDS));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    setUserId: authActions.setUserId,
    setExpireTimeInSeconds: authActions.setExpireTimeInSeconds,
    setCertificate: authActions.setCertificate,
    setApplicationId: authActions.setApplicationId,
    setCodec: configActions.setCodec,
    setLiveMode: configActions.setLiveMode,
  }
)(App);
