import {isEmpty} from 'loadsh';
import React from 'react';
import {Button} from 'react-bootstrap';
import {ArrowLeftCircle} from 'react-bootstrap-icons';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import {AgoraClient, AgoraConfigBuilder, AgoraEvents, StreamPlayer} from '../agora';
import {ROUTES} from '../constants';
import {TokenService} from '../service';
import {STORE_TYPE} from '../store';
import {authActions, clientActions, meetingStatusActions, messageActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import './MeetingRoom.scss';


class MeetingRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      localStream: null,
      remoteStreamList: [],
    };

    this.client = null;
    this.clientUnSubscribers = [];
  }

  componentDidMount() {
    this.startMeeting().then(null);
  }


  shouldComponentUpdate(nextProps, nextState) {
    const {localStream, remoteStreamList} = this.state;
    const {localStream: nextLocalStream, remoteStreamList: nextRemoteStreamList} = nextState;

    return localStream !== nextLocalStream || remoteStreamList !== nextRemoteStreamList;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  componentWillUnmount() {
    this.clientUnSubscribers.forEach(unsub => unsub());
    this.leave().then(r => {});
  }


  render() {
    const streams = [];
    const {localStream, remoteStreamList} = this.state;
    if (localStream) {
      streams.push(
        <div className={'meeting-stream'} key={'local'}>
          <StreamPlayer stream={localStream} label={'local'} key={'local'}/>
        </div>
      );
    }

    remoteStreamList
    .filter(stream => stream.hasVideo())
    .forEach(stream => {
      const streamId = stream.getId();
      streams.push(
        <div className={'meeting-stream'} key={streamId}>
          <StreamPlayer stream={stream} label={'User-' + streamId} key={streamId} video={true} audio={true} />
        </div>
      )
    });

    return (
      <div className={'meeting-room'}>
        <div className={'title'}>
          <div className={'left'}>
            <span>Meeting Room</span>
          </div>
          <div className={'right'}>
            <Button variant={'light'} onClick={() => this.backToHome()}>
              <ArrowLeftCircle color={'royalblue'} size={25}/>
            </Button>
          </div>
        </div>
        <div className={'meeting-board'}>
          {streams}
        </div>
      </div>
    );
  }

  onStreamPublished(event) {
    const { stream } = event;
    const stop = stream.stop;
    const close = stream.close;

    stream.close = (func => () => {
      func();
      this.setState({localStream: stream});
    })(close);

    stream.stop = (func => () => {
      func();
      this.setState({localStream: null});
    })(stop);

    this.setState({localStream: stream});
  };

  onStreamSubcribed(event) {
    const {stream} = event;
    if (stream) {
      const streamId = stream.getId();
      const streamList = this.state.remoteStreamList;
      if (!streamList.find(item => item.getId() === streamId)) {
        this.setState({remoteStreamList: [...streamList, stream]});
      }
      stream.play("video-item-" + streamId);
    }
  };

  onRemoteStreamAdded(event) {
    const {stream} = event;
    if (stream) {
      this.client.subscribe(stream, function (err) {
        this.props.setError(err || 'stream subscribe failed');
      });
    }
  };

  onRemoteStreamRemoved(event) {
    const {stream} = event;
    if (stream) {
      const streamId = stream.getId();
      if (stream.isPlaying()) {
        stream.stop();
      }
      const remoteStreamList = this.state.remoteStreamList.filter(item => item.getId() !== streamId);
      this.setState({remoteStreamList});
    }
  };

  onPeerLeave(event) {
    const streamId = event.uid;
    const peerStream = this.state.remoteStreamList.find(item => item.getId() === streamId);
    if (peerStream && peerStream.isPlaying()) {
      peerStream.stop();
    }
    const remoteStreamList = this.state.remoteStreamList.filter(item => item.getId() !== streamId);
    this.setState({remoteStreamList});
  };

  async startMeeting() {
    try {
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
      } = this.props;

      if (isEmpty(applicationId) || isEmpty(channelName) || isEmpty(userId)) {
        this.props.setError('Please set channel name to join');
        return;
      }

      this.client = new AgoraClient();
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

      const client = this.client;
      client.createClient(config);

      await client.init(applicationId)
      await client.join({token, channelName, userId})

      this.clientUnSubscribers.push(client.addEventListener(AgoraEvents.STREAM_PUBLISHED, this.onStreamPublished.bind(this)));
      this.clientUnSubscribers.push(client.addEventListener(AgoraEvents.STREAM_SUBSCRIBED, this.onStreamSubcribed.bind(this)));
      this.clientUnSubscribers.push(client.addEventListener(AgoraEvents.STREAM_ADDED, this.onRemoteStreamAdded.bind(this)));
      this.clientUnSubscribers.push(client.addEventListener(AgoraEvents.STREAM_REMOVED, this.onRemoteStreamRemoved.bind(this)));
      this.clientUnSubscribers.push(client.addEventListener(AgoraEvents.PEER_LEAVE, this.onPeerLeave.bind(this)));

      await client.startStream({audio: true, video: true});
    } catch(e) {
      this.props.setError(e || 'Error while init agora client');
      this.props.setMeetingStarted(false);
    }
  }

  async leave() {
    if (!this.client) return;
    try {
      const {localStream, remoteStreamList} = this.state;
      await this.client.leave(() => {
        if (localStream.isPlaying()) {
          localStream.stop();
        }
        localStream.close();

        remoteStreamList.forEach(item => {
          if (item.isPlaying()) {
            item.stop();
          }
          item.close();
        });
      }, e => Promise.reject(e));
    } catch(e) {
      this.props.setError(e || 'Error while leave');
    }
  }

  backToHome() {
    this.leave().then(() => {
      this.props.history.push(ROUTES.ROOT);
    });
  }
}

export default connect(
  state => {
    const {applicationId, channelName, userId, expireTimeInSeconds, certificate} = typedSelector(state, STORE_TYPE.AUTH);
    const {codec, mode, camera, microphone} = typedSelector(state, STORE_TYPE.CONFIG);
    const {client} = typedSelector(state, STORE_TYPE.CLIENT);

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
      client,
    };
  },
  {
    setClient: clientActions.setClient,
    setError: messageActions.setError,
    setMeetingStarted: meetingStatusActions.setMeetingStarted,
    setToken: authActions.setToken,
  }
)(withRouter(MeetingRoom));
