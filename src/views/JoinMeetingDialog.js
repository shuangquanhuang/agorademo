import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import React, { useState } from 'react';
import {isEmpty} from 'loadsh';
import classNames from 'classnames';
import {authActions, entryBoardActions, messageActions} from '../store/actions';
import { typedSelector } from '../store/selectors';
import { STORE_TYPE } from '../store';
import {ROUTES} from '../constants';
import {useHistory} from 'react-router';

const JoinMeetingDialog = (props) => {
  const history = useHistory();

  const [channelName, setChannelName] = useState(props.channelName || '');

  const isInputValid = () => {
    return !isEmpty(channelName) || !isEmpty(props.channelName);
  }

  const onCancel = () => {
    props.setJointMeetingInputVisible(false);
  }

  const onSubmit = async () => {
    const {
      setChannelName,
      setJointMeetingInputVisible,
      setError,
    } = props;

    const actualChannelName = channelName || props.channelName
    setChannelName(actualChannelName);
    setJointMeetingInputVisible(false);
    
    try {
      history.push(ROUTES.MEETING);
    } catch(e) {
      setError(e || 'Error while query meeting information');
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
                <input placeholder={'Application ID'} value={props.applicationId || ''} disabled/>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <span>User ID:</span>
              </Col>
              <Col xs={8}>
                <input placeholder={'User ID'} value={props.userId || ''} disabled/>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <span>Channel Name:</span>
              </Col>
              <Col xs={8}>
                <input placeholder={'Channel Name'} value={channelName || props.channelName || ''} onChange={(event) => setChannelName(event.target.value)}/>
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
    const {
      applicationId,
      userId,
      channelName,
    } = typedSelector(state, STORE_TYPE.AUTH);

    return {
      applicationId,
      userId,
      channelName,
    };
  },
  {
    setJointMeetingInputVisible: entryBoardActions.setJointMeetingInputVisible,
    setApplicationId: authActions.setApplicationId,
    setChannelName: authActions.setChannelName,
    setUserId: authActions.setUserId,
    setError: messageActions.setError,
  }
)(JoinMeetingDialog);
