import * as React from 'react';
import styled from 'styled-components';
import { Bank, Slider } from '../../generic';

interface GainControlsProps {
  context: AudioContext;
  worklet: AudioWorkletNode;
}

export const GainControls: React.FC<GainControlsProps> = (props) => {
  const { context, worklet } = props;

  const gain = worklet.parameters.get('gain');

  const [userGain, setUserGain] = React.useState(gain?.defaultValue || 0.0);

  return (
    <Bank label="Gain">
      <Slider
        min={0.0}
        max={1.0}
        step={0.01}
        defaultValue={gain?.defaultValue}
        onChange={(v) => {
          if (gain) {
            gain.setValueAtTime(v, context.currentTime);
            setUserGain(v);
          }
        }}
        value={userGain}
        label={userGain.toPrecision(1)}
      />
    </Bank>
  );
};

const StyledGainControls = styled.div`
  border-radius: 10px;
  background-color: white;
  padding: 20px;
`;
