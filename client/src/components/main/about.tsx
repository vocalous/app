import React, { useState } from 'react';
import { Button, Collapse, Navbar } from 'react-bootstrap';
import {
  CaretDownFill,
  CaretRightFill,
  PlayCircleFill,
} from 'react-bootstrap-icons';
import MetaTags from 'react-meta-tags';
import qs from 'qs';

import ErrorModal from '../error-modal';
import { useStoreActions, useStoreState } from '../../model';

import './about.css';

function StartButton() {
  const { initializeStream, setEnabled } = useStoreActions(
    (actions) => actions
  );

  const start = async () => {
    await initializeStream();
    setEnabled(true);
    console.log('Stream Initialized');
  };

  const text = 'START';

  return (
    <Button className="btn-start" variant="primary" onClick={start}>
      <div className="btn-start-content">
        <div className="btn-start-text">{text}</div>
        <PlayCircleFill size={40} color="white" />
      </div>
    </Button>
  );
}

function Header() {
  return (
    <div className="heading">
      <h1>VOCALOUS</h1>
      <p>Practice singing for free</p>
    </div>
  );
}

function ExternalLink({ link, target }) {
  return (
    <a href={link} target={target ? target : '_blank'} rel="noreferrer">
      {link}
    </a>
  );
}

function SongInfo() {
  const params = qs.parse(window.location.search.substr(1));
  const { lyrics, music, title } = params;
  const notes = useStoreState((state) => state.melody.notes);
  if (!notes) {
    return null;
  }

  // Use MetaTags to dynamically change meta tags in <head>,
  // they are read by crawlers and social media preview fetchers
  const newTitle = title ? `${title} – Vocalous` : undefined;
  return (
    <div className="song-info">
      {newTitle && (
        <MetaTags id={title.replace(/[\W_]+/g, 'x')}>
          <title>{newTitle}</title>
          <meta property="og:title" content={newTitle} />
        </MetaTags>
      )}
      <div className="container">
        <h3>This link contains notes:</h3>
        <div className="song-info-details">
          <div>
            <strong>{title ? title : 'Untitled'}</strong>
          </div>
          {music && (
            <div>
              Music: <ExternalLink link={music} target="music--page" />
            </div>
          )}
          {lyrics && (
            <div>
              Lyrics: <ExternalLink link={lyrics} target="lyrics--page" />
            </div>
          )}
        </div>
        <h5>Sing it!</h5>
        <ol>
          <li>Grab your headphones</li>
          {music && <li>Start playing the music from the link</li>}
          <li>
            Press START from the bottom of this page and allow using your mic
          </li>
        </ol>
      </div>
    </div>
  );
}

function AboutSection() {
  const [open, setOpen] = useState(false);
  const iconProps = {
    size: 25,
    color: 'black',
  };
  const caret = open ? (
    <CaretDownFill {...iconProps} />
  ) : (
    <CaretRightFill {...iconProps} />
  );
  return (
    <div className="container container-about">
      <h3 onClick={() => setOpen(!open)} className="about-toggler">
        <span className="toggler-caret">{caret}</span>
        About
      </h3>
      <Collapse in={open}>
        <div id="about-data">
          <h5>How does this app work?</h5>
          <p>
            If you opened this by a link that contains a melody, you can see the
            information about it. By pressing start you can practice singing the
            melody using your microphone.
          </p>
          <p>
            If you can't see any song information above, you can still practice
            singing without notes by pressing start.
          </p>

          <h5>Why doesn't this app work?</h5>
          <p>
            Make sure that you have allowed this site to use your microphone.
            It's also possible that your browser does not support the technology
            that this app uses. Try the latest Google Chrome browser. iPhone and
            iPad users might have to wait until the technology is supported on
            their platform.
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
          <h5>How can I create notes to a song?</h5>
          <p>This feature will be added in the future.</p>
          <h5>Will this app be always free?</h5>
          <p>Yes. This is an open source project.</p>
          <h5>Source</h5>
          <p>
            <a
              href="https://github.com/vocalous/app"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/vocalous/app
            </a>
          </p>
        </div>
      </Collapse>
    </div>
  );
}

export function About() {
  const error = useStoreState((state) => state.error);
  const setError = useStoreActions((actions) => actions.setError);
  return (
    <>
      <Header />
      <SongInfo />
      <AboutSection />
      <Navbar fixed="bottom" bg="dark" className="justify-content-center ">
        <StartButton />
      </Navbar>
      <ErrorModal show={!!error} onClose={() => setError(null)} error={error} />
    </>
  );
}
