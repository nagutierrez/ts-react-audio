import * as React from 'react';
import styled from 'styled-components';

interface Props {
  visible: boolean;
  onClick: () => void;
}

export const Splash: React.FC<Props> = (props: Props) => {
  return (
    <StyledSplash {...props}>
      <h1>Sound</h1>
      <h2>Heartfelt.Engineering</h2>
      <span>Click or Tap to Begin</span>
    </StyledSplash>
  );
};
Splash.displayName = 'Splash';

const StyledSplash = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  transition: opacity 1000ms;
  opacity: ${(p) => (p.visible ? 1.0 : 0.0)};
  pointer-events: ${(p) => (p.visible ? 'auto' : 'none')};

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: white;
  font-size: 1em;

  background: linear-gradient(0deg, #002a40, #34b2d4);
  background-size: 400% 400%;

  animation: gradient 20s ease infinite;

  > * {
    text-align: center;
    margin-top: 0;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 82%;
    }
    50% {
      background-position: 100% 19%;
    }
    100% {
      background-position: 0% 82%;
    }
  }
`;
