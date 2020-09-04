import * as React from 'react';

/**
 * A basic example of a function audio worklet
 * with a React-based interface
 */
export const GainProcessorExample: React.FC = () => {
  const contextRef = React.useRef(new AudioContext());

  React.useEffect(() => {
    const c = contextRef.current;

    const setup = async () => {
      await c.audioWorklet.addModule('./gain-processor.ts');

      const osc = new OscillatorNode(c);
      const gain = new AudioWorkletNode(c, 'gain');

      osc.connect(gain).connect(c.destination);
      osc.start();
    };

    setup();
  }, []);

  return <p>Hello from gain processor</p>;
};
GainProcessorExample.displayName = 'GainProcessorExample';
