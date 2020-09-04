import * as React from 'react';
import styled from 'styled-components';
import { Jukebox } from '../../generic';
import WavefoldingProcessor from '../../processors/wavefolding/wavefolding.worklet.ts';
import { WavefoldingControls } from '../../processors';

/**
 */
export const WavefoldingExample: React.FC = () => {
  const contextRef = React.useRef(new AudioContext());
  const sourceRef = React.useRef<MediaElementAudioSourceNode>();
  const wfRef = React.useRef<AudioWorkletNode>();

  const [, setReady] = React.useState(false);

  React.useEffect(() => {
    const c = contextRef.current;

    const setup = async () => {
      await c.audioWorklet.addModule(WavefoldingProcessor);

      const wf = new AudioWorkletNode(c, 'wavefolding');
      wf.connect(c.destination);

      wfRef.current = wf;

      setReady(true);
    };

    setup();
  }, []);

  return (
    <StyledWavefoldingExample>
      <StyledMessage>
        <h1>Wavefolding Processor</h1>
        <p>Simple wavefolding; output = sin(gain * input)</p>
      </StyledMessage>
      <StyledModules>
        <Jukebox
          onAudioChange={(elem) => {
            const context = contextRef.current;
            let source = sourceRef.current;
            let destination = wfRef.current;

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
        {wfRef.current && (
          <WavefoldingControls
            context={contextRef.current}
            worklet={wfRef.current}
          />
        )}
      </StyledModules>
    </StyledWavefoldingExample>
  );
};
WavefoldingExample.displayName = 'WavefoldingExample';

const StyledWavefoldingExample = styled.div`
  background-color: #286194;
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
