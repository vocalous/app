import React from 'react';
import { Nav, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import About from './about';
import Importer from '../importer';
import Sing from './sing';

function Header() {
  const { t } = useTranslation();
  return (
    <div className="heading">
      <h1>VOCALOUS</h1>
      <div>{t('SLOGAN')}</div>
    </div>
  );
}

function Tabs() {
  const { t } = useTranslation();
  return (
    <Tab.Container id="tab-container" defaultActiveKey="sing">
      <Nav variant="pills">
        <Nav.Item>
          <Nav.Link eventKey="sing">{t('TAB.SING')}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="create">{t('TAB.CREATE')}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="help">
            <strong>?</strong>
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="sing">
          <Sing />
        </Tab.Pane>
        <Tab.Pane eventKey="create">
          <Importer />
        </Tab.Pane>
        <Tab.Pane eventKey="help">
          <About />
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  );
}

export default function Main() {
  return (
    <>
      <Header />
      <Tabs />
    </>
  );
}
