import * as React from 'react';
import styled from 'styled-components';

import { Bank, Slider } from '../../generic';
import { AdsrNode } from './adsr-node';

interface AdsrControlsProps {
  adsr: AdsrNode;
}

export const AdsrControls: React.FC<AdsrControlsProps> = (props) => {
  const { adsr } = props;

  return (
    <Bank label='ADSR'>
      <Slider
        min={0.0}
        max={1.0}
        step={0.01}
        defaultValue={adsr.attack.value}
        onChange={(v) => {
          adsr.attack.value = v;
        }}
        label='Attack Duration'
      />
      <Slider
        min={0.0}
        max={1.0}
        step={0.01}
        defaultValue={adsr.attackCurve.value}
        onChange={(v) => {
          adsr.attackCurve.value = v;
        }}
        label='Attack Shape'
      />
      <Slider
        min={0.0}
        max={1.0}
        step={0.01}
        defaultValue={adsr.decay.value}
        onChange={(v) => {
          adsr.decay.value = v;
        }}
        label='Decay Duration'
      />
      <Slider
        min={0.0}
        max={1.0}
        step={0.01}
        defaultValue={adsr.sustain.value}
        onChange={(v) => {
          adsr.sustain.value = v;
        }}
        label='Sustain Level'
      />
      <Slider
        min={0.0}
        max={1.0}
        step={0.01}
        defaultValue={adsr.release.value}
        onChange={(v) => {
          adsr.release.value = v;
        }}
        label='Release Duration'
      />
      <StyledTrigger>
        <label>Trigger</label>
        <button
          onMouseDown={() => {
            adsr.trigger.value = 1;
          }}
          onMouseUp={() => {
            adsr.trigger.value = 0;
          }}
        />
      </StyledTrigger>
    </Bank>
  );
};
AdsrControls.displayName = 'AdsrControls';

const StyledTrigger = styled.div`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 2.5em;
  }

  button {
    width: 100px;
    height: 100px;
    margin-top: 10px;
  }
`;
