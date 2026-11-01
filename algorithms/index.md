---
title: Algorithms
toc: true
nav:
  order: 2
  tooltip: Signal reconstruction from folded samples
---

# {% include icon.html icon="fa-solid fa-wave-square" %}Algorithms

Folded samples hide the original signal. Our algorithms unfold it quickly, at low sampling rates, and under noise.

{% include section.html %}

## Difference-Based Recovery (RSoD)

Single-channel recovery with the required oversampling reduced from 2πe ≈ 17 to **3**, with guarantees under noise and sampling jitter.

{% capture col1 %}
{% include figure.html image="images/figs/Rho100.jpg" caption="Hardware recovery at 108× folding depth." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ReconExample.jpg" caption="Recovery of a general bandlimited signal." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include citation.html lookup="doi:10.1109/TSP.2026.3696002" %}

{% include section.html %}

## Robust CRT with Signal Unwrapping

Combines multi-channel CRT decoding with single-channel unwrapping.

{% include citation.html lookup="doi:10.1109/LSP.2026.3696895" %}

{% include section.html %}

## Threshold-Sensitivity Stabilisation (TSSA)

Absorbs hardware threshold mismatch at the algorithm level.

{% include figure.html image="images/figs/ch07_exp_sinc.png" caption="TSSA recovery of a bandlimited signal on hardware." width="70%" %}

{% include citation.html lookup="doi:10.1109/ICASSP49660.2025.10888047" %}

{% include section.html %}

## On-Chip Real-Time Reconstruction

A hardware-friendly robust CRT pipeline that runs entirely on the FPGA.

{% include figure.html image="images/figs/ch08_Pipeline.png" caption="Pipelined RCRT reconstruction on FPGA." %}

{% include figure.html image="images/figs/ch08_Ex1.jpg" caption="Two-channel sampling and real-time on-chip reconstruction of a 10 kHz sinusoid." %}

{% include citation.html lookup="doi:10.1109/SAM68950.2026.11687878" %}
