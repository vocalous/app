import React, { useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';

import i18n, { getLanguages } from '../../translations';

export default function LanguageModal({ error, show, onClose }) {
  console.debug('FOO', i18n.language);
  const [selected, setSelected] = useState(i18n.language);
  const list = getLanguages().map((lang) => (
    <ListGroup.Item
      action
      key={lang.id}
      onClick={() => setSelected(lang.id)}
      active={selected === lang.id}
    >
      {lang.name}
    </ListGroup.Item>
  ));

  const changeLang = async () => {
    await i18n.changeLanguage(selected);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Body>{list}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={changeLang}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
