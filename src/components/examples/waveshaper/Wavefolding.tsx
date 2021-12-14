import * as React from 'react';
import styled from 'styled-components';

import { Example, Jukebox } from '../../generic';
import { WavefoldingControls } from '../../controls';
import { WavefoldingNode } from '../../../lib/processors';

export const WavefoldingExample: React.FC = () => {
  const contextRef = React.useRef(new AudioContext());
  const sourceRef = React.useRef<MediaElementAudioSourceNode>();
  const wfRef = React.useRef<WavefoldingNode>();

  const [, setReady] = React.useState(false);

  React.useEffect(() => {
    const c = contextRef.current;

    const setup = async () => {
      c.resume();

      // Register the wavefolding processor
      await WavefoldingNode.Initialize(c);

      // Create our wavefolding node and connect it to the output
      const wf = new WavefoldingNode(c);
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
          // Whenever the audio changes, we need to connect it to our waveshaper
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
      {wfRef.current && <WavefoldingControls wavefolding={wfRef.current} />}
    </StyledWavefoldingExample>
  );
};
WavefoldingExample.displayName = 'WavefoldingExample';

const StyledWavefoldingExample = styled(Example)`
  background-color: #286194;
`;
