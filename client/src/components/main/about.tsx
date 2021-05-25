import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import './about.css';

export default function About() {
  return (
    <Container>
      <Row>
        <Col>
          <h3>FAQ</h3>
          <h5>How does this app work?</h5>
          <p>
            If you opened this by a link that contains a melody, you can see the
            information about it. By pressing start you can practice singing the
            melody using your microphone.
          </p>
          <p>
            If you can't see any song information, you can practice singing
            without notes by pressing start.
          </p>
          <h5>Why doesn't this app work?</h5>
          <p>
            Make sure that your microphone is working and you have allowed this
            site to use it. It's also possible that your browser does not
            support the technology that this app uses. Try the newest Google
            Chrome browser.
          </p>
          <h5>How does this app handle my voice?</h5>
          <p>
            The app respects your privacy. Your voice is not stored and is not
            sent out from your browser. The app uses your mic only to detect the
            pitch from your singing.
          </p>
          <h5>Where is the music?</h5>
          <p>
            This service does not contain any music for copyright reasons. Links
            can be provided to play the music and to read the lyrics from other
            services.
          </p>
          <h5>Will this app be always free?</h5>
          <p>Yes. This is an open source project.</p>
          <h3>Source</h3>
          <p>
            <a
              href="https://github.com/vocalous/app"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/vocalous/app
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
