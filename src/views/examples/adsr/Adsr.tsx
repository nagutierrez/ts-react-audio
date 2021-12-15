import * as React from 'react';
import styled from 'styled-components';

import { Example } from '../../../components/generic';
import { AdsrControls } from '../../../components/controls';
import { AdsrNode } from '../../../lib/processors/adsr';

/**
 * An example of using an AudioNode as a control for another node's parameter;
 * In this case, the output of the ADSR envelope generator is used to control
 * the gain amount on a gain node.
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

  return (
    <StyledAdsrExample
      title='ADSR Example'
      descriptor='An exponential envelope generator'
    >
      {!adsr || !isReady ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <AdsrControls adsr={adsr} />
        </>
      )}
    </StyledAdsrExample>
  );
};
AdsrExample.displayName = 'AdsrExample';

const StyledAdsrExample = styled(Example)`
  background-color: #830f49;
`;
