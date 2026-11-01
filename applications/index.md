---
title: Applications
toc: true
nav:
  order: 4
  tooltip: Radar, communications and speech
---

# {% include icon.html icon="fa-solid fa-satellite-dish" %}Applications

Wherever strong and weak signals arrive together, modulo ADCs avoid saturation without extra gain control.

{% include section.html %}

## Synthetic Aperture Radar

Strong reflections no longer saturate the receiver.

{% capture col1 %}
{% include figure.html image="images/figs/ch09_sar_original.jpg" caption="Ground truth" %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ch09_sar_quantra.jpg" caption="Conventional ADC, clipped" %}
{% endcapture %}

{% capture col3 %}
{% include figure.html image="images/figs/ch09_sar_quafour7.jpg" caption="3-channel modulo ADC" %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 col3=col3 %}

{% include citation.html lookup="High Dynamic Range Multi-channel modulo ADCs" %}

{% include section.html %}

## mmWave MIMO Communications

A modulo-ADC receiver in IRS-aided mmWave MIMO raises spectral efficiency and lowers the required bit depth.

{% capture col1 %}
{% include figure.html image="images/figs/ch09_irs_sysmodel.png" caption="IRS-aided mmWave MIMO with a modulo-ADC receiver." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ch09_irs_constellation.png" caption="Recovered 16-QAM constellation." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include citation.html lookup="doi:10.1109/ICC59461.2026.11587284" %}

{% include section.html %}

## Speech and Audio

Loud transients are captured without clipping or automatic gain control.

{% include figure.html image="images/figs/Ch09_sppech_setUp.png" caption="Audio acquisition with the modulo ADC prototype." width="80%" %}

{% capture col1 %}
{% include figure.html image="images/figs/Ch9_audio_clip.png" caption="Conventional ADC: transients clipped." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/Ch9_audio_mod.png" caption="Modulo ADC with recovery." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}
