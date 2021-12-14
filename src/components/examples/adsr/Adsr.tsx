import * as React from 'react';
import styled from 'styled-components';
import { Example } from '../../generic';

import { AdsrControls, AdsrNode } from '../../processors/adsr';

/**
 */
export const AdsrExample: React.FC = () => {
  const contextRef = React.useRef(new AudioContext());
  const adsrRef = React.useRef<AdsrNode>();

  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const c = contextRef.current;

    /**
     * In this setup we'll register our ADSR processor and then wire up the
     * nodes.
     *
     * The signal flow will be Oscillator -> Gain -> Output where the gain level
     * of 0 to 1 modulated by the generated ADSR envelope.
     *
     *            | ADSR |
     *               |
     * | Osc | -> | Gain | -> | Speakers |
     *
     */
    const setup = async () => {
      c.resume();

      // Register the adsr processor
      await AdsrNode.Initialize(c);

      // Now instantiate our nodes
      const adsr = new AdsrNode(c);
      const osc = new OscillatorNode(c);
      const gain = new GainNode(c);

      // Connect the output of the oscillator node to the gain node, and then
      // the output of the gain node to the speakers
      osc.connect(gain).connect(c.destination);

      // Note here is where we connect the output of the adsr envelope generator
      // to the gain parameter of the gain node.
      gain.gain.value = 0;
      adsr.connect(gain.gain);
      osc.frequency.value = 220;
      osc.start();

      // Add the adsr to the reference so we can control it
      adsrRef.current = adsr;

      setIsReady(true);
    };

    setup();
  }, []);

  const adsr = adsrRef.current;

  if (!adsr || !isReady) {
    return <b>Loading…</b>;
  }

  return (
    <StyledAdsrExample
      title='ADSR Example'
      descriptor='An exponential envelope generator'
    >
      <AdsrControls adsr={adsr} />
    </StyledAdsrExample>
  );
};
AdsrExample.displayName = 'AdsrExample';

const StyledAdsrExample = styled(Example)`
  background-color: #830f49;
`;
