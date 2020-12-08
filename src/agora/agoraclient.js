import AgoraRTC from "agora-rtc-sdk";
import enhanceAgoraRTC from "agoran-awe";
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
      throw new Error("client is not initialized");
    }
  }

  createClient(config) {
    console.log("creating client");
    config = this.checkConfig(config) ? config : AgoraConfigBuilder.defaultConfig();
    this._client = enhancedAgoraRTC.createClient(config);
    return this;
  }

  async init(applicationId) {
    console.log("initing client...");
    this.checkClient();
    if (isEmpty(applicationId)) {
      throw new Error("applicationId cannot be empty")
    }
    await this._client.init(applicationId);
  }

  async join({token, channel, userId}) {
    this.checkClient();
    this._userId = userId;
    await this._client.join(token, channel, userId);
  }

  getRandomStreamId() {
    const uid = this._userId || Math.floor(Math.random() * 10000);
    const now = Date.now();

    return uid.toString() + now.toString();
  }

  async startStream({audio=true, video=true, screen=false}) {
    this.checkClient();
    const streamID = this.getRandomStreamId();
    const stream = enhanceAgoraRTC.createStream({
      audio,
      video,
      screen,
      streamID,
    });
    await stream.init();
    await this._client.publish(stream);
  }

  async leave() {
    this.checkClient();
    await this._client.leave();
  }

  addEventListener(event, callback) {
    this._client.on(event, callback);

    return () => {
      this._client.off(event, callback);
    }
  }
}


export default AgoraClient;
