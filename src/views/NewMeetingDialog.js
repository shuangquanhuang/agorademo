import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import React, { useState } from 'react';
import  {isEmpty} from 'loadsh';
import classNames from 'classnames';
import {authActions, entryBoardActions, messageActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import {STORE_TYPE} from '../store';
import {TokenService, MeetingService} from '../service';


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

    const {applicationId, userId, certificate, expireTimeInSeconds} = props;

    try {
      const token = await TokenService.createToken({
        applicationId,
        channelName,
        userId,
        expireTimeInSeconds,
        certificate,
      });
      props.setToken(token);
      const meetingId = await MeetingService.createMeeting({
        applicationId,
        channelName,
        token,
        creatorId: userId,
        description
      });
      props.setMessage('Meeting created, you can find it in meeting list');
    } catch(e) {
      props.setError(e || "Error while creating meeting.");
    }
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
            <Row>
              <Col xs={4}>
                <span>Application ID:</span>
              </Col>
              <Col xs={8}>
                <input placeholder={'Application ID'} value={props.applicationId} disabled/>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <span>User ID:</span>
              </Col>
              <Col xs={8}>
                <input placeholder={'User ID'} value={props.userId} disabled/>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <span>Channel Name:</span>
              </Col>
              <Col xs={8}>
                <input placeholder={'Channel Name'} value={channelName} onChange={(event) => setChannelName(event.target.value)}/>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <span>Description:</span>
              </Col>
              <Col xs={8}>
                <input placeholder={'Description'} value={description} onChange={(event) => setDescription(event.target.value)}/>
              </Col>
            </Row>
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
    const {applicationId, userId, expireTimeInSeconds, certificate} = typedSelector(state, STORE_TYPE.AUTH);

    return {
      applicationId,
      userId,
      expireTimeInSeconds,
      certificate,
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
