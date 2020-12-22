import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Modal, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {CODEC, MODE} from '../agora';
import {STORE_TYPE} from '../store';
import {authActions, configActions, entryBoardActions} from '../store/actions';
import {typedSelector} from '../store/selectors';
import './ConfigInput.scss';


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

  const  getConfigRows = () => {
    const rows = [];
    for (let [label, val, items] of [
      ['Camera:', selectedCamera && selectedCamera.label, getCameraItems()],
      ['Microphone', selectedMicrophone && selectedMicrophone.label, getMicrophoneItems()],
      ['Codec:', selectedCodec, getCodecItems()],
      ['Mode:', selectedMode, getModeItems()]
    ] ) {
      rows.push(
        <Row className={'config-input-row'} key={label}>
          <Col xs={3}>
            <span>{label}</span>
          </Col>
          <Col xs={9}>
            <Dropdown size={'sm'}>
              <Dropdown.Toggle variant={'secondary'}>{val}</Dropdown.Toggle>
              <Dropdown.Menu>
                {items}
              </Dropdown.Menu>
            </Dropdown>
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
            {getConfigRows()}
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
