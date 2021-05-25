import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import qs from 'qs';

import { encodeS1 } from '../../services/s1Encoding';
import { shortenLink } from '../../services/tinyurl';
import { parseUltraStarTxt } from '../../services/ultrastar-parser';

import './importer.css';

function FileForm({ onComplete }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [musicLink, setMusicLink] = useState('');
  const [lyricsLink, setLyricsLink] = useState('');
  const [file, setFile] = useState();
  const [validated, setValidated] = useState();
  const [useTinyURL, setUseTinyURL] = useState(true);
  const [creating, setCreating] = useState(false);
  const [fileError, setFileError] = useState();

  const generateURL = async (params) => {
    const appPath = window.location.href.split('?')[0];
    let queryParams = qs.stringify({
      title: title ? title : undefined,
      author: author ? author : undefined,
      music: musicLink ? musicLink : undefined,
      lyrics: lyricsLink ? lyricsLink : undefined,
      ...params,
    });
    let url = `${appPath}?${queryParams}`;
    if (onComplete) {
      if (useTinyURL) {
        url = await shortenLink(url);
      }
      onComplete(url);
    }
  };

  const createS1Notes = async (data, form) => {
    try {
      const parsed = parseUltraStarTxt(data);
      if (parsed && parsed.notes.length) {
        if (form.checkValidity()) {
          const encoded = encodeS1(parsed);
          await generateURL({ s1: encoded });
        }
        setValidated(true);
      } else {
        // invalid file format, no notes found
        setFileError('invalid');
      }
    } catch (error) {
      console.error(error);
    }
    setCreating(false);
  };

  const start = (form) => {
    setCreating(true);
    const reader = new FileReader();
    reader.addEventListener('load', (evt2) => {
      createS1Notes(reader.result, form);
    });
    reader.readAsText(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (file) {
      start(form);
    } else {
      setFileError('no-file');
    }
  };

  const handleFileChange = (evt) => {
    if (evt.target.files.length > 0) {
      // use the first file
      setFile(evt.target.files[0]);
    } else {
      setFile(undefined);
    }
    // clear file error
    setFileError();
    setValidated(false);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Song title</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Song title"
          value={title}
          maxLength="64"
          onChange={(evt) => setTitle(evt.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="import-file-group">
        <Form.File
          id="import-file"
          custom
        >
          <Form.File.Input
            accept=".txt"
            isInvalid={!!fileError}
            onChange={handleFileChange}
            required
          />
          <Form.File.Label>UltraStar TXT file</Form.File.Label>
          <Form.Control.Feedback type="invalid">
            Make sure the file is in UltraStar TXT format and it contains at least one note.
          </Form.Control.Feedback>
        </Form.File>
        <Form.Text className="text-muted">
          The notes file. The lyrics are ignored.
        </Form.Text>
        {fileError && (
          <div className="invalid-feedback">
            Foo Something wrong with the file. Make sure it is UltraStar TXT file or it contains at least one note.
          </div>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>Link to song</Form.Label>
        <Form.Control
          type="text"
          placeholder="https://songs.com/my-song"
          value={musicLink}
          onChange={(evt) => setMusicLink(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional link to the song where it can be played.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Link to lyrics</Form.Label>
        <Form.Control
          type="text"
          placeholder="https://lyrics.com/my-lyrics"
          value={lyricsLink}
          onChange={(evt) => setLyricsLink(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional link to the song lyrics.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Link author</Form.Label>
        <Form.Control
          type="text"
          placeholder="John Doe <john@doe.com>"
          value={author}
          maxLength="64"
          onChange={(evt) => setAuthor(evt.target.value)}
        />
        <Form.Text className="text-muted">
          Optional information about who generated this link. Name, email, etc.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="use-tinyurl">
        <Form.Check
          type="switch"
          id="use-tinyurl-switch"
          label="Shorten link with TinyURL"
          checked={useTinyURL}
          onChange={() => setUseTinyURL(!useTinyURL)}
        />
      </Form.Group>
      <Form.Group>
        <Button type="submit" variant="secondary" disabled={creating}>
          {creating ? 'CREATING...' : 'CREATE LINK'}
        </Button>
      </Form.Group>
    </Form>
  );
}

function CopyButton({ url }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
  };
  const txt = copied ? 'Copied!' : 'Copy';
  return (
    <Button onClick={handle} variant="secondary">
      {txt}
    </Button>
  );
}

function Result({ url }) {
  if (!url) {
    return null;
  }
  return (
    <>
      <Row className="mt-4 mb-3">
        <Col>
          <div className="circled-nbr text-center">3</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card body>
            <h4>The link is ready!</h4>
            Anyone can practice the song using this link:
            <br />
            <span className="created-link">{url}</span>
            <div className="float-right">
              <CopyButton url={url} />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default function Importer() {
  const [url, setUrl] = useState();

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="circled-nbr text-center">1</div>
          First you need <strong>the notes file in UltraStar TXT format</strong>
          . If you can't find the notes file, you can create one by using an
          editor like these:
          <ul className="mt-3">
            <li>Yass - Karaoke Editor</li>
            <li>Performous Composer</li>
            <li>UltraStar Creator</li>
          </ul>
          Note that lyrics will be ignored.
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="circled-nbr text-center">2</div>
        </Col>
      </Row>
      <FileForm onComplete={(value) => setUrl(value)} />
      <Result url={url} />
    </Container>
  );
}
