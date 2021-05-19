import React, { useState } from 'react';
import {
  PauseCircleFill,
  SkipBackwardCircleFill,
  SkipEndCircleFill,
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
  <ControlButton Icon={SkipBackwardCircleFill} {...props} />
);

export const PauseButton = (props) => (
  <ControlButton Icon={PauseCircleFill} {...props} />
);

export const StopButton = (props) => (
  <ControlButton Icon={StopCircleFill} {...props} />
);

export const SkipStartButton = (props) => (
  <ControlButton
    Icon={props.inIntro ? SkipEndCircleFill : SkipStartCircleFill}
    {...props}
  />
);
