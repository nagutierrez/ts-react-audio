declare type SoundBuffer = Float32Array[][];
declare type SoundParams = Record<string, Float32Array>;

declare class AudioWorkletProcessor {
  readonly port: MessagePort;

  constructor(options?: AudioWorkletNodeOptions): AudioWorkletProcessor;

  process(
    inputs: SoundBuffer,
    outputs: SoundBuffer,
    parameters: SoundParams
  ): boolean;
}

declare function registerProcessor(
  name: string,
  processorCtor: (new (
    options?: AudioWorkletNodeOptions
  ) => AudioWorkletProcessor) & {
    parameterDescriptors?: AudioParamDescriptor[];
  }
);
