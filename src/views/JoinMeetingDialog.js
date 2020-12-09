import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import React, { useState } from 'react';
import  {isEmpty} from 'loadsh';
import classNames from 'classnames';
import {authActions, entryBoardActions} from '../store/actions';
import { typedSelector } from '../store/selectors';
import { STORE_TYPE } from '../store';


const JoinMeetingDialog = (props) => {
  // TODO: remove default
  const [channelName, setChannelName] = useState(props.channelName || '');
  const [token, setToken] = useState(props.token || '');

  const isInputValid = () => {
    const channelNameValid = !isEmpty(channelName) || !isEmpty(props.channelName);
    const tokenValid = !isEmpty(token) || !isEmpty(props.token);
    
    return channelNameValid && tokenValid;
  }

  const onCancel = () => {
    props.setJointMeetingInputVisible(false);
  }

  const onSubmit = () => {
    props.setChannel(channelName || props.channelName);
    props.setToken(token || props.token);
    props.setJointMeetingInputVisible(false);

    props.onSubmit();
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
                <input placeholder={'Channel Name'} value={channelName || props.channelName} onChange={(event) => setChannelName(event.target.value)}/>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <span>Token:</span>
              </Col>
              <Col xs={8}>
                <input placeholder={'Token'} value={token || props.token} onChange={(event) => setToken(event.target.value)}/>
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
    const {applicationId, userId, channel:channelName, token} = typedSelector(state, STORE_TYPE.AUTH);

    return {
      applicationId,
      userId,
      channelName,
      token,
    };
  },
  {
    setJointMeetingInputVisible: entryBoardActions.setJointMeetingInputVisible,
    setToken: authActions.setToken,
    setApplicationId: authActions.setApplicationId,
    setChannel: authActions.setChannel,
    setUserId: authActions.setUserId,
  }
)(JoinMeetingDialog);
