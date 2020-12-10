import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {StreamPlayer, AgoraClient, AgoraConfigBuilder} from '../agora';
import {STORE_TYPE} from '../store';
import {messageActions, clientActions, meetingStatusActions, authActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import {AgoraEvents} from '../agora';
import {isEmpty} from 'loadsh';
import {Button} from 'react-bootstrap';
import {ArrowLeftCircle, Front} from 'react-bootstrap-icons';
import {useHistory} from 'react-router';
import {ROUTES} from '../constants';
import {TokenService} from '../service';
import './MeetingBoard.scss';


const MeetingBoard = (props) => {
  const history = useHistory();

  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);  

  const backToHome = () => {
    history.push(ROUTES.ROOT);
  }

  useEffect(() => {
    
    const {
      applicationId,
      channelName,
      userId,
      codec,
      mode,
      camera,
      microphone,
      expireTimeInSeconds,
      certificate,
      setToken
    } = props;

    if (isEmpty(applicationId) || isEmpty(channelName) || isEmpty(userId)) {
      return;
    }

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
        stream.play("video-item-" + streamId);
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

    const client = new AgoraClient();

    const startMeeting = async () => {
      try {      
        const token = await TokenService.createToken({
          applicationId,
          expireTimeInSeconds,
          certificate,
          channelName,
          userId})
        setToken(token);
        
        const configBuilder = new AgoraConfigBuilder();
        const config = configBuilder.setCodec(codec)
          .setMode(mode)
          .setMicrophoneId(microphone && microphone.deviceId)
          .setCameraId(camera && camera.deviceId)
          .build();
        client.createClient(config);

        await client.init(applicationId)
        await client.join({token, channelName, userId})

        client.addEventListener(AgoraEvents.STREAM_PUBLISHD, onStreamPublished);
        client.addEventListener(AgoraEvents.STREAM_SUBSCRIBED, onStreamSubcribed);
        client.addEventListener(AgoraEvents.STREAM_ADDED, onRemoteStreamAdded);
        client.addEventListener(AgoraEvents.STREAM_REMOVED, onRemoteStreamRemoved);
        client.addEventListener(AgoraEvents.PEER_LEAVE, onPeerLeave);

        client.startStream({audio: true, video: true});
      } catch(e) {
        props.setError(e || 'Error while init agora client');
        props.setMeetingStarted(false);
      }
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
    }

    startMeeting();

    return () => {
      client.leave();
    }
  }, [props]);

  const getStreams = () => {
    const streams = [];
    if (localStream) {
      streams.push(
        <div className={'meeting-stream'} key={'local'}>
          <StreamPlayer stream={localStream} label={'local'} key={'local'}/>
        </div>
      )
    }

    remoteStreams
      .filter(stream => stream.hasVideo())
      .forEach(stream => {
      const streamId = stream.getId();
      streams.push(
        <div className={'meeting-stream'} key={streamId}>
          <StreamPlayer stream={stream} label={'User-' + streamId} key={streamId} video={true} audio={true} />
        </div>
      )
    })

    return streams;
  }

  return (
    <div className={'meeting-room'}>
      <div className={'title'}>
        <div className={'left'}>
          <span>Meeting Room</span>
        </div>
        <div className={'right'}>
          <Button variant={'light'} onClick={() => backToHome()}>
            <ArrowLeftCircle color={'royalblue'} size={25}/>
          </Button>
        </div>
      </div>
      <div className={'meeting-board'}>
      {getStreams()}
      </div>      
    </div>
  )
}

export default connect(
  state => {
    const {applicationId, channelName, userId, expireTimeInSeconds, certificate} = typedSelector(state, STORE_TYPE.AUTH);
    const {codec, mode, camera, microphone} = typedSelector(state, STORE_TYPE.CONFIG);

    return {
      applicationId,
      userId,
      channelName,
      codec,
      mode,
      camera,
      microphone,
      expireTimeInSeconds,
      certificate,
    };
  },
  {
    setClient: clientActions.setClient,
    setError: messageActions.setError,
    setMeetingStarted: meetingStatusActions.setMeetingStarted,
    setToken: authActions.setToken,
  }
)(MeetingBoard);
