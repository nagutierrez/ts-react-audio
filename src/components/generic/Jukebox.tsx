import * as React from 'react';
import styled from 'styled-components';
import { Bank } from './Bank';

interface JukeboxProps {
  onAudioChange?: (elem: HTMLAudioElement) => void;
}

/**
 * Provides the means for a user to upload an file
 * for playback into our DSP code
 */
export const Jukebox: React.FC<JukeboxProps> = (props) => {
  const { onAudioChange } = props;
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  return (
    <StyledJukebox label='Audio'>
      <input
        type='file'
        accept='audio/*'
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          const audio = audioRef.current;
          if (!file || !audio) {
            return;
          }
          const url = URL.createObjectURL(file);
          audio.src = url;
          audio.play();
          onAudioChange && onAudioChange(audio);
        }}
      />
      <audio ref={audioRef} loop={true} controls={true} />
    </StyledJukebox>
  );
};

const StyledJukebox = styled(Bank)`
  flex-direction: column;

  > * {
    margin: 4px 0;
  }
`;
