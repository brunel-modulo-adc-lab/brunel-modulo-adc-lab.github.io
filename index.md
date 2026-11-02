---
toc: true
---

# Modulo ADC Research

We study modulo sampling, which acquires signals whose amplitude exceeds the input range of an analog-to-digital converter (ADC). Our work covers sampling theory, recovery algorithms, FPGA hardware, and applications.

{% include section.html %}

## What Is a Modulo ADC?

### Clipping in Conventional Acquisition

Every sensor has a finite input range. When a camera records a bright scene with a single exposure, the highlights saturate, and the saturated pixels no longer record the scene detail.

{% capture col1 %}
{% include figure.html image="images/figs/ch01_overexposed.jpg" caption="Single exposure, in which the dome and the fountain are saturated." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ch01_hdr_merged.jpg" caption="The same scene obtained by merging several exposures." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

<p class="center"><small>Photographs by Kevin McCoy, <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.</small></p>

An ADC has the same limitation. Every sample beyond the full-scale level ±λ is clipped, and additional bits refine the quantization within [−λ, λ) without extending this interval.

### Folding Instead of Clipping

A modulo ADC **folds** an out-of-range signal back into [−λ, λ) rather than clipping it. Each folded sample differs from the input by an integer multiple of 2λ, so a digital algorithm can identify these integers and recover the input.

{% capture col1 %}
{% include figure.html image="images/figs/ch01_ClassADC.png" caption="Conventional ADC, in which the peaks are clipped." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ch01_ModuloADC.png" caption="Modulo ADC with the same threshold and 3 bits, in which the peaks are folded into the input range." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include figure.html image="images/figs/SystemArchi.png" caption="Modulo ADC sampling system, consisting of an anti-aliasing filter, folding, sampling, and digital recovery." %}

A low-resolution ADC can thus acquire signals whose amplitude exceeds its input range by a factor of more than 100, as demonstrated on our hardware prototype. We study **single-channel** systems, which recover the signal from its temporal smoothness, and **multi-channel** systems with different thresholds, which recover it by the Chinese remainder theorem (CRT).

{% include section.html %}

## Research

<div class="center">

{%
  include card.html
  image="images/figs/crt_channels.jpg"
  link="theory"
  title="Theory"
  description="Single-channel recovery guarantees and the multi-channel robust CRT."
%}

{%
  include card.html
  image="images/figs/Rho100.jpg"
  link="algorithms"
  title="Algorithms"
  description="Single- and multi-channel recovery at low sampling rates and under noise."
%}

{%
  include card.html
  image="images/figs/ch08_HardwareBlock1.png"
  link="hardware"
  title="Hardware"
  description="FPGA-calibrated prototype that extends the input range by a factor of more than 100."
%}

{%
  include card.html
  image="images/figs/ch09_sar_quafour7.jpg"
  link="applications"
  title="Applications"
  description="Radar imaging, mmWave communications, and speech acquisition."
%}

</div>

{% include section.html background="images/header.svg" dark=true %}

{% capture col1 %}
<p class="center"><span style="font-size: 2.6rem; font-weight: 600;">&gt;100×</span><br>input-range extension on hardware</p>
{% endcapture %}

{% capture col2 %}
<p class="center"><span style="font-size: 2.6rem; font-weight: 600;">2πe → 3</span><br>oversampling factor required for single-channel recovery</p>
{% endcapture %}

{% capture col3 %}
<p class="center"><span style="font-size: 2.6rem; font-weight: 600;">1–2 bits</span><br>per-sample overhead relative to a conventional ADC</p>
{% endcapture %}

{% include cols.html col1=col1 col2=col2 col3=col3 %}

{% include section.html %}

## Hardware Demos

{% capture col1 %}
{% include video.html video="images/videos/demo-reconstruction.mp4" poster="images/videos/demo-reconstruction.jpg" caption="Real-time acquisition and reconstruction." %}
{% endcapture %}

{% capture col2 %}
{% include video.html video="images/videos/demo-folding.mp4" poster="images/videos/demo-folding.jpg" caption="Signal folding observed on an oscilloscope." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include section.html %}

## Recent Publications

<div class="theorem">
  <p class="theorem-title">Accepted for publication in IEEE Transactions on Instrumentation and Measurement</p>
  <p><b>Decoupled Coarse-to-Fine Learning for Modulo Signal Recovery</b></p>
  <p><a href="members/yutao-jin">Yutao Jin</a>, Wenyi Yan, Zichen Wang, Hongqing Liu, Guoquan Li, Lu Gan. Provisionally accepted, November 2026.</p>
  <p>CoFMo classifies the integer fold count of every sample and then refines the residual waveform. On measured modulo ADC data with 4-bit quantization, it recovers 64-sample records with a normalized mean-square error (NMSE) of −19.45 to −29.64 dB, whereas the analytical baselines remain near 0 dB. To our knowledge, it is the first learning-based modulo recovery method validated on physical modulo ADC measurements. <a href="algorithms/#learning-based-recovery-cofmo">Details</a></p>
</div>

{% include citation.html lookup="doi:10.1109/TIT.2026.3723974" %}
{% include citation.html lookup="doi:10.1109/TSP.2026.3696002" %}
{% include citation.html lookup="doi:10.1109/OJCAS.2026.3694303" %}

{%
  include button.html
  link="publications"
  text="All publications"
  style="bare"
%}
