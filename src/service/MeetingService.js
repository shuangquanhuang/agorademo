class MeetingService {
  fetchMeetingList() {

    const meetingList = [
      {
        'id': 0,
        'createTime': 0,
        'channelName': 'f3232',
        'description': 'fewcw',
        'title': 'wfewfwe',
        'token': 'token 1',
      },
      {
        'id': 1,
        'createTime': 1000,
        'channelName': 'yrrb',
        'description': 'gerger',
        'title': 'wfewffwewe',
        'token': 'token 2',
      },
      {
        'id': 2,
        'createTime': 5000,
        'channelName': 'fe',
        'description': 'htr',
        'title': 'htr',
        'token': 'token 3',
      },
      {
        'id': 3,
        'createTime': 9000,
        'channelName': 'fwefwe',
        'description': 'hgrth',
        'title': 'hrthrt',
        'token': 'token 4',
      },
    ];

    return Promise.resolve(meetingList);
  }
}

export default new MeetingService();
