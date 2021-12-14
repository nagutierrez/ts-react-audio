import GainProcessor from './gain.worklet.ts';

export class GainNode extends AudioWorkletNode {
  constructor(context: AudioContext, options?: AudioWorkletNodeOptions) {
    super(context, 'gain', options);
  }

  gain = this.parameters.get('gain') as AudioParam;

  static Initialize(context: AudioContext): Promise<void> {
    return context.audioWorklet.addModule(GainProcessor);
  }
}
