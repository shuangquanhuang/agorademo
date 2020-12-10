import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTES} from '../constants';
import {MeetingService} from '../service';
import {Button} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './MeetingList.scss';
import {authActions} from '../store/actions';

const MeetingList = (props) => {
  const history = useHistory();
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    MeetingService.fetchMeetingList()
      .then(items => {
        setMeetingList(items);
      })
  }, []);

  const joinMeeting = (row) => {
    const meeting = meetingList.find(item => item.id === row.id);
    const {channelName, token} = meeting;
    props.setChannelName(channelName);
    props.setToken(token);
    history.push(ROUTES.MEETING);
  }

  const columns = [
    {dataField: 'id', text: 'Meeting Id'},
    {dataField: 'channelName', text: 'Channel Name'},
    {dataField: 'description', text: 'Description'},
    {dataField: 'createTime', text: 'Creation Time'},
    {dataField: 'token', isDummyField: true, text: 'Join Meeting', formatter: (cellContent, row) => {
      return <Button variant="outline-primary" onClick={() => joinMeeting(row)}>Join</Button>
    }},
  ]

  return(
    <div className={'meeting-list'}>
      <BootstrapTable caption="Meeting List" keyField='id' data={ meetingList } columns={ columns } pagination={ paginationFactory() } />
    </div>
  );
}


export default connect(null, {
  setToken: authActions.setToken,
  setChannelName: authActions.setChannelName,
})(MeetingList);
