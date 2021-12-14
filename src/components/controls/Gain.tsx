import * as React from 'react';

import { Bank, Slider } from '../generic';
import { GainNode } from '../../lib/processors/gain';

interface GainControlsProps {
  gain: GainNode;
}

export const GainControls: React.FC<GainControlsProps> = (props) => {
  const { gain } = props;

  const [userGain, setUserGain] = React.useState(gain.gain.defaultValue);

  return (
    <Bank label='Gain'>
      <Slider
        min={0.0}
        max={1.0}
        step={0.01}
        defaultValue={gain.gain.defaultValue}
        onChange={(v) => {
          gain.gain.value = v;
          setUserGain(v);
        }}
        value={userGain}
        valueLabel={userGain.toPrecision(1)}
      />
    </Bank>
  );
};
GainControls.displayName = 'GainControls';
