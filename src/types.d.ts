declare type SoundBuffer = Float32Array[][];
declare type SoundParams = Record<string, Float32Array>;

declare class AudioWorkletProcessor {
  readonly port: MessagePort;

  constructor(options?: AudioWorkletNodeOptions);

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
