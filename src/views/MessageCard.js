import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTES} from '../constants';
import {STORE_TYPE} from '../store';
import {messageActions} from '../store/actions';
import {typedSelector} from '../store/selectors';

const MessageCard = (props) => {

  const history = useHistory();

  const onHide = () => {
    props.setError(null);
    props.setMessage(null);
    history.push(ROUTES.ROOT);
  }

  const getTitle = () => {
    if (props.error) {
      return 'Error';
    }

    return 'Message';
  }

  const getMessage = () => {
    if (props.error) {
      if (props.error.hasOwnProperty('message')) {
        return props.error.message;
      }

      return JSON.stringify(props.error || '');
    }

    return JSON.stringify(props.message || '');
  }

  return (
    <div>
      <Modal
        show={props.shouldVisible}
        aria-labelledby={'contained-modal-title-vcenter'}
        centered
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {getTitle()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {getMessage()}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default connect(
  state => {
    const {error, message} = typedSelector(state, STORE_TYPE.MESSAGE);

    return {
      error,
      message,
      shouldVisible: Boolean(error || message),
    };
  },
  {
    setError: messageActions.setError,
    setMessage: messageActions.setMessage
  }
)(MessageCard);
