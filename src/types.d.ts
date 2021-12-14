declare type SoundBuffer = Float32Array[][];
declare type SoundParams = Record<string, Float32Array>;

/** Takes the current audio parameter value for each sample frame of the audio signal */
declare type ARate = 'a-rate';
/** Uses the same initial audio parameter value for the whole block processed (128 sample frames) */
declare type KRate = 'k-rate';

declare interface AudioParamDescriptor {
  /** The `DOMString` representing the name of and used to access this AudioParam */
  name: string;
  /** Defines how the parameter value is applied to the samples. Defaults to `a-rate`. */
  automationRate?: ARate | KRate;
  /** The minimum possible value for the parameter's nominal (effective) range. Defaults to `-3.4028235e38` */
  minValue?: number;
  /** The maximum possible value for the parameter's nominal (effective) range. Defaults to `3.4028235e38` */
  maxValue?: number;
  /** The initial value of the parameter. Defaults to `0`. */
  defaultValue?: number;
}

/**
 * Returns an integer that represents the ever-increasing current sample-frame
 * of the audio block being processed. It is incremented by 128 (the size of a
 * render quantum) after the processing of each audio block.
 */
const currentFrame: number;
/**
 * Returns a double that represents the ever-increasing context time of the
 * audio block being processed. It is equal to the currentTime property of the
 * BaseAudioContext the worklet belongs to.
 */
const currentTime: number;
/**
 * Returns a float that represents the sample rate of the associated BaseAudioContext.
 */
const sampleRate: number;

declare class AudioWorkletProcessor extends AudioWorkletGlobalScope {
  readonly port: MessagePort;

  constructor(options?: AudioWorkletNodeOptions);

  // https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor/parameterDescriptors
  static get parameterDescriptors(): AudioParamDescriptor[];

  process(
    inputs: SoundBuffer,
    outputs: SoundBuffer,
    parameters: SoundParams,
  ): boolean;
}

declare function registerProcessor(
  name: string,
  processorCtor: (new (
    options?: AudioWorkletNodeOptions,
  ) => AudioWorkletProcessor) & {
    parameterDescriptors?: AudioParamDescriptor[];
  },
): void;

declare module '*.worklet.ts' {
  const exportString: string;
  export default exportString;
}
