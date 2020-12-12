import {connect} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {Modal, Button, Container, Row, Col, Dropdown} from 'react-bootstrap';
import {authActions, configActions, entryBoardActions} from '../store/actions';
import './ConfigInput.scss';
import { typedSelector } from '../store/selectors';
import { STORE_TYPE } from '../store';
import {CODEC, MODE} from '../agora';


const ConfigInput = (props) => {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedMicrophone, setSelectedMicrophone] = useState(null);
  const [codecList, ] = useState([...Object.values(CODEC)]);
  const [selectedCodec, setSelectedCodec] = useState(codecList[0]);
  const [modeList, ] = useState([...Object.values(MODE)]);
  const [selectedMode, setSelectedMode] = useState(modeList[0]);
  

  useEffect(() => {
    if (!selectedCamera) {
      setSelectedCamera(props.camera);
    }
    if (!selectedMicrophone) {
      setSelectedMicrophone(props.microphone);
    }
  }, [props, selectedCamera, selectedMicrophone]);

  const onCancel = () => {
    props.setConfigInputVisible(false);
  }

  const onSubmit = () => {
    props.setConfigInputVisible(false);
    props.setLiveMode(selectedMode);
    props.setCodec(selectedCodec);
    props.setMicrophone(selectedMicrophone);
    props.setCamera(selectedCamera);
  }

  const onCameraSelected = (camera) => {
    setSelectedCamera(camera);
  }

  const onMicrophoneSelected = (microphone) => {
    setSelectedMicrophone(microphone);
  }

  const onCodecSelected = (codec) => {
    setSelectedCodec(codec);
  }

  const onModeSelected = (mode) => {
    setSelectedMode(mode);
  }

  const getCameraItems = () => {
    return props.cameraList.map(camera => {
      return <Dropdown.Item key={camera.deviceId} onSelect={() => onCameraSelected(camera)}>
        {camera.label}
      </Dropdown.Item>;
    });
  };

  const getMicrophoneItems = () => {
    return props.microphoneList.map(microphone => {
      return <Dropdown.Item key={microphone.deviceId} onSelect={() => onMicrophoneSelected(microphone)}>
        {microphone.label}
      </Dropdown.Item>
    });
  }

  const getCodecItems = () => {
    return codecList.map(codec => {
      return <Dropdown.Item key={codec} onSelect={() => onCodecSelected(codec)}>{codec}</Dropdown.Item>
    })
  }

  const getModeItems = () => {
    return modeList.map(mode => {
      return <Dropdown.Item key={mode} onSelect={() => onModeSelected(mode)}>{mode}</Dropdown.Item>
    })
  }

  return (
    <div>
      <Modal
        show={props.show}
        aria-labelledby={'contained-modal-title-vcenter'}
        centered
        size={'lg'}
        onHide={onCancel}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Config
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className={'config-input-row'}>
              <Col xs={3}>
                <span>Camera:</span>
              </Col>
              <Col xs={9}>
                <Dropdown size={'sm'}>
                  <Dropdown.Toggle variant={'secondary'}>{selectedCamera && selectedCamera.label}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {getCameraItems()}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className={'config-input-row'}>
              <Col xs={3}>
                <span>Microphone:</span>
              </Col>
              <Col xs={9}>
                <Dropdown size={'sm'}>
                  <Dropdown.Toggle variant={'secondary'}>{selectedMicrophone && selectedMicrophone.label}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {getMicrophoneItems()}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className={'config-input-row'}>
              <Col xs={3}>
                <span>Codec:</span>
              </Col>
              <Col xs={9}>
                <Dropdown size={'sm'}>
                  <Dropdown.Toggle variant={'secondary'}>{selectedCodec}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {getCodecItems()}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className={'config-input-row'}>
              <Col xs={3}>
                <span>Mode:</span>
              </Col>
              <Col xs={9}>
                <Dropdown size={'sm'}>
                  <Dropdown.Toggle variant={'secondary'}>{selectedMode}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {getModeItems()}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSubmit} >Submit</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default connect(
  state => {
    const {cameraList, microphoneList, camera, microphone} = typedSelector(state, STORE_TYPE.CONFIG);

    return {
      camera,
      microphone,
      cameraList,
      microphoneList,
    }
  },
  {
    setConfigInputVisible: entryBoardActions.setConfigInputVisible,
    setToken: authActions.setToken,
    setApplicationId: authActions.setApplicationId,
    setUserId: authActions.setUserId,
    setLiveMode: configActions.setLiveMode,
    setCodec: configActions.setCodec,
    setMicrophone: configActions.setMicrophone,
    setCamera: configActions.setCamera,
  }
)(ConfigInput);
