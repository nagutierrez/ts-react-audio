import * as React from 'react';
import styled from 'styled-components';

interface ColorScheme {
  track: string;
  thumb: string;
  progress: string;
  text?: string;
}

const defaultColors: ColorScheme = {
  track: '#97c8fc',
  thumb: '#ffffff',
  progress: '#91d9f2',
  text: '#444',
};

interface SliderProps {
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  valueLabel?: string;
  colors?: ColorScheme;
  defaultValue?: number;
  value?: number;
}

export const Slider: React.FC<SliderProps> = (props) => {
  return (
    <StyledSlider colors={props.colors || defaultColors}>
      {props.label && <label>{props.label}</label>}
      <input
        type='range'
        // @ts-ignore
        orient='vertical'
        onChange={(e) => {
          props.onChange(e.target.valueAsNumber);
        }}
        defaultValue={props.defaultValue}
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
      />
      <label>{props.valueLabel || props.value}</label>
    </StyledSlider>
  );
};

const StyledSlider = styled.div<{ colors: ColorScheme }>`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;

  input[type='range'][orient='vertical'] {
    writing-mode: bt-lr; /* IE */
    -webkit-appearance: slider-vertical; /* WebKit */
    width: 50px;
    height: 180px;
    border-radius: 8px;
    margin: 8px;
    outline: none;
    border: 1px solid #eeeeee;
  }

  input::-moz-range-progress {
    width: 50px;

    background-color: ${(p) => p.colors.progress};
    border-radius: 8px;
  }

  input::-moz-range-track {
    width: 50px;
    cursor: pointer;
    animate: 0.2s;
    background: ${(p) => p.colors.track};
    border-radius: 8px;
  }

  input::-moz-range-thumb {
    height: 23px;
    width: 54px;
    border-radius: 4px;
    background: ${(p) => p.colors.thumb};
    border: 1px solid #eeeeee;
    cursor: pointer;
  }

  label {
    display: flex;
    align-items: center;
    color: ${(p) => p.colors.text || 'black'};
    max-width: 100px;
    height: 2.5em;
  }
`;
