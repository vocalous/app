import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ErrorModal({ error, show, onClose }) {
  let txt = 'Oh no! Some error happened. Try using Google Chrome browser.';
  if (error === 'mic-stream') {
    txt = (
      <div>
        Oh no! This app cannot use your mic. Try to:
        <ul>
          <li>make sure you have the microphone connected</li>
          <li>make sure you allowed this site to use your mic</li>
          <li>use Google Chrome</li>
        </ul>
      </div>
    );
  } else if (error === 'audio-context') {
    txt = (
      <div>
        Yikes! It seems that this app does not work on this device and/or
        browser. iPhones and iPads are not yet supporting the required
        technology. You can run this app on other devices meanwhile.
      </div>
    );
  }
  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Error 😰</Modal.Title>
      </Modal.Header>
      <Modal.Body>{txt}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
