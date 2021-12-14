/**
 * Following https://github.com/g200kg/audioworklet-adsrnode/blob/master/audioworklet-adsrnode.js as a reference
 */
export class AdsrProcessor extends AudioWorkletProcessor {
  private lastTrigger = 0;
  private trigger = 0;
  private phase = 0;
  private value = 0;

  static get parameterDescriptors(): AudioParamDescriptor[] {
    return [
      {
        name: 'attack',
        defaultValue: 0.1,
        minValue: 0,
        maxValue: 60,
        automationRate: 'k-rate',
      },
      {
        name: 'attackCurve',
        defaultValue: 0.5,
        minValue: 0,
        maxValue: 1,
        automationRate: 'k-rate',
      },
      {
        name: 'decay',
        defaultValue: 0.1,
        minValue: 0,
        maxValue: 60,
        automationRate: 'k-rate',
      },
      {
        name: 'sustain',
        defaultValue: 1,
        minValue: 0,
        maxValue: 1,
        automationRate: 'k-rate',
      },
      {
        name: 'release',
        defaultValue: 0.1,
        minValue: 0,
        maxValue: 60,
        automationRate: 'k-rate',
      },
      {
        name: 'trigger',
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
        automationRate: 'a-rate',
      },
    ];
  }

  process(_: SoundBuffer, outputs: SoundBuffer, parameters: SoundParams) {
    let output = outputs[0];

    const { trigger } = parameters;
    const attack = parameters.attack[0];
    const attackCurve = parameters.attackCurve[0];
    const decay = parameters.decay[0];
    const sustain = parameters.sustain[0];
    const release = parameters.release[0];

    const attackMax = 1.01 / Math.max(0.01, attackCurve);
    const attackRatio =
      1 - Math.pow(1 - 1 / attackMax, 1 / (sampleRate * attack));

    const decayRatio = 1 - Math.pow(Math.E, -1 / (sampleRate * decay));
    const releaseRatio = 1 - Math.pow(Math.E, -1 / (sampleRate * release));

    // Initialize our trigger value
    if (trigger.length === 1) {
      this.trigger = trigger[0];
    }

    for (let i = 0; i < output[0].length; i++) {
      // If there are multiple values in this render quantum, we want to get it
      // on each iteration of the loop
      if (trigger.length > 1) {
        this.trigger = trigger[i];
      }

      if (this.trigger >= 0.5) {
        if (this.lastTrigger < 0.5) {
          this.phase = 1;
        }
      } else {
        this.phase = 0;
      }

      if (this.phase === 1) {
        // We are in the attack phase, so increase our output value
        this.value += (attackMax - this.value) * attackRatio;

        // But exit phase 1 and clamp if we reach or exceed 1.0
        if (this.value >= 1.0) {
          this.value = 1.0;
          this.phase = 0;
        }
      } else if (this.value > sustain) {
        // We are not in the attack phase, but the value is greater than sustain
        // so we must be in decay
        this.value += (sustain - this.value) * decayRatio;
      }

      // No trigger, we're in release phase
      if (this.trigger < 0.5) {
        this.value += -this.value * releaseRatio;
      }

      output[0][i] = this.value;
    }

    this.lastTrigger = this.trigger;
    return true;
  }
}

registerProcessor('adsr', AdsrProcessor);
