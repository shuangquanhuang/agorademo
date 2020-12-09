const createToken = ({channelName, userId}) => {
    console.log('ebv', process.env);
    const data = {
        applicationId: process.env.REACT_APP_APPLICATION_ID,        
        expireTimeInSeconds: parseInt(process.env.REACT_APP_TOKEN_EXPIRE_TIME),
        certificate: process.env.REACT_APP_CERTIFICATE,
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

export {
    createToken,
};
