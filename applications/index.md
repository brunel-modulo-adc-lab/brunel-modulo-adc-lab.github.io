---
title: Applications
toc: true
nav:
  order: 4
  tooltip: Radar, communications and speech
---

# Applications

Modulo ADCs are suited to applications in which strong and weak signal components arrive simultaneously, since they avoid saturation without automatic gain control.

{% include section.html %}

## Synthetic Aperture Radar

<div class="summary">
  <b>Problem</b>
  <span>Radar scenes span 60–120 dB between strong clutter and weak targets. Clipping of the raw data by the ADC distorts the focused image, and single-channel recovery would require a high oversampling factor.</span>
  <b>Approach</b>
  <span>The I and Q components of measured mmWave SAR raw data are each sampled by a three-channel modulo ADC (ρ = 60) at the Nyquist rate per channel and recovered with the robust CRT (RCRT).</span>
  <b>Result</b>
  <span>The reconstructed image matches the unclipped reference, and <b>8 bits per channel (24 bits per sample)</b> achieve a reconstruction error no larger than that of a 32-bit conventional ADC without clipping.</span>
</div>

{% capture col1 %}
{% include figure.html image="images/figs/ch09_sar_original.jpg" caption="Reference image." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ch09_sar_quantra.jpg" caption="Conventional ADC with clipping." %}
{% endcapture %}

{% capture col3 %}
{% include figure.html image="images/figs/ch09_sar_quafour7.jpg" caption="Three-channel modulo ADC." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 col3=col3 %}

{% include figure.html image="images/figs/ch09_sar_quantization.jpg" caption="Reconstruction error versus ADC resolution. From 8 bits per channel, the three-channel modulo ADC reaches the numerical precision limit, whereas the error of the clipping ADC remains approximately 1." width="60%" %}

{% include citation.html lookup="High Dynamic Range Multi-channel modulo ADCs" %}

{% include section.html %}

## mmWave MIMO Communications

<div class="summary">
  <b>Problem</b>
  <span>The received power in mmWave links varies over a wide range, so a low-resolution ADC clips the received signal and the spectral efficiency saturates regardless of the beamforming design.</span>
  <b>Approach</b>
  <span>A modulo ADC is placed on every receive branch, and the transmit precoder, the receive combiner, and the phases of the intelligent reflecting surface (IRS) are designed jointly.</span>
  <b>Result</b>
  <span>With a 2-bit modulo ADC, the spectral efficiency is 11.7 bit/s/Hz compared with 9.6 bit/s/Hz for a clipping ADC, and the bit error rate (BER) is 1.3 × 10⁻³ compared with 2.4 × 10⁻². A conventional receiver requires <b>3–4 additional bits</b> to reach the same performance.</span>
</div>

{% include figure.html image="images/figs/ch09_irs_sysmodel.png" caption="IRS-aided mmWave MIMO system with a modulo ADC receiver." width="80%" %}

{% include figure.html image="images/figs/ch09_irs_constellation.png" caption="Recovered 16-QAM constellations with 2-bit quantization for the modulo ADC (left) and the conventional ADC (right)." width="80%" %}

{% include citation.html lookup="doi:10.1109/ICC59461.2026.11587284" %}

{% include section.html %}

## Speech and Audio

<div class="summary">
  <b>Problem</b>
  <span>Speech has a high peak-to-average power ratio. A converter scaled for conversational levels clips plosives and other loud transients, and automatic gain control responds too slowly to follow them.</span>
  <b>Approach</b>
  <span>Microphone signals are acquired with the single-channel hardware prototype and recovered with RSoD.</span>
  <b>Result</b>
  <span>Microphone tones are recovered with a frequency error of at most 1.3%, and a spoken “hello” with an SNR of 20.1 dB. These preliminary hardware results were obtained at a folding-depth ratio of approximately 2.</span>
</div>

{% include figure.html image="images/figs/Ch09_sppech_setUp.png" caption="Audio acquisition with the modulo ADC prototype." width="80%" %}

{% capture col1 %}
{% include figure.html image="images/figs/Ch9_audio_clip.png" caption="Conventional ADC, in which the transients are clipped." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/Ch9_audio_mod.png" caption="Modulo ADC with recovery." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}
