/**
 * A simple volume processor that let's the user
 * adjust the gain of the incoming signal
 */
export class GainProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [{ name: 'gain', defaultValue: 0.1 }];
  }

  process(inputs: SoundBuffer, outputs: SoundBuffer, parameters: SoundParams) {
    const input = inputs[0];
    const output = outputs[0];
    const { gain } = parameters;

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      if (gain.length === 1) {
        for (let i = 0; i < inputChannel.length; i++) {
          outputChannel[i] = inputChannel[i] * gain[0];
        }
      } else {
        for (let i = 0; i < inputChannel.length; i++) {
          outputChannel[i] = inputChannel[i] * gain[i];
        }
      }
    }

    return true;
  }
}

registerProcessor('gain', GainProcessor);
