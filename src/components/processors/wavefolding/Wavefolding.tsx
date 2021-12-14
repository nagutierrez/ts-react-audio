import * as React from 'react';
import styled from 'styled-components';
import { Slider, Bank } from '../../generic';

interface WavefoldingControlsProps {
  context: AudioContext;
  worklet: AudioWorkletNode;
}

export const WavefoldingControls: React.FC<WavefoldingControlsProps> = (
  props,
) => {
  const { context, worklet } = props;

  const gain = worklet.parameters.get('gain');
  const mix = worklet.parameters.get('mix');

  const [userGain, setUserGain] = React.useState(gain?.defaultValue || 0.0);
  const [userMix, setUserMix] = React.useState(mix?.defaultValue || 0.0);

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
          if (gain) {
            gain.setValueAtTime(v, context.currentTime);
            setUserGain(v);
          }
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
          if (mix) {
            mix.setValueAtTime(v, context.currentTime);
            setUserMix(v);
          }
        }}
      />
    </Bank>
  );
};

const StyledWavefoldingControls = styled.div``;
