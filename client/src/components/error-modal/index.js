import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function ErrorModal({ error, show, onClose }) {
  const { t } = useTranslation();
  let txt = t('ERROR.TXT.DEFAULT');
  if (error === 'mic-stream') {
    txt = (
      <div>
        {t('ERROR.MIC.TITLE')}
        <ul>
          <li>{t('ERROR.MIC.1')}</li>
          <li>{t('ERROR.MIC.2')}</li>
          <li>{t('ERROR.MIC.3')}</li>
        </ul>
      </div>
    );
  } else if (error === 'audio-context') {
    txt = <div>{t('ERROR.NOT_SUPPORTED')}</div>;
  }
  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{t('ERROR.TITLE')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{txt}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t('OK')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
