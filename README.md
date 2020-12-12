# Getting Started with Agora Demo App

You can access demo at [AgoraDemo](https://www.tuanzimama.com/).

If broswer blocks it because of untrusted certificate, type "thisisunsafe" to continue.

## Quick start

**Start Token Server [OPTIONAL]**

Tokenserver is hosted on aliyun

Execute blow scripts in AgoraTokenServer
```
    pip install virtualenv
    virtualenv -p python3 venv
    source venv/bin/activate or env\Scripts\activate
    pip install -r requirements.txt
    gunicorn --bind 127.0.0.1:5000 app:app
```

**Start App**

```
npm install
npm run start
```


## Features
1. meeting for multiple user
2. remote token server to generate token dynamically
3. meeting list
4. https


## Tech Stack
### Frontend
1. react (both function and class component are used, hooks)
3. Redux
4. react-router
5. async/await
6. react-boostrap
7. fetch
### Backend
1. python3
2. Flask
3. Gunicorn
4. sqlite (use memory db so that you can run it without db)
5. Nginx to server webpage and act as reverse proxy to backend service
6. HTTPS (free certificate from aliyun)
7. supervisord to keep backend service alive

### Sequential Diagram For Join Meeting
```
@startuml

autonumber


App -> JoinMeetingDialog: click
activate App
activate JoinMeetingDialog

JoinMeetingDialog -> ReactorRouterHistory: push
activate ReactorRouterHistory
deactivate JoinMeetingDialog

ReactorRouterHistory -> MeetingRoom: show
activate MeetingRoom
deactivate ReactorRouterHistory

MeetingRoom --> MeetingRoom: componentDidMount
MeetingRoom -> MeetingRoom: startMeeting
MeetingRoom -> AgoraClient: createClient
activate AgoraClient

MeetingRoom -> AgoraClient: on events
AgoraClient -> AgoraClient: init
AgoraClient -> AgoraClient: joinMeeting
AgoraClient -> AgoraClient: publish

AgoraClient --> MeetingRoom: onStreamPublished
MeetingRoom -> MeetingRoom: add local stream player to view
MeetingRoom -> StreamPlayer: play
activate StreamPlayer
AgoraClient --> MeetingRoom: onRemoteStreamAdded
MeetingRoom -> MeetingRoom: add remote stream player to view
AgoraClient --> MeetingRoom: onStreamSubscribed
MeetingRoom -> RemoteStreamPlayer: play
activate RemoteStreamPlayer

AgoraClient --> MeetingRoom: onRemoteStreamRemoved
MeetingRoom -> MeetingRoom: remote remote stream player from view
MeetingRoom -> RemoteStreamPlayer: stop
deactivate RemoteStreamPlayer


MeetingRoom --> MeetingRoom: onLeaveClicked
MeetingRoom -> StreamPlayer: stop
MeetingRoom -> StreamPlayer: close
deactivate StreamPlayer
MeetingRoom -> AgoraClient: leave
deactivate AgoraClient
deactivate MeetingRoom

@enduml
```
