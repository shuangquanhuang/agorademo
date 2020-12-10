class MeetingService {
  fetchMeetingList() {
    return fetch(process.env.REACT_APP_MEETING_ENDPOINT, {
      method: 'GET',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      mode:'cors',
      cache:'default',
    })
      .then(resp => resp.ok ? resp.json() : Promise.reject())
      .then(resp => {
        if (resp && resp['success']) {
          return resp['data'];
        } else {
          return Promise.reject(resp['message']);
        }
      });

  }

  createMeeting({applicationId, channelName, token, creatorId}) {
    const data = {
      applicationId,
      channelName,
      token,
      creatorId,
    };

    return fetch(process.env.REACT_APP_MEETING_ENDPOINT, {
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
        if (resp && resp['success']) {
          return resp['meetingId'];
        } else {
          return Promise.reject(resp['message']);
        }
      });

  }
}

export default new MeetingService();
