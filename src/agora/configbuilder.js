const MODE = {
  LIVE: 'live',
  RTC: 'rtc',
}

const CODEC = {
  VP8: 'vp8',
  H264: 'h264',
}

class AgoraConfigBuilder {
  constructor() {
    this._config = {
      mode: MODE.LIVE,
      codec: CODEC.H264,
    };
  }

  setMode(mode) {
    this._config = {...this._config, mode};
    return this;
  }

  setCodec(codec) {
    this._config = {...this._config, codec};
    return this;
  }

  setMicrophoneId(microphoneId) {
    this._config = {...this._config, microphoneId};
    return this;
  }

  setCameraId(cameraId) {
    this._config = {...this._config, cameraId};
    return this;
  }

  setProxyServer(proxyServer) {
    this._config = {...this._config, proxyServer};
    return this;
  }

  setTurnServer(turnServer) {
    this._config = {...this._config, turnServer};
    return this;
  }

  setAreaCode(areaCode) {
    this._config = {...this._config, areaCode};
    return this;
  }

  build() {
    return this._config;
  }

  static defaultConfig() {
    return {
      mode: MODE.LIVE,
      codec: CODEC.H264,
    }
  }
}

export {
  MODE,
  CODEC,
  AgoraConfigBuilder,
}
