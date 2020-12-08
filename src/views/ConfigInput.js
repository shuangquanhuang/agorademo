import {connect} from 'react-redux';
import React, { useState } from 'react';
import {Modal, Button, Container, Row, Col, Dropdown} from 'react-bootstrap';
import  {isEmpty} from 'loadsh';
import classNames from 'classnames';
import {AgoraClient, CODEC, MODE} from '../agora';
import {authActions, entryBoardActions} from '../store/actions';
import './ConfigInput.scss';

const ConfigInput = (props) => {


  const [cameraList, setCameraList] = useState(["camera1", "camera2"]);
  const [selectedCamera, setSelectedCamera] = useState(cameraList[0]);
  const [mirophoneList, setMicrophoneList] = useState(["micro 1", "mirco 2"]);
  const [selectedMicrophone, setSelectedMicrophone] = useState(mirophoneList[0]);
  const [codecList, setCodeList] = useState([...Object.values(CODEC)]);
  const [selectedCodec, setSelectedCodec] = useState(codecList[0]);
  const [modeList, setModeList] = useState([...Object.values(MODE)]);
  const [selectedMode, setSelectedMode] = useState(modeList[0]);


  const isInputValid = () => {
    return true;
  }

  const client = new AgoraClient();

  const onCancel = () => {
    props.setConfigInputVisible(false);
  }

  const onSubmit = () => {
    props.setConfigInputVisible(false);
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
    return cameraList.map(camera => {
      return <Dropdown.Item key={camera} onSelect={() => onCameraSelected(camera)}>{camera}</Dropdown.Item>;
    });
  };

  const getMicrophoneItems = () => {
    return mirophoneList.map(microphone => {
      return <Dropdown.Item key={microphone} onSelect={() => onMicrophoneSelected(microphone)}>{microphone}</Dropdown.Item>
    });
  }

  const getCodecItems = () => {
    return codecList.map(codec => {
      return <Dropdown.Item key={codec} onSelect={() => onCodecSelected(codec)}>{codec}</Dropdown.Item>
    })
  }

  const getModeItems = () => {
    return modeList.map(mode => {
      return <Dropdown.Item key={mode} onSelect={() => onCodecSelected(mode)}>{mode}</Dropdown.Item>
    })
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
            Config
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className={'config-input-row'}>
              <Col xs={4}>
                <span>Camera:</span>
              </Col>
              <Col xs={8}>
                <Dropdown size={"sm"}>
                  <Dropdown.Toggle variant={"secondary"}>{selectedCamera}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {getCameraItems()}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className={'config-input-row'}>
              <Col xs={4}>
                <span>Microphone:</span>
              </Col>
              <Col xs={8}>
                <Dropdown size={"sm"}>
                  <Dropdown.Toggle variant={"secondary"}>{selectedMicrophone}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {getMicrophoneItems()}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className={'config-input-row'}>
              <Col xs={4}>
                <span>Codec:</span>
              </Col>
              <Col xs={8}>
                <Dropdown size={"sm"}>
                  <Dropdown.Toggle variant={"secondary"}>{selectedCodec}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {getCodecItems()}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className={'config-input-row'}>
              <Col xs={4}>
                <span>Mode:</span>
              </Col>
              <Col xs={8}>
                <Dropdown size={"sm"}>
                  <Dropdown.Toggle variant={"secondary"}>{selectedMode}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {getModeItems()}
                  </Dropdown.Menu>
                </Dropdown>
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
    setConfigInputVisible: entryBoardActions.setConfigInputVisible,
    setToken: authActions.setToken,
    setApplicationId: authActions.setApplicationId,
    setChannel: authActions.setChannel,
    setUserId: authActions.setUserId,
  }
)(ConfigInput);
