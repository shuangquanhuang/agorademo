import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import React, { useState } from 'react';
import  {isEmpty} from 'loadsh';
import classNames from 'classnames';
import {authActions, entryBoardActions, errorActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import {STORE_TYPE} from '../store';
import {createToken} from '../service/TokenService';

const NewMeeingDialog = (props) => {
  const [channelName, setChannelName] = useState('');

  const isInputValid = () => {
    return !isEmpty(channelName);
  }

  const onCancel = () => {
    props.setNewMeetingInputVisible(false);
  }

  const onSubmit = () => {
    props.setChannel(channelName);
    props.setNewMeetingInputVisible(false);

    const {applicationId, userId} = props;

    createToken({
      applicationId,
      channelName,
      userId
    }).then((token) => {
      props.setToken(token);
    }).catch(e => {
      props.setError(new Error((e && e.message) || "Error while creating meeting."));
    });
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
                <input placeholder={'Channel Name'} value={channelName} onChange={(event) => setChannelName(event.target.value)}/>
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
    const {applicationId, userId} = typedSelector(state, STORE_TYPE.AUTH);

    return {
      applicationId,
      userId,
    };
  },
  {
    setNewMeetingInputVisible: entryBoardActions.setNewMeetingInputVisible,
    setApplicationId: authActions.setApplicationId,
    setChannel: authActions.setChannel,
    setUserId: authActions.setUserId,
    setError: errorActions.setError,
    setToken: authActions.setToken,
  }
)(NewMeeingDialog);
