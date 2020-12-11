const MEETING_SVERVICE_ENDPOINT = process.env.REACT_APP_MEETING_ENDPOINT.replace('hostname', window.location.hostname);

class MeetingService {
  async fetchMeetingList() {
    const resp = await fetch(MEETING_SVERVICE_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      mode: 'cors',
      cache: 'default',
    });

    const respJson = await (resp.ok ? resp.json() : Promise.reject());
    if (respJson && respJson['success']) {
      return respJson['data'];
    } else {
      return Promise.reject(respJson['message']);
    }

  }

  async createMeeting({applicationId, channelName, token, creatorId, description}) {
    const data = {
      applicationId,
      channelName,
      token,
      creatorId,
      description
    };

    const resp = await fetch(MEETING_SVERVICE_ENDPOINT, {
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
      return respJson['meetingId'];
    } else {
      return Promise.reject(respJson['message']);
    }

  }

  async queryMeeting({applicationId, channelName}) {
    const data = {
      applicationId,
      channelName,
    };

    const resp = await fetch(MEETING_SVERVICE_ENDPOINT + '/queryMeeting', {
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
      return respJson['data'];
    } else {
      return Promise.reject(respJson['message']);
    }
  }

  async queryMeetingById(meetingId) {
    const resp = await fetch(MEETING_SVERVICE_ENDPOINT + '/' + meetingId, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    });

    const respJson = await (resp.ok ? resp.json() : Promise.reject());
    if (respJson && respJson['success']) {
      return respJson['data'];
    } else {
      return Promise.reject(respJson['message']);
    }
    
  }
}

export default new MeetingService();
