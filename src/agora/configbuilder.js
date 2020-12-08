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
  }

  setCodec(codec) {
    this._config = {...this._config, codec};
  }

  setProxyServer(proxyServer) {
    this._config = {...this._config, proxyServer};
  }

  setTurnServer(turnServer) {
    this._config = {...this._config, turnServer};
  }

  setAreaCode(areaCode) {
    this._config = {...this._config, areaCode};
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
