import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navbar, Popover, OverlayTrigger } from 'react-bootstrap';

import { PitchDisplay } from 'pitch-display';

import {
  ForwardButton,
  PauseButton,
  SkipStartButton,
  StopButton,
} from '../button';
import { BACKGROUND } from '../../constants/colors';
import { useStoreActions, useStoreState } from '../../model';

// Custom React hook for requestAnimationFrame
const useAnimationFrame = (callback) => {
  const requestRef = useRef();

  useEffect(() => {
    const animate = (time) => {
      callback(time);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run this effect only once
};

export interface PitchProps {
  freq: number | null;
  clarity: number | null;
}

function PitchComponent({ freq, clarity }: PitchProps) {
  const pitchDisplay = useRef();
  const [inIntro, setInIntro] = useState(false);

  const updatePitch = useCallback(() => {
    if (!pitchDisplay.current) {
      return;
    }

    if (freq && freq > 0) {
      const time = new Date().getTime();
      pitchDisplay.current.pushFrequency({
        frequency: freq,
        clarity: clarity || 0,
        time,
      });
    }
    pitchDisplay.current.render(false);
  }, [clarity, freq]);

  if (freq && freq > 0) {
    requestAnimationFrame((time) => updatePitch(time));
  }

  // Keep rendering and scrolling pitchDisplay at regular time intervals
  // even though the note has not changed
  useAnimationFrame(updatePitch);

  useEffect(() => {
    const onResize = () => {
      if (pitchDisplay.current) {
        pitchDisplay.current.resize();
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const notes = useStoreState((state) => state.melody.notes);
  useEffect(() => {
    if (pitchDisplay.current && notes && notes.notes) {
      pitchDisplay.current.setMelodyNotes(notes.notes);
    }
  }, [notes]);

  const { stopStream, setEnabled } = useStoreActions((actions) => actions);

  const btnSize = 50;
  const btnColor = BACKGROUND;
  const btnColorPressed = '#a6a8aa';

  const onDisplayRef = useCallback(
    (element) => {
      if (element && !pitchDisplay.current) {
        pitchDisplay.current = new PitchDisplay(element, 6000);
        pitchDisplay.current.setBackgroundColor(BACKGROUND);
        if (notes) {
          pitchDisplay.current.setMelodyNotes(notes);
        }
        pitchDisplay.current.playSong();
      }
    },
    [notes]
  );

  useEffect(() => {
    if (pitchDisplay.current) {
      return pitchDisplay.current.subscribeToIntroState((val) =>
        setInIntro(val)
      );
    }
  }, []);

  const onStop = async () => {
    setEnabled(false);
    await stopStream();
    console.log('Stream Stopped');
  };

  const skipIntroTitle = 'Skip intro';
  const skipIntroBody = 'Press and hold until you start singing.';
  const skipIntroPopover = (
    <Popover id="popover-skip-intro">
      <Popover.Title as="h3">{skipIntroTitle}</Popover.Title>
      <Popover.Content>{skipIntroBody}</Popover.Content>
    </Popover>
  );

  return (
    <React.Fragment>
      <div className="full" ref={onDisplayRef} />
      <div className="navbar-space" />
      <Navbar fixed="bottom" bg="dark" className="justify-content-center">
        <OverlayTrigger
          show={inIntro}
          placement="top"
          overlay={skipIntroPopover}
        >
          <SkipStartButton
            onPress={() => pitchDisplay.current.seekToFirstNote()}
            onRelease={() => pitchDisplay.current.playSong()}
            onCancel={() => pitchDisplay.current.playSong()}
            className="btn-skip-start"
            size={btnSize}
            color={btnColor}
            colorPressed={btnColorPressed}
            inIntro={inIntro}
          />
        </OverlayTrigger>
        <PauseButton
          onPress={() => pitchDisplay.current.pauseSong()}
          onRelease={() => pitchDisplay.current.playSong()}
          onCancel={() => pitchDisplay.current.playSong()}
          className="btn-pause"
          size={btnSize}
          color={btnColor}
          colorPressed={btnColorPressed}
        />
        <StopButton
          onRelease={onStop}
          className="btn-stop"
          size={btnSize}
          color={btnColor}
          colorPressed={btnColorPressed}
        />
        <ForwardButton
          onPress={() => pitchDisplay.current.fastForwardSong()}
          onRelease={() => pitchDisplay.current.playSong()}
          className="btn-forward"
          size={btnSize}
          color={btnColor}
          colorPressed={btnColorPressed}
        />
      </Navbar>
    </React.Fragment>
  );
}

export default PitchComponent;
