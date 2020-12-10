import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StreamPlayer, AgoraClient, AgoraConfigBuilder} from '../agora';
import {STORE_TYPE} from '../store';
import {messageActions, clientActions, meetingStatusActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import {AgoraEvents} from '../agora';
import {isEmpty} from 'loadsh';
import './MeetingBoard.scss';

const MeetingBoard = (props) => {

  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);  

  useEffect(() => {

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
  
    const onStreamSubcribed = (event) => {
      const {stream} = event;
      if (stream) {        
        const streamId = stream.getId();
        if (!remoteStreams.find(item => item.getId() === streamId)) {
          setRemoteStreams([...remoteStreams, stream]);          
        }
        stream.play(stream.play("video-item-" + streamId));
      }
    };

    const onRemoteStreamAdded = (event) => {
      const {stream} = event;
      if (stream) {
        client.subscribe(stream, function (err) {
          console.log("stream subscribe failed", err);
        });
      }
    };
  
    const onRemoteStreamRemoved = (event) => {
      const {stream} = event;
      if (stream) {
        const streamId = stream.getId();
        if (stream.isPlaying()) {
          stream.stop();
        }
        setRemoteStreams(remoteStreams.filter(item => item.getId() !== streamId));
      }
    };

    const onPeerLeave = (event) => {
      const streamId = event.uid;
      const peerStream = remoteStreams.find(item => item.getId() === streamId);
      if (peerStream && peerStream.isPlaying()) {
        peerStream.stop();
      }
      setRemoteStreams(remoteStreams.filter(item => item.getId() !== streamId));
    };

    const {
      token,
      applicationId,
      channelName,
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
      .then(() => client.join({token, channelName, userId}))
      .then(() => {
        client.addEventListener(AgoraEvents.STREAM_PUBLISHD, onStreamPublished);
        client.addEventListener(AgoraEvents.STREAM_SUBSCRIBED, onStreamSubcribed);
        client.addEventListener(AgoraEvents.STREAM_ADDED, onRemoteStreamAdded);
        client.addEventListener(AgoraEvents.STREAM_REMOVED, onRemoteStreamRemoved);
        client.addEventListener(AgoraEvents.PEER_LEAVE, onPeerLeave);

      })
      .then(() => client.startStream({audio: true, video: true}))
      .catch(e => {
        props.setError(e || 'Error while init agora client');
        props.setMeetingStarted(false);
    });

    props.setClient(client);

    setInterval(() => {
      const remoteStream = remoteStreams[0];
      if (!remoteStream) return;
      remoteStream.getStats((stats) => {
        console.log(`Remote Stream accessDelay: ${stats.accessDelay}`);
        console.log(`Remote Stream audioReceiveBytes: ${stats.audioReceiveBytes}`);
        console.log(`Remote Stream audioReceiveDelay: ${stats.audioReceiveDelay}`);
        console.log(`Remote Stream audioReceivePackets: ${stats.audioReceivePackets}`);
        console.log(`Remote Stream audioReceivePacketsLost: ${stats.audioReceivePacketsLost}`);
        console.log(`Remote Stream endToEndDelay: ${stats.endToEndDelay}`);
        console.log(`Remote Stream videoReceiveBytes: ${stats.videoReceiveBytes}`);
        console.log(`Remote Stream videoReceiveDecodeFrameRate: ${stats.videoReceiveDecodeFrameRate}`);
        console.log(`Remote Stream videoReceiveDelay: ${stats.videoReceiveDelay}`);
        console.log(`Remote Stream videoReceiveFrameRate: ${stats.videoReceiveFrameRate}`);
        console.log(`Remote Stream videoReceivePackets: ${stats.videoReceivePackets}`);
        console.log(`Remote Stream videoReceivePacketsLost: ${stats.videoReceivePacketsLost}`);
        console.log(`Remote Stream videoReceiveResolutionHeight: ${stats.videoReceiveResolutionHeight}`);
        console.log(`Remote Stream videoReceiveResolutionWidth: ${stats.videoReceiveResolutionWidth}`);
    });
    }, 2000);

    return () => {
      client.leave();
    }
  }, [props]);

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
        <StreamPlayer stream={stream} label={streamId} key={streamId} video={true} audio={true} />
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
    const {token, applicationId, channelName, userId} = typedSelector(state, STORE_TYPE.AUTH);
    const {codec, mode, camera, microphone} = typedSelector(state, STORE_TYPE.CONFIG);

    return {
      applicationId,
      token,
      userId,
      channelName,
      codec,
      mode,
      camera,
      microphone,
    };
  },
  {
    setClient: clientActions.setClient,
    setError: messageActions.setError,
    setMeetingStarted: meetingStatusActions.setMeetingStarted,
  }
)(MeetingBoard);
