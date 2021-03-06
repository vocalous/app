import React, { useEffect, useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { PlayCircleFill } from 'react-bootstrap-icons';
import qs from 'qs';
import MetaTags from 'react-meta-tags';
import { useTranslation } from 'react-i18next';

import ErrorModal from '../error-modal';
import { useStoreActions, useStoreState } from '../../model';

function StartButton() {
  const [active, setActive] = useState(false);
  const { initializeStream, setEnabled } = useStoreActions(
    (actions) => actions
  );

  // Activate the button soon after it has been mounted.
  // This prevents a bug where stop button touch triggers this button too
  // when they are positioned equally.
  useEffect(() => {
    const handle = setTimeout(() => setActive(true), 500);
    return () => clearTimeout(handle);
  }, []);

  const { t } = useTranslation();

  const start = async () => {
    await initializeStream();
    setEnabled(true);
    console.log('Stream Initialized');
  };

  return (
    <Button
      className="btn-start"
      variant="primary"
      onClick={start}
      disabled={!active}
    >
      <div className="btn-start-content">
        <div className="btn-start-text">{t('START')}</div>
        <PlayCircleFill size={40} color="white" />
      </div>
    </Button>
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
  const { t } = useTranslation();
  const params = qs.parse(window.location.search.substr(1));
  const { author, lyrics, music, title } = params;
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
      <Container>
        <Row>
          <Col>
            <h3>{t('SONG.LINK_CONTAINS')}</h3>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="song-info-details">
              <div>
                <strong>{title ? title : t('SONG.UNTITLED')}</strong>
              </div>
              {author && <div>{author}</div>}
              {music && (
                <div>
                  {t('SONG.MUSIC')}{' '}
                  <ExternalLink link={music} target="music--page" />
                </div>
              )}
              {lyrics && (
                <div>
                  {t('SONG.LYRICS')}{' '}
                  <ExternalLink link={lyrics} target="lyrics--page" />
                </div>
              )}
            </div>
          </Col>
          <Col md={6}>
            <h5>{t('SONG.SING.TITLE')}</h5>
            <ol>
              <li>{t('SONG.SING.HEADPHONES')}</li>
              {music && <li>{t('SONG.SING.PLAY_MUSIC')}</li>}
              <li>{t('SONG.SING.START')}</li>
            </ol>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default function Sing() {
  const error = useStoreState((state) => state.error);
  const { setError } = useStoreActions((actions) => actions);
  return (
    <>
      <SongInfo />
      <Container>
        <Row>
          <Col className="text-center">
            <StartButton />
          </Col>
        </Row>
      </Container>
      <ErrorModal show={!!error} onClose={() => setError(null)} error={error} />
    </>
  );
}
