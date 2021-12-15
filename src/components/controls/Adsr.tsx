import * as React from 'react';
import styled from 'styled-components';

import { Bank, Slider } from '../generic';
import { AdsrNode } from '../../lib/processors/adsr';

interface AdsrControlsProps {
  adsr: AdsrNode;
}

export const AdsrControls: React.FC<AdsrControlsProps> = (props) => {
  const { adsr } = props;

  const [triggered, setTriggered] = React.useState(false);

  const trigger = () => {
    adsr.trigger.value = 1.0;
    setTriggered(true);
  };

  const release = () => {
    adsr.trigger.value = 0.0;
    setTriggered(false);
  };

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
          onMouseDown={trigger}
          onMouseUp={release}
          onMouseOut={release}
        />
        <StyledIndicator on={triggered} />
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
    margin: 10px 0;
  }
`;

const StyledIndicator = styled.div<{ on: boolean }>`
  border-radius: 12px;
  height: 12px;
  width: 12px;
  border: 1px solid grey;

  transition: all 250ms;
  background-color: ${(p) => (p.on ? 'red' : 'transparent')};
  box-shadow: 0px 0px ${(p) => (p.on ? 8 : 0)}px 0px
    ${(p) => (p.on ? 'rgba(255,0,0,0.68)' : 'rgba(0,0,0,0.0)')};
`;
