import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {useHistory} from 'react-router';
import {ROUTES} from '../constants';
import {errorActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import {STORE_TYPE} from '../store';

const ErrorCard = (props) => {

  const history = useHistory();

  const onHide = () => {
    props.setError(null);
    history.push(ROUTES.ROOT);
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
            Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Something Wrong, Close to back to homepage</p>
          <p>
            {props.error.message || ''}
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
    const {error} = typedSelector(state, STORE_TYPE.ERROR);

    return {
      error,
      shouldVisible: error != null,
    };
  },
  {
    setError: errorActions.setError,
  }
)(ErrorCard);
