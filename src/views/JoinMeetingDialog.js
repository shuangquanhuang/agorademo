import classNames from 'classnames';
import {isEmpty} from 'loadsh';
import React, {useState} from 'react';
import {Button, Col, Container, Modal, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTES} from '../constants';
import {STORE_TYPE} from '../store';
import {authActions, entryBoardActions, messageActions} from '../store/actions';
import {typedSelector} from '../store/selectors';

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

  const getInputRows = () => {
    const rows = [];
    for (let [label, val, disabled, onChange] of [
      ['Application ID', props.applicationId || '', true, null],
      ['User ID', props.userId || '', true, null],
      ['Channel Name', channelName || props.channelName || '', false, (event) => setChannelName(event.target.value)]
    ]) {
      rows.push(
        <Row key={label}>
          <Col xs={4}>
            <span>{label+':'}</span>
          </Col>
          <Col xs={8}>
            <input placeholder={label} value={val} disabled={disabled} onChange={onChange}/>
          </Col>
        </Row>
      );
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
