import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import React, { useState } from 'react';
import  {isEmpty} from 'loadsh';
import classNames from 'classnames';
import {authActions, entryBoardActions} from '../store/actions';

const JoinMeetingInput = (props) => {
  const [applicationId, setApplicationId] = useState("f29ca80ee12c4e2aa63e2c0c7a0a0c9d");
  const [channelName, setChannelName] = useState("asd");
  const [token, setToken] = useState("006f29ca80ee12c4e2aa63e2c0c7a0a0c9dIAAyQNB+i8KJanGIVPtwbp/Wkeo1RbulZbdROmZ0Kw+bHXH3mfgAAAAAEAC3euZptYPQXwEAAQC1g9Bf");
  const [userId, setUserId] = useState("123");

  const isInputValid = () => {
    return !isEmpty(applicationId) && !isEmpty(channelName) && !isEmpty(token) && !isEmpty(userId);
  }

  const onCancel = () => {
    props.setJointMeetingInputVisible(false);
  }

  const onSubmit = () => {
    props.setChannel(channelName);
    props.setToken(token);
    props.setApplicationId(applicationId);
    props.setUserId(userId);
    props.setJointMeetingInputVisible(false);
    props.onSubmit();
  }

  return (
    <div>
      <Modal
        show={props.show}
        aria-labelledby={"contained-modal-title-vcenter"}
        centered
        onHide={onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
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
                <input placeholder={'Application ID'} value={applicationId} onChange={(event) => setApplicationId(event.target.value)}/>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <span>User ID:</span>
              </Col>
              <Col xs={8}>
                <input placeholder={'User ID'} value={userId} onChange={(event) => setUserId(event.target.value)}/>
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
                <span>Token:</span>
              </Col>
              <Col xs={8}>
                <input placeholder={'Token'} value={token} onChange={(event) => setToken(event.target.value)}/>
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
  null,
  {
    setJointMeetingInputVisible: entryBoardActions.setJointMeetingInputVisible,
    setToken: authActions.setToken,
    setApplicationId: authActions.setApplicationId,
    setChannel: authActions.setChannel,
    setUserId: authActions.setUserId,
  }
)(JoinMeetingInput);
