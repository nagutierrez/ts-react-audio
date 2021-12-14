import * as React from 'react';
import styled from 'styled-components';
import { Example, Jukebox } from '../../generic';
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
    <StyledWavefoldingExample
      title='Wavefolding Processor'
      descriptor='Simple wavefolding; output = sin(gain * input)'
    >
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
    </StyledWavefoldingExample>
  );
};
WavefoldingExample.displayName = 'WavefoldingExample';

const StyledWavefoldingExample = styled(Example)`
  background-color: #286194;
`;
