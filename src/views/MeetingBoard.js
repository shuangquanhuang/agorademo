import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StreamPlayer, AgoraClient, AgoraConfigBuilder} from '../agora';
import {STORE_TYPE} from '../store';
import {errorActions, clientActions, meetingStatusActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import {AgoraEvents} from '../agora';
import {isEmpty} from 'loadsh';
// import {Container, Row} from 'react-bootstrap';
import './MeetingBoard.scss';

const MeetingBoard = (props) => {

  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);

  const onStreamPublished = (event) => {
    const { stream } = event;
    const stop = stream.stop;
    const close = stream.close;

    stream.close = (func => () => {
      func();
      setLocalStream(null);
    })(close);

    stream.stop = (func => () => {
      func();
      setLocalStream(null);
    })(stop);

    setLocalStream(stream);
  };

  const onRemoteStreamAdded = (event) => {
    const {stream} = event;
    if (stream) {
      const streamId = stream.getId();
      if (!remoteStreams.find(item => item.getId() === streamId)) {
        setRemoteStreams([...remoteStreams, stream]);
      }
    }
  };

  const onRemoteStreamRemoved = (event) => {
    const {stream} = event;
    if (stream) {
      const streamId = stream.getId();
      const index = remoteStreams.findIndex(stream => stream.getId() === streamId);
      if (index >= 0) {
        remoteStreams.splice(index, 1);
        setRemoteStreams(remoteStreams);
      }
    }
  };

  useEffect(() => {
    const {
      token,
      applicationId,
      channel,
      userId,
      codec,
      mode,
      camera,
      microphone
    } = props;

    if (isEmpty(applicationId)) {
      return;
    }

    const client = new AgoraClient();
    const configBuilder = new AgoraConfigBuilder();
    const config = configBuilder.setCodec(codec)
      .setMode(mode)
      .setMicrophoneId(microphone && microphone.deviceId)
      .setCameraId(camera && camera.deviceId)
      .build();
    client.createClient(config);

    client.init(applicationId)
      .then(() => client.join({token, channel, userId}))
      .then(() => {
        client.addEventListener(AgoraEvents.STREAM_PUBLISHD, onStreamPublished);
        client.addEventListener(AgoraEvents.STREAM_ADDED, onRemoteStreamAdded);
        client.addEventListener(AgoraEvents.STREAM_REMOVED, onRemoteStreamRemoved)
      })
      .then(() => client.startStream({audio: true, video: true}))
      .catch(e => {
        props.setError(e);
        props.setMeetingStarted(false);
    });

    props.setClient(client);
  }, []);

  const getStreams = () => {
    const streams = [];
    if (localStream) {
      streams.push(
        <StreamPlayer stream={localStream} label={'local'} key={'local'}/>
      )
    }

    remoteStreams
      .filter(stream => stream.hasVideo())
      .forEach(stream => {
      const streamId = stream.getId();
      streams.push(
        <StreamPlayer stream={stream} label={streamId} key={streamId}/>
      )
    })

    return streams;
  }

  return (
    <div className={'meeting-board'}>
      {getStreams()}
    </div>
  )
}

export default connect(
  state => {
    const {token, applicationId, channel, userId} = typedSelector(state, STORE_TYPE.AUTH);
    const {codec, mode, camera, microphone} = typedSelector(state, STORE_TYPE.CONFIG);

    return {
      applicationId,
      token,
      userId,
      channel,
      codec,
      mode,
      camera,
      microphone,
    };
  },
  {
    setClient: clientActions.setClient,
    setError: errorActions.setError,
    setMeetingStarted: meetingStatusActions.setMeetingStarted,
  }
)(MeetingBoard);
