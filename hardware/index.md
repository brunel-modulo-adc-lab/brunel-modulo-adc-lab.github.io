---
title: Hardware
toc: true
nav:
  order: 3
  tooltip: FPGA modulo ADC prototype
---

# {% include icon.html icon="fa-solid fa-microchip" %}Hardware

An FPGA-calibrated modulo ADC prototype with up to four channels, achieving **over 100× dynamic-range extension**.

{% include figure.html image="images/figs/ch08_HardwareBlock1.png" caption="The modulo ADC prototype board (Zynq-7000 FPGA)." %}

{% include section.html %}

## Live Demos

{% capture col1 %}
{% include video.html video="images/videos/demo-reconstruction.mp4" poster="images/videos/demo-reconstruction.jpg" caption="Real-time acquisition and reconstruction." %}
{% endcapture %}

{% capture col2 %}
{% include video.html video="images/videos/demo-folding.mp4" poster="images/videos/demo-folding.jpg" caption="Live signal folding on the oscilloscope." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include section.html %}

## Architecture

{% include figure.html image="images/figs/ch08_SystemDiagram3.png" caption="System block diagram." width="80%" %}

{% include section.html %}

## Calibration

A controlled under-compensation calibration makes folding stable at high folding depths.

{% include figure.html image="images/figs/ch08_cali22.png" caption="Before calibration." %}
{% include figure.html image="images/figs/ch08_cali11.png" caption="After calibration." %}

{% include section.html %}

## Results

{% capture col1 %}
{% include figure.html image="images/figs/RealHardware.png" caption="Two-channel folding captured on the oscilloscope." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/Rho100.jpg" caption="Recovery at 108× folding depth." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% capture col1 %}
{% include figure.html image="images/figs/ch08_QAM.jpg" caption="QAM" %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ch08_BPSK.jpg" caption="BPSK" %}
{% endcapture %}

{% capture col3 %}
{% include figure.html image="images/figs/ch08_FSK.jpg" caption="FSK" %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 col3=col3 %}

{% include section.html %}

## Publications

{% include citation.html lookup="doi:10.1109/OJCAS.2026.3694303" %}
{% include citation.html lookup="doi:10.1109/SAM68950.2026.11687878" %}
{% include citation.html lookup="doi:10.1109/ISCAS56072.2025.11043900" %}
