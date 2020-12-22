import classNames from 'classnames';
import {isEmpty} from 'loadsh';
import React, {useState} from 'react';
import {Button, Col, Container, Modal, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {MeetingService} from '../service';
import {STORE_TYPE} from '../store';
import {authActions, entryBoardActions, messageActions} from '../store/actions';
import {typedSelector} from '../store/selectors';


const NewMeetingDialog = (props) => {
  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');

  const isInputValid = () => {
    return !isEmpty(channelName);
  }

  const onCancel = () => {
    props.setNewMeetingInputVisible(false);
  }

  const onSubmit = async () => {
    props.setChannelName(channelName);
    props.setNewMeetingInputVisible(false);

    const {applicationId, userId} = props;

    try {
      await MeetingService.createMeeting({
        applicationId,
        channelName,
        creatorId: userId,
        description
      });
      props.setMessage('Meeting created, you can find it in meeting list');
    } catch(e) {
      props.setError(e || "Error while creating meeting.");
    }
  }

  const getInputRows = () => {
    const rows = [];
    for (let [label, val, disabled, onChange] of [
      ['Application ID', props.applicationId, true, null],
      ['User ID', props.userId, true, null],
      ['Channel Name', channelName, false, (event) => setChannelName(event.target.value)],
      ['Description', description, false, (event) => setDescription(event.target.value)]
    ]) {
      rows.push(
        <Row key={label}>
          <Col xs={4}>
            <span>{label + ':'}</span>
          </Col>
          <Col xs={8}>
            <input placeholder={label} value={val} disabled={disabled} onChange={onChange}/>
          </Col>
        </Row>
      )
    }

    return rows;
  }

  return (
    <div>

      <Modal
        show={props.show}
        aria-labelledby={'contained-modal-title-vcenter'}
        centered
        onHide={onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Join Meeting
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {getInputRows()}
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmit} className={classNames({'disabled': !isInputValid()})} >Submit</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default connect(
  state => {
    const {applicationId, userId} = typedSelector(state, STORE_TYPE.AUTH);

    return {
      applicationId,
      userId,
    };
  },
  {
    setNewMeetingInputVisible: entryBoardActions.setNewMeetingInputVisible,
    setApplicationId: authActions.setApplicationId,
    setChannelName: authActions.setChannelName,
    setUserId: authActions.setUserId,
    setError: messageActions.setError,
    setMessage: messageActions.setMessage,
    setToken: authActions.setToken,
  }
)(NewMeetingDialog);
