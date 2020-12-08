import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StreamPlayer, AgoraClient, AgoraConfigBuilder} from '../agora';
import {STORE_TYPE} from '../store';
import {errorActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import {AgoraEvents} from '../agora';
import {isEmpty} from 'loadsh';
// import {Container, Row} from 'react-bootstrap';
import './MeetingBoard.scss';

const MeetingBoard = (props) => {

  const [localStream, setLocalStream] = useState(undefined);

  useEffect(() => {
    const {
      token,
      applicationId,
      channel,
      userId,
    } = props;

    if (isEmpty(applicationId)) {
      return;
    }

    const client = new AgoraClient();
    client.createClient(AgoraConfigBuilder.defaultConfig());

    client.init(applicationId)
      .then(() => client.join({token, channel, userId}))
      .then(() => client.startStream({audio: true, video: true}))
      .then(() => {
        client.addEventListener(AgoraEvents.STREAM_PUBLISHD, (event) => {
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
        });
      }).catch(e => {
        props.setError(e);
    });

    props.setClient(client);
  });

  return (
    <div className={"meeting-board"}>
      {localStream ? <StreamPlayer stream={localStream} label={"local"}/> : <div/>}
    </div>
  )
}

export default connect(
  state => {
    const {token, applicationId, channel} = typedSelector(state, STORE_TYPE.AUTH);

    return {
      applicationId,
      token,
      channel,
    };
  },
  {
    setClient: clientActions.setClient,
    setError: errorActions.setError,
  }
)(MeetingBoard);
