import * as React from 'react';

import { Slider, Bank } from '../generic';
import { WavefoldingNode } from '../../lib/processors/wavefolding';

interface WavefoldingControlsProps {
  wavefolding: WavefoldingNode;
}

export const WavefoldingControls: React.FC<WavefoldingControlsProps> = (
  props,
) => {
  const { wavefolding } = props;

  const [userGain, setUserGain] = React.useState(
    wavefolding.gain.defaultValue || 0.0,
  );
  const [userMix, setUserMix] = React.useState(
    wavefolding.mix.defaultValue || 0.0,
  );

  return (
    <Bank label='Wavefolding'>
      <Slider
        min={0.5}
        max={20.0}
        step={0.01}
        value={userGain}
        label='Gain'
        valueLabel={userGain.toPrecision(2)}
        onChange={(v) => {
          wavefolding.gain.value = v;
          setUserGain(v);
        }}
      />
      <Slider
        min={0}
        max={1.0}
        step={0.01}
        value={userMix}
        label='Mix'
        valueLabel={userMix.toPrecision(2)}
        onChange={(v) => {
          wavefolding.mix.value = v;
          setUserMix(v);
        }}
      />
    </Bank>
  );
};
WavefoldingControls.displayName = 'WavefoldingControls';
