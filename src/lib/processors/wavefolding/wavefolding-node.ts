import WavefoldingProcessor from './wavefolding.worklet.ts';

export class WavefoldingNode extends AudioWorkletNode {
  constructor(context: AudioContext, options?: AudioWorkletNodeOptions) {
    super(context, 'wavefolding', options);
  }

  gain = this.parameters.get('gain') as AudioParam;
  mix = this.parameters.get('mix') as AudioParam;

  static Initialize(context: AudioContext): Promise<void> {
    return context.audioWorklet.addModule(WavefoldingProcessor);
  }
}
