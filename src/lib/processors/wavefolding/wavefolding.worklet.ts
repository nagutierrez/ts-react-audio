/**
 * Wavefolding Waveshaper
 */
export class WavefoldingProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'gain', defaultValue: 1.0 },
      { name: 'mix', defaultValue: 0.5 },
    ];
  }

  process(inputs: SoundBuffer, outputs: SoundBuffer, parameters: SoundParams) {
    const input = inputs[0];
    const output = outputs[0];
    const { gain, mix } = parameters;

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      for (let i = 0; i < inputChannel.length; i++) {
        const gainValue = gain.length === 1 ? gain[0] : gain[i];
        const mixValue = mix.length === 1 ? mix[0] : mix[i];

        const x = inputChannel[i];

        const f = Math.sin(x) * gainValue;
        const g = Math.sin((f * Math.PI) / 2.0);
        const h =
          4.0 *
          (Math.abs(0.25 * f + 0.25 - Math.round(0.25 * f + 0.25)) - 0.25);

        outputChannel[i] = mixValue * g + (1 - mixValue) * h;
      }
    }

    return true;
  }
}

registerProcessor('wavefolding', WavefoldingProcessor);
