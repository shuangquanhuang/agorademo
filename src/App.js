import React, { useEffect } from 'react';
import './App.css';
import {STORE_TYPE} from './store';
import {typedSelector} from './store/selectors';
import EntryBoard from './views/EntryBoard';
import MeetingBoard from './views/MeetingBoard';
import MessageCard from './views/MessageCard';
import MeetingList from './views/MeetingList';
import {connect} from 'react-redux';
import {clientActions, authActions, configActions} from './store/actions';
import { v4 as uuidv4 } from 'uuid';
import {ROUTES} from './constants/RouteConstants';
import {AgoraClient, AgoraConfigBuilder, AgoraEvents, CODEC, MODE} from './agora';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const fakeClient = new AgoraClient().createClient(AgoraConfigBuilder.defaultConfig());

function App(props) {

  const onCameraChanged = () => {
    if (!fakeClient) return;
    fakeClient.getCameras()
      .then((cameras) => {
        props.setCameraList(cameras);
        if (!props.camera) {
          props.setCamera(cameras[0]);
        }
      })
      .catch(() => {});
  };

  const onMicrophoneChanged = () => {
    if (!fakeClient) return;
    fakeClient.getRecordingDevices()
      .then((microphones) => {
        props.setMicrophoneList(microphones);
        if (!props.microphone) {
          props.setMicrophone(microphones[0]);
        }
      })
      .catch(() => {});
  }

  useEffect(() => {
    props.setUserId(uuidv4());
    props.setCodec(Object.values(CODEC)[0]);
    props.setLiveMode(Object.values(MODE)[0])
    props.setApplicationId(process.env.REACT_APP_APPLICATION_ID);
    props.setCertificate(process.env.REACT_APP_CERTIFICATE);
    props.setExpireTimeInSeconds(parseInt(process.env.REACT_APP_TOKEN_EXPIRE_TIME_IN_SECONDS));

    if (fakeClient) {
      const cameraUnsubscribe = fakeClient.addEventListener(AgoraEvents.CAMERA_CHANGED, onCameraChanged);
      const micUnsubscribe = fakeClient.addEventListener(AgoraEvents.RECORDING_DEVICE_CHANGED, onMicrophoneChanged);

      onCameraChanged();
      onMicrophoneChanged();

      return () => {
        cameraUnsubscribe();
        micUnsubscribe();
      }
    }
    // depends on [] so that useEffect only execute/clean once.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <h1> Agora Meeting Demo</h1>
        </header>
        <Switch>
          <Route exact path={ROUTES.ROOT}>
            <EntryBoard/>
          </Route>
          <Route path={ROUTES.MEETING}>
            <MeetingBoard/>
          </Route>
          <Route path={ROUTES.MEETING_LIST}>
            <MeetingList/>
          </Route>
        </Switch>
        {props.shouldShowMessageCard && <MessageCard/>}
      </div>

    </Router>
  );
}

export default connect(
  state => {
    const {started: meetingStarted} = typedSelector(state, STORE_TYPE.MEETING_STATUE);
    const {error, message} = typedSelector(state, STORE_TYPE.MESSAGE);
    const {camera, microphone} = typedSelector(state, STORE_TYPE.CONFIG);
    const shouldShowMessageCard = Boolean(error || message);
    return {
      camera,
      microphone,
      meetingStarted,
      shouldShowMessageCard,
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
    setMicrophoneList: configActions.setMicrophoneList,
    setCameraList: configActions.setCameraList,
    setMicrophone: configActions.setMicrophone,
    setCamera: configActions.setCamera,
  }
)(App);
