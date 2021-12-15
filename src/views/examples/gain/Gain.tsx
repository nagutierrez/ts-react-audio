import * as React from 'react';
import styled from 'styled-components';

import { Example, Jukebox } from '../../../components/generic';
import { GainControls } from '../../../components/controls';
import { GainNode } from '../../../lib/processors';

/**
 * A basic example of a function audio worklet
 * with a React-based interface
 */
export const GainProcessorExample: React.FC = () => {
  const contextRef = React.useRef(new AudioContext());
  const sourceRef = React.useRef<MediaElementAudioSourceNode>();
  const gainRef = React.useRef<GainNode>();

  const [isReady, setReady] = React.useState(false);

  React.useEffect(() => {
    const c = contextRef.current;

    const setup = async () => {
      await GainNode.Initialize(c);

      const gain = new GainNode(c);
      gain.connect(c.destination);

      gainRef.current = gain;

      setReady(true);
    };

    setup();
  }, []);

  const gain = gainRef.current;

  const onAudioChange = (elem: HTMLAudioElement) => {
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
  };

  return (
    <StyledGainProcessorExample
      title='Gain Processor'
      descriptor='Implementation of gain as an AudioWorklet, with React front end.'
    >
      {!isReady || !gain ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <Jukebox onAudioChange={onAudioChange} />
          <GainControls gain={gain} />
        </>
      )}
    </StyledGainProcessorExample>
  );
};
GainProcessorExample.displayName = 'GainProcessorExample';

const StyledGainProcessorExample = styled(Example)`
  background-color: #95a7e6;
`;
