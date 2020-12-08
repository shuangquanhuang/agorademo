import React from 'react';
import {Button} from 'react-bootstrap';
import './NewMeeting.scss';

const NewMeeting = (props) => {
  return (
    <div className={'new-meeting'}>
      <Button variant="outline-primary">New Meeting</Button>
    </div>
  )
}

export default NewMeeting;
