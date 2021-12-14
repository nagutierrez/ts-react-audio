import AdsrProcessor from './adsr.worklet.ts';

/**
 * Our own node that packages up and instantiates the AdsrProcessor and exposes
 * the params as member variables for easy manipulation.
 */
export class AdsrNode extends AudioWorkletNode {
  constructor(context: AudioContext) {
    super(context, 'adsr', {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      channelCount: 1,
    });
  }

  /** The rate of attack */
  attack = this.parameters.get('attack') as AudioParam;
  /** The shape of the attack, where 0 is linear and 1 is exponential */
  attackCurve = this.parameters.get('attackCurve') as AudioParam;
  /** The rate of decay */
  decay = this.parameters.get('decay') as AudioParam;
  /** The level of sustain, [0, 1] */
  sustain = this.parameters.get('sustain') as AudioParam;
  /** The rate of release */
  release = this.parameters.get('release') as AudioParam;
  /** The trigger value, where 1 is note on and 0 is note off */
  trigger = this.parameters.get('trigger') as AudioParam;

  /**
   * This loads the AdsrProcessor into our audio context to make it available
   * for use.
   */
  static Initialize(context: AudioContext): Promise<void> {
    return context.audioWorklet.addModule(AdsrProcessor);
  }
}
