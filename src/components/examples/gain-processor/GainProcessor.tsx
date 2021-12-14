import * as React from 'react';
import styled from 'styled-components';

import { GainControls } from '../../processors';
import GainProcessor from '../../processors/gain/gain.worklet.ts';
import { Example, Jukebox } from '../../generic';

/**
 * A basic example of a function audio worklet
 * with a React-based interface
 */
export const GainProcessorExample: React.FC = () => {
  const contextRef = React.useRef(new AudioContext());
  const sourceRef = React.useRef<MediaElementAudioSourceNode>();
  const gainRef = React.useRef<AudioWorkletNode>();

  const [, setReady] = React.useState(false);

  React.useEffect(() => {
    const c = contextRef.current;

    const setup = async () => {
      await c.audioWorklet.addModule(GainProcessor);

      const gain = new AudioWorkletNode(c, 'gain');
      gain.connect(c.destination);

      gainRef.current = gain;

      setReady(true);
    };

    setup();
  }, []);

  return (
    <StyledGainProcessorExample
      title='Gain Processor'
      descriptor='Implementation of gain as an AudioWorklet, with React front end.'
    >
      <Jukebox
        onAudioChange={(elem) => {
          const context = contextRef.current;
          let source = sourceRef.current;
          let destination = gainRef.current;

          if (!destination) {
            return;
          }

          if (source) {
            source.disconnect();
          }
          sourceRef.current = context.createMediaElementSource(elem);
          sourceRef.current.connect(destination);
        }}
      />
      {gainRef.current && (
        <GainControls context={contextRef.current} worklet={gainRef.current} />
      )}
    </StyledGainProcessorExample>
  );
};
GainProcessorExample.displayName = 'GainProcessorExample';

const StyledGainProcessorExample = styled(Example)`
  background-color: #95a7e6;
`;
