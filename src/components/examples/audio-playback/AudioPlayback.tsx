import * as React from 'react';
import styled from 'styled-components';
import { Jukebox } from '../../generic';

/**
 */
export const AudioPlaybackExample: React.FC = () => {
  const contextRef = React.useRef(new AudioContext());
  const sourceRef = React.useRef<MediaElementAudioSourceNode>();

  return (
    <StyledAudioPlaybackExample>
      <h1>Audio Playback Example</h1>
      <p>Allows the user to select a file for playback</p>
      <Jukebox
        onAudioChange={(elem) => {
          const context = contextRef.current;
          let source = sourceRef.current;
          if (source) {
            source.disconnect();
          }
          sourceRef.current = context.createMediaElementSource(elem);
          sourceRef.current.connect(context.destination);
        }}
      />
    </StyledAudioPlaybackExample>
  );
};
AudioPlaybackExample.displayName = 'AudioPlaybackExample';

const StyledAudioPlaybackExample = styled.div`
  background-color: #286194;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;

  * {
    max-width: 300px;
  }

  h1 {
    margin: 0;
  }

  label {
    font-weight: bold;
  }
`;
