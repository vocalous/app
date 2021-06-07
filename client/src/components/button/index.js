import React, { useState } from 'react';
import {
  PauseCircleFill,
  SkipEndCircleFill,
  SkipForwardCircleFill,
  SkipStartCircleFill,
  StopCircleFill,
} from 'react-bootstrap-icons';

import './button.css';

function ControlButton({
  color,
  colorPressed,
  className,
  Icon,
  onCancel,
  onPress,
  onRelease,
  size,
}) {
  const [pressed, setPressed] = useState(false);
  const handlePress = () => {
    setPressed(true);
    if (onPress) {
      onPress();
    }
  };
  const handleRelease = () => {
    setPressed(false);
    if (onRelease) {
      onRelease();
    }
  };
  const handleCancel = () => {
    setPressed(false);
    if (onCancel) {
      onCancel();
    }
  };
  return (
    <div
      className={`ctrl-btn ${pressed ? 'ctrl-btn-pressed' : ''} ${className}`}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleCancel}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
      onTouchCancel={handleCancel}
    >
      <Icon color={pressed ? colorPressed : color} size={size} />
    </div>
  );
}

export const ForwardButton = (props) => (
  <ControlButton Icon={SkipForwardCircleFill} {...props} />
);

export const PauseButton = (props) => (
  <ControlButton Icon={PauseCircleFill} {...props} />
);

export const StopButton = (props) => (
  <ControlButton Icon={StopCircleFill} {...props} />
);

export const SkipStartButton = (props) => {
  // Change icon until user releases the button in skip intro mode.
  // This prevents a bug on iOS where long pressing the button
  // never receives onTouchCancel event when the icon changes meanwhile.
  const [skipIntroMode, setSkipIntroMode] = useState(false);
  const onPress = () => {
    if (props.inIntro) {
      setSkipIntroMode(true);
    }
    props.onPress();
  };
  const onCancel = () => {
    if (skipIntroMode) {
      setSkipIntroMode(false);
    }
    props.onCancel();
  };
  const onRelease = () => {
    if (skipIntroMode) {
      setSkipIntroMode(false);
    }
    props.onRelease();
  };
  const icon =
    props.inIntro || skipIntroMode ? SkipEndCircleFill : SkipStartCircleFill;
  return (
    <ControlButton
      Icon={icon}
      {...props}
      onPress={onPress}
      onRelease={onRelease}
      onCancel={onCancel}
    />
  );
};
