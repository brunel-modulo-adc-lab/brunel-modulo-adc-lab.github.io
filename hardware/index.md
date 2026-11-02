---
title: Hardware
toc: true
nav:
  order: 3
  tooltip: FPGA modulo ADC prototype
---

# Hardware

An FPGA-calibrated modulo ADC prototype with up to four channels, which extends the input range by **a factor of more than 100**.

<div class="summary">
  <b>Problem</b>
  <span>Analog folding loops become unstable at large folding-depth ratios, since the threshold error accumulates with every fold and the circuit enters limit cycles. Earlier prototypes were therefore limited to small folding-depth ratios.</span>
  <b>Approach</b>
  <span>A comparator-triggered folding loop is controlled by a finite-state machine on a Zynq-7000 FPGA at 200 MHz. A 14-bit DAC sets the threshold between 100 and 500 mV with a deviation within ±0.2%, and a calibration converts the error that accumulates with the folding depth into a constant offset.</span>
  <b>Result</b>
  <span>Stable folding beyond ρ = 100. With a 3-bit ADC, the SINAD is <b>37.5 dB higher</b> and the effective number of bits (ENOB) <b>6.2 bits higher</b> than those of a conventional ADC with the same resolution, close to the theoretical value of log₂108 ≈ 6.75 bits. The control logic consumes less than 10 mW.</span>
</div>

{% include figure.html image="images/figs/ch08_HardwareBlock1.png" caption="Modulo ADC prototype board based on a Zynq-7000 FPGA." %}

{% include section.html %}

## Demonstrations

{% capture col1 %}
{% include video.html video="images/videos/demo-reconstruction.mp4" poster="images/videos/demo-reconstruction.jpg" caption="Real-time acquisition and reconstruction." %}
{% endcapture %}

{% capture col2 %}
{% include video.html video="images/videos/demo-folding.mp4" poster="images/videos/demo-folding.jpg" caption="Signal folding observed on an oscilloscope." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include section.html %}

## Architecture

{% include figure.html image="images/figs/ch08_SystemDiagram3.png" caption="System block diagram." width="80%" %}

{% include section.html %}

## Calibration

Comparator and DAC errors cause the threshold to deviate from its designed value, and the spread of this deviation more than doubles as ρ increases from 1.6 to 2.9.
A controlled under-compensation subtracts a known step at every fold, so the residual error remains constant as the folding-depth ratio increases.

{% include figure.html image="images/figs/ch08_cali22.png" caption="Before calibration." %}
{% include figure.html image="images/figs/ch08_cali11.png" caption="After calibration." %}

{% include section.html %}

## Results

- **Input range.** A 10.8 V signal is acquired with a 0.1 V threshold (ρ = 108) and recovered with a SINAD of 57.1 dB using a 3-bit ADC.
- **Noise floor.** The in-band noise is approximately 20 dB lower than that of a conventional ADC at ρ = 92.
- **Bandwidth.** Signals up to 400 kHz are recovered at smaller folding-depth ratios, with a reconstruction SNR of 22–33 dB.
- **Modulated signals.** QAM, BPSK, and FSK waveforms are folded and recovered on hardware.
- **Learning-based recovery.** CoFMo recovers measured 64-sample records at OF 2.77–5.53 with 4-bit quantization and an NMSE of −19.45 to −29.64 dB (see [Algorithms](../algorithms/#learning-based-recovery-cofmo)).
- **Real-time operation.** Two-channel folding and RCRT reconstruction run on the FPGA with a latency of 51 clock cycles (see [Algorithms](../algorithms/#on-chip-real-time-reconstruction)).

{% include figure.html image="images/figs/ch08_PowerCom.jpg" caption="Power spectra of the modulo ADC with recovery and of a conventional ADC at ρ = 92." width="70%" %}

{% capture col1 %}
{% include figure.html image="images/figs/RealHardware.png" caption="Two-channel folding recorded on an oscilloscope." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/Rho100.jpg" caption="Recovery at a folding-depth ratio of 108." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% capture col1 %}
{% include figure.html image="images/figs/ch08_QAM.jpg" caption="QAM." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ch08_BPSK.jpg" caption="BPSK." %}
{% endcapture %}

{% capture col3 %}
{% include figure.html image="images/figs/ch08_FSK.jpg" caption="FSK." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 col3=col3 %}

{% include section.html %}

## Publications

{% include citation.html lookup="doi:10.1109/OJCAS.2026.3694303" %}
{% include citation.html lookup="doi:10.1109/SAM68950.2026.11687878" %}
{% include citation.html lookup="doi:10.1109/ISCAS56072.2025.11043900" %}
