const TOKEN_SERVICE_ENDPOINT = process.env.REACT_APP_TOKEN_ENDPOINT.replace('hostname', window.location.hostname);


class TokenService {
  async createToken({applicationId, expireTimeInSeconds, certificate, channelName, userId}) {
    const data = {
      applicationId,
      expireTimeInSeconds,
      certificate,
      channelName,
      uid: userId,
    }

    const resp = await fetch(process.env.REACT_APP_TOKEN_ENDPOINT, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=UTF-8'
          },
          mode: 'cors',
          cache: 'default',
          body: JSON.stringify(data)
      });
      
      const respJson = await (resp.ok ? resp.json() : Promise.reject());
      if (respJson && respJson['success']) {
          return respJson['token'];
      } else {
        return Promise.reject(respJson['message']);
    }
  }
}

export default new TokenService();
