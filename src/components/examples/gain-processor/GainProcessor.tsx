import * as React from 'react';
import styled from 'styled-components';
import { GainControls } from '../../processors';

import GainProcessor from '../../processors/gain/gain.worklet.ts';
import { Jukebox } from '../../generic';

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
    <StyledGainProcessorExample>
      <StyledMessage>
        <h1>Gain Processor</h1>
        <p>Implementation of gain as an AudioWorklet, with React front end.</p>
      </StyledMessage>
      <StyledModules>
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
          <GainControls
            context={contextRef.current}
            worklet={gainRef.current}
          />
        )}
      </StyledModules>
    </StyledGainProcessorExample>
  );
};
GainProcessorExample.displayName = 'GainProcessorExample';

const StyledGainProcessorExample = styled.div`
  background-color: #95a7e6;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledMessage = styled.div`
  max-width: 300px;
  color: white;

  h1 {
    margin: 0;
  }
`;

const StyledModules = styled.div`
  display: flex;
  align-items: center;
`;
