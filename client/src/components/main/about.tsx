import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

import LanguageModal from '../language-modal';
import './about.css';

export default function About() {
  const [showLangModal, setShowLangModal] = useState(false);
  const { t } = useTranslation();
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <button className="btn-lang" onClick={() => setShowLangModal(true)}>
            <Translate size={40} color="#001233" />
          </button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>{t('FAQ.TITLE')}</h3>
          <h5>{t('FAQ.MUSIC.TITLE')}</h5>
          <p>{t('FAQ.MUSIC.BODY')}</p>
          <h5>{t('FAQ.HOW_WORKS.TITLE')}</h5>
          <p>{t('FAQ.HOW_WORKS.BODY1')}</p>
          <p>{t('FAQ.HOW_WORKS.BODY2')}</p>
          <h5>{t('FAQ.PROBLEM.TITLE')}</h5>
          <p>{t('FAQ.PROBLEM.BODY')}</p>
          <h5>{t('FAQ.PRIVACY.TITLE')}</h5>
          <p>{t('FAQ.PRIVACY.BODY')}</p>
          <h5>{t('FAQ.FREE.TITLE')}</h5>
          <p>{t('FAQ.FREE.BODY')}</p>
          <h3>{t('SOURCE')}</h3>
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
      <LanguageModal
        show={showLangModal}
        onClose={() => setShowLangModal(false)}
      />
    </Container>
  );
}
