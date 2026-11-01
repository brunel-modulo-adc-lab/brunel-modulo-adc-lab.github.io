---
title: Theory
toc: true
nav:
  order: 1
  tooltip: Multi-channel modulo sampling theory
---

# {% include icon.html icon="fa-solid fa-square-root-variable" %}Theory

Several low-range modulo ADCs with different thresholds sample the same signal.
The folded outputs are combined with the **robust Chinese Remainder Theorem (CRT)** to recover the full-range signal, tolerating noise and threshold errors.

{% include figure.html image="images/figs/ch05_Mul-flow.png" caption="Multi-channel modulo ADC sampling system with robust CRT reconstruction." %}

{% include section.html %}

## Moduli Selection and Layered Robust CRT

Closed-form threshold choices that maximise noise tolerance, and a layered design that trades dynamic range for robustness.

{% capture col1 %}
{% include figure.html image="images/figs/P3.png" caption="Layered robust-CRT residue map." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ch07_remainder_dist.png" caption="Remainder distribution under threshold deviation." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include citation.html lookup="doi:10.1109/TIT.2026.3723974" %}
{% include citation.html lookup="doi:10.1109/ICASSP48485.2024.10448478" %}
{% include citation.html lookup="doi:10.1109/ICASSP49660.2025.10888047" %}

{% include section.html %}

## Complex-Valued Systems

Conjugate Gaussian-integer thresholds for I/Q front ends.

{% include figure.html image="images/figs/ch4_complex_system_diagram.png" caption="Complex-valued two-channel modulo ADC." %}

{% include citation.html lookup="doi:10.1109/SAMPTA64769.2025.11133533" %}

{% include section.html %}

## Bit-Efficient Quantisation

Transmit one channel plus a compact difference index: only 1–2 extra bits per sample compared with a conventional ADC.

{% include figure.html image="images/figs/ch06_SystemDia22.png" caption="Bit-efficient two-channel modulo ADC." %}

{% include citation.html lookup="doi:10.1109/LSP.2026.3657150" %}
