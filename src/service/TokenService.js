class TokenService {
  createToken({applicationId, expireTimeInSeconds, certificate, channelName, userId}) {
    const data = {
      applicationId,
      expireTimeInSeconds,
      certificate,
      channelName,
      uid: userId,
    }

    return fetch(process.env.REACT_APP_TOKEN_ENDPOINT, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      mode:'cors',
      cache:'default',
      body: JSON.stringify(data)
    })
      .then(resp => resp.ok ? resp.json() : Promise.reject())
      .then(resp => {
        if (resp && resp['ok']) {
          return resp['token'];
        } else {
          return Promise.reject(resp['message']);
        }
      });
  }
}

export default new TokenService();
