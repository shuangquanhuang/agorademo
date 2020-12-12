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
import {ArrowLeftCircle} from 'react-bootstrap-icons';
import momemt from 'moment';

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
    const {channelName} = meeting;
    props.setChannelName(channelName);
    history.push(ROUTES.MEETING);
  }

  const backToHome = () => {
    history.push(ROUTES.ROOT);
  }

  const columns = [
    {dataField: 'id', text: 'Meeting Id'},
    {dataField: 'channelName', text: 'Channel Name'},
    {dataField: 'description', text: 'Description'},
    {dataField: 'creationTime', text: 'Creation Time', formatter: (cellContent, row) => {
      try {
        return momemt(parseInt(cellContent)).format("YYYY-MM-DD HH:mm:ss");
      } catch (e) {
        return '';
      }
      }},
    {dataField: 'token', isDummyField: true, text: 'Join Meeting', formatter: (cellContent, row) => {
      return <Button variant='outline-primary' onClick={() => joinMeeting(row)}>Join</Button>
    }},
  ]

  return(
    <div className={'meeting-list'}>
      <div className={'title'}>
        <div className={'left'}>
          <span>Meeting List</span>
        </div>
        <div className={'right'}>
          <Button variant={'light'} onClick={() => backToHome()}>
            <ArrowLeftCircle color={'royalblue'} size={25}/>
          </Button>
        </div>
      </div>
      <BootstrapTable caption='Meeting List' keyField='id' data={ meetingList } columns={ columns } pagination={ paginationFactory() } />
    </div>
  );
}

export default connect(null, {
  setToken: authActions.setToken,
  setChannelName: authActions.setChannelName,
})(MeetingList);
