---
---

# Modulo ADC Lab

Conventional ADCs **clip** when a signal exceeds their range. A modulo ADC **folds** it back instead, and the original is recovered digitally.
We study modulo sampling from theory and algorithms to FPGA hardware and applications.

{% capture col1 %}
{% include figure.html image="images/figs/ch01_ClassADC.png" caption="Conventional ADC: the peak is clipped and lost." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ch01_ModuloADC.png" caption="Modulo ADC: the peak is folded and can be recovered." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include section.html %}

## Research

<div class="center">

{%
  include card.html
  image="images/figs/ch05_Mul-flow.png"
  link="theory"
  title="Theory"
  description="Multi-channel modulo ADCs, robust CRT and bit-depth analysis."
%}

{%
  include card.html
  image="images/figs/Rho100.jpg"
  link="algorithms"
  title="Algorithms"
  description="Low-rate, noise-robust signal reconstruction."
%}

{%
  include card.html
  image="images/figs/ch08_HardwareBlock1.png"
  link="hardware"
  title="Hardware"
  description="FPGA-calibrated prototype with over 100× dynamic-range extension."
%}

{%
  include card.html
  image="images/figs/ch09_sar_quafour7.jpg"
  link="applications"
  title="Applications"
  description="Radar imaging, mmWave communications and speech."
%}

</div>

{% include section.html background="images/header.svg" dark=true %}

{% capture col1 %}
<p class="center"><span style="font-size: 2.6rem; font-weight: 600;">&gt;100×</span><br>dynamic-range extension on hardware</p>
{% endcapture %}

{% capture col2 %}
<p class="center"><span style="font-size: 2.6rem; font-weight: 600;">2πe → 3</span><br>oversampling needed for single-channel recovery</p>
{% endcapture %}

{% capture col3 %}
<p class="center"><span style="font-size: 2.6rem; font-weight: 600;">1–2 bits</span><br>overhead over a conventional ADC</p>
{% endcapture %}

{% include cols.html col1=col1 col2=col2 col3=col3 %}

{% include section.html %}

## Hardware Demos

{% capture col1 %}
{% include video.html video="images/videos/demo-reconstruction.mp4" poster="images/videos/demo-reconstruction.jpg" caption="Real-time acquisition and reconstruction." %}
{% endcapture %}

{% capture col2 %}
{% include video.html video="images/videos/demo-folding.mp4" poster="images/videos/demo-folding.jpg" caption="Live signal folding on the oscilloscope." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include section.html %}

## Recent Publications

{% include citation.html lookup="doi:10.1109/TIT.2026.3723974" %}
{% include citation.html lookup="doi:10.1109/TSP.2026.3696002" %}
{% include citation.html lookup="doi:10.1109/OJCAS.2026.3694303" %}

{%
  include button.html
  link="publications"
  text="All publications"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}
