import AgoraRTC from 'agora-rtc-sdk';
import enhanceAgoraRTC from 'agoran-awe';
import {CODEC, MODE, AgoraConfigBuilder} from './configbuilder';
import {isEmpty} from 'loadsh';

const enhancedAgoraRTC = enhanceAgoraRTC(AgoraRTC)

class AgoraClient {
  constructor() {
    this._client = null;
    this._userId = null;
  }

  checkConfig(config) {
    const {mode, codec} = config || {};
    return Object.values(MODE).includes(mode) && Object.values(CODEC).includes(codec);
  }

  checkClient() {
    if (this._client === null) {
      throw new Error('client is not initialized');
    }
  }

  createClient(config) {
    config = this.checkConfig(config) ? config : AgoraConfigBuilder.defaultConfig();
    this._client = enhancedAgoraRTC.createClient(config);
    return this;
  }

  async init(applicationId) {
    this.checkClient();
    if (isEmpty(applicationId)) {
      throw new Error('applicationId cannot be empty')
    }
    await this._client.init(applicationId, () => Promise.resolve(), (e) => Promise.reject(e));
  }

  async join({token, channelName, userId}) {
    this.checkClient();
    this._userId = userId;
    await this._client.join(token, channelName, userId);
  }

  async getCameras() {
    this.checkClient();
    return this._client.getCameras();
  }

  async getRecordingDevices() {
    this.checkClient();
    return this._client.getRecordingDevices();
  }

  getRandomStreamId() {
    const uid = this._userId || Math.floor(Math.random() * 10000);
    const now = Date.now();

    return uid.toString() + now.toString();
  }

  async startStream({audio=true, video=true, screen=false}) {
    this.checkClient();
    const streamID = this.getRandomStreamId();
    const stream = enhancedAgoraRTC.createStream({
      audio,
      video,
      screen,
      streamID,
    });
    await stream.init();
    await this._client.publish(stream, (e)=> Promise.reject(e));
  }

  async leave(onSuccess, onFailure) {
    this.checkClient();
    await this._client.leave(onSuccess, onFailure);
  }

  publish(stream, onFailure) {
    this._client.publish(stream, onFailure);
  }

  unpublish(stream, onFailure) {
    this._client.unpublish(stream, onFailure);
  }

  subscribe(stream, callback) {
    this._client.subscribe(stream, callback);
  }

  addEventListener(event, callback) {
    this._client.on(event, callback);

    return () => {
      this._client.off(event, callback);
    }
  }
}


export default AgoraClient;
