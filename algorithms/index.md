---
title: Algorithms
toc: true
nav:
  order: 2
  tooltip: Signal reconstruction from folded samples
---

# Algorithms

Recovery from folded samples amounts to identifying the integer number of folds at each sample. Our algorithms address this task at low sampling rates and under noise, for single-channel and multi-channel systems.
Most of them have also been evaluated on data acquired with our [hardware prototype](../hardware/).

{% include section.html %}

## Single-Channel

### Difference-Based Recovery (RSoD)

<div class="summary">
  <b>Problem</b>
  <span>Existing single-channel methods require a high oversampling factor (OF ≥ 17), fail under noise because high-order differences amplify it by up to 2<sup>N</sup>, or rely on iterative optimization.</span>
  <b>Approach</b>
  <span>Recovery from second-order differences (RSoD) differences the folded samples twice, folds the result, and sums it back with an order-matched anti-differencing window. The method is in closed form and requires no iterations.</span>
  <b>Result</b>
  <span>Recovery from <b>OF ≈ 8–10</b> in noisy simulations, a runtime of approximately <b>1.5 ms</b>, up to 200 times shorter than that of optimization-based methods, and recovery of a hardware signal at a folding-depth ratio of 108.</span>
</div>

{% capture col1 %}
{% include figure.html image="images/figs/Rho100.jpg" caption="Hardware recovery at ρ = 108 (10.8 V peak, 0.1 V threshold, 3-bit ADC), with a SINAD of 57.1 dB." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ReconExample.jpg" caption="Hardware recovery of a bandlimited signal (20 kHz, ρ = 17.3) at OF = 8.9, with an SNR of 28.5 dB." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

On the same hardware record (ρ = 102), RSoD reaches **23.4 dB**, whereas three existing methods remain below 6.4 dB even at higher sampling rates.

{% include citation.html lookup="doi:10.1109/TSP.2026.3696002" %}

### Robustness to Noise and Jitter

A lower difference order amplifies noise less, and the recovery guarantee extends to sampling-clock jitter.

<div class="theorem">
  <p class="theorem-title">Theorem (recovery under sampling jitter)</p>
  <p>Let the sampling instants be $t_k = kT + \mu_k$ with $|\mu_k| \le \nu T$, $\nu \in [0,1)$. With $\rho$ and $\rho_\eta$ as before, if</p>
  \[\rho\left[\left(2\sin\frac{T\Omega}{2}\right)^{N} + 2^{N+1}\sin\frac{\nu T\Omega}{2}\right] + 2^{N}\rho_\eta < 1,\]
  <p>the algorithm returns $\hat g[k] = g[k] + \eta[k] + 2m\lambda$ for a constant integer $m$.</p>
  <p><b>Interpretation.</b> Jitter adds a term that grows linearly with $\nu$. For $\nu = 0$, the condition reduces to the jitter-free condition on the <a href="../theory/#tightened-recovery-guarantee">Theory</a> page.</p>
</div>

{% include figure.html image="images/figs/N2VsSNR.png" caption="Reconstruction SNR versus input SNR at the same sampling rate. RSoD (N = 2) succeeds from an input SNR of 11 dB and the higher-order baseline (N = 4) from 21 dB." width="60%" %}

{% capture col1 %}
{% include figure.html image="images/figs/RSoD_PJ.png" caption="RSoD under 5% clock jitter, with stable recovery down to OF ≈ 6." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/D_PJ.png" caption="Thresholding-based method in the same setting, which requires OF ≈ 15." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

On hardware, a signal sampled with 9% jitter is recovered with an SNR of **27.4 dB**, and an input with 15 dB SNR with 29.3 dB.

### Learning-Based Recovery (CoFMo)

<div class="summary">
  <b>Problem</b>
  <span>At low oversampling (OF ≈ 3–5) and large folding-depth ratios, adjacent samples may differ by several folds, and analytical methods cannot distinguish the fold counts. Noise, 4-bit quantization, and hardware nonidealities increase this ambiguity. Existing learning-based methods regress the waveform directly without using the integer fold structure and have been evaluated only on synthetic data.</span>
  <b>Approach</b>
  <span>CoFMo is a coarse-to-fine network. It classifies the integer fold count of every sample with absolute and relative classification heads coupled by a consistency loss, unfolds the samples in closed form, and then regresses the residual. Its input consists of the modulo samples and their first-order difference, and a gated temporo-spectral module combines a Wiener-like spectral gate with self-attention to capture the long-range folding history. Five loss terms are weighted by learned uncertainty parameters.</span>
  <b>Result</b>
  <span>The widest successful-recovery region among four analytical methods and the learning-based MUNet. On <b>measured</b> 64-sample records from our prototype with injected noise and 4-bit quantization, the normalized mean-square error (NMSE) is <b>−19.45 to −29.64 dB</b> at OF 2.77–5.53, which is 7.81–10.89 dB lower than that of MUNet, whereas every analytical baseline remains near 0 dB. To our knowledge, it is the first learning-based modulo recovery method validated on physical modulo ADC measurements.</span>
</div>

<div class="theorem">
  <p class="theorem-title">Decoupled coarse-to-fine recovery</p>
  <p>The measured samples are $y_{\mathrm e}[n] = x[n] - 2\lambda k[n] + \varepsilon[n]$, so an error in the integer $k[n]$ causes an error of at least $2\lambda$, whereas $\varepsilon[n]$ causes only a bounded residual. CoFMo therefore separates the estimate into a discrete and a continuous part,</p>
  \[\hat x[n] = \underbrace{y_{\mathrm e}[n] + 2\lambda\,\hat k[n]}_{x_{\mathrm{coarse}}[n]} + \hat r[n],\qquad \hat k[n] = \arg\max_{i\in\{-K_{\max},\dots,K_{\max}\}} p_{k,i}[n].\]
  <p>The fold budgets follow from the signal model, since $|k[n]| \le \lfloor(\rho+1)/2\rfloor$ and, by Bernstein's inequality,</p>
  \[|\Delta k[n]| < \frac{\pi\rho}{2\,\mathrm{OF}} + 1.\]
  <p><b>Interpretation.</b> Each fold count is selected from a finite set of integers rather than regressed as a real number, so an isolated misclassification does not propagate as a sequence of $2\lambda$ offsets along the record.</p>
</div>

{% include figure.html image="images/figs/cofmo_workflow.png" caption="CoFMo framework, consisting of dual-stream initialization, the gated temporo-spectral module, fold-count classification heads, and closed-form coarse recovery followed by residual refinement." %}

{% include figure.html image="images/figs/cofmo_phase.jpg" caption="Reconstruction NMSE over ρ = 2–17 and OF = 2–30 (19 dB SNR, 4-bit quantization, 100 trials per point). The analytical methods (a–d) fail below a diagonal boundary, and CoFMo (f) covers the widest region. At OF 3–5, every baseline remains above −3.2 dB, whereas CoFMo reaches −16.6 to −22.2 dB." %}

{% include figure.html image="images/figs/cofmo_measured.png" caption="Measured record from our prototype with injected noise and 4-bit quantization. The recovered signal (red) follows the reference (blue) recovered from the folded samples (green)." width="80%" %}

The cost is approximately 1.1 GFLOPs and 6 ms per 512-sample sequence on a GPU. Inference is a fixed forward pass, so the cost does not depend on the folding-depth ratio. Recovery is currently performed offline, and an FPGA implementation on the prototype is planned.

{% include citation.html lookup="Decoupled Coarse-to-Fine Learning" %}

{% include section.html %}

## Multi-Channel

### Robust CRT with Signal Unwrapping

<div class="summary">
  <b>Problem</b>
  <span>The RCRT recovers inputs only within its recoverable range P. Beyond this range, the folding integers of the channels can no longer be matched.</span>
  <b>Approach</b>
  <span>The two approaches are cascaded. The RCRT combines the channels into one virtual modulo signal with a larger effective threshold, and single-channel RSoD then unwraps this signal.</span>
  <b>Result</b>
  <span>On hardware, a signal with a peak of 5.04 V, <b>3.5 times the RCRT recoverable range</b> of 1.44 V, is recovered with an SNR of 28.8 dB.</span>
</div>

<div class="theorem">
  <p class="theorem-title">Effective threshold</p>
  <p>The RCRT stage acts as a single modulo ADC with</p>
  \[\Delta_{\mathrm{eff}} = \varepsilon\prod_{\ell=1}^{L}\tau_\ell = 2P,\qquad \rho_{\mathrm{eff}} = \frac{\rho}{\prod_{\ell=1}^{L-1}\tau_\ell},\]
  <p>so the unwrapping stage operates at a folding-depth ratio reduced by the factor $\prod_{\ell=1}^{L-1}\tau_\ell$.</p>
</div>

{% include figure.html image="images/figs/ch4_hybrid_reconstruction.png" caption="Hardware experiment with two channels (0.36 V and 0.48 V), the RCRT output with an effective threshold of 1.44 V, and the unwrapped 5 V signal." width="70%" %}

{% include citation.html lookup="doi:10.1109/LSP.2026.3696895" %}

### Threshold Sensitivity Stabilization Algorithm (TSSA)

<div class="summary">
  <b>Problem</b>
  <span>The recoverable range and the error tolerance of the RCRT depend on the lcm and the gcd of the two thresholds, so a threshold deviation of 0.001 can change them by orders of magnitude. With Δ<sub>2</sub> = 0.16, a deviation of Δ<sub>1</sub> from 0.14 to 0.141 enlarges the recoverable range from ±0.56 to ±11.28 but reduces the error tolerance by a factor of 20, from 5 × 10⁻³ to 2.5 × 10⁻⁴ (see <a href="../theory/#threshold-deviation">Threshold Deviation</a>).</span>
  <b>Approach</b>
  <span>The TSSA trades recoverable range for a stable error tolerance. It identifies the folding integers from the remainder difference and the threshold spacing σ = Δ<sub>2</sub> − Δ<sub>1</sub>, with the deviated thresholds obtained by calibration. No modular inverse is required, which keeps the implementation cost low.</span>
  <b>Result</b>
  <span>Across all tested deviations, the error tolerance of the TSSA remains between 3.3 × 10⁻³ and 6.8 × 10⁻³, whereas that of the RCRT falls to 2.5 × 10⁻⁴ or 5 × 10⁻⁵. Under 2–12-bit quantization, the TSSA with deviated thresholds performs as well as the RCRT with the designed thresholds.</span>
</div>

<div class="theorem">
  <p class="theorem-title">Theorem (TSSA recoverable range and error tolerance)</p>
  <p>Consider a two-channel modulo ADC with thresholds $\Delta_1 < \Delta_2 < 2\Delta_1$ and let $\sigma = \Delta_2 - \Delta_1$.</p>
  <p>(a) For signal amplitudes within $[-\bar P, \bar P]$, where</p>
  \[\bar P = \max\left\{\Delta_2\left(\left\lfloor\frac{\Delta_2}{2\sigma}\right\rfloor - 0.5\right),\ \Delta_1\left(\left\lfloor\frac{\Delta_1}{2\sigma}\right\rfloor + 0.5\right)\right\},\]
  <p>the TSSA attains the error tolerance $\bar\delta = \sigma/4$.</p>
  <p>(b) If $\Delta_2/2 < \Delta_1 < 2\Delta_2/3$, then $\bar P = \Delta_2/2$.</p>
  <p>(c) If $\Delta_1 = q\epsilon$ and $\Delta_2 = (q+1)\epsilon$ with integer $q \ge 2$, then $\bar P = P = q(q+1)\epsilon/2$ and $\bar\delta = \delta = \epsilon/4$, i.e., the TSSA attains the recoverable range and the error tolerance of the RCRT.</p>
  <p><b>Interpretation.</b> The error tolerance depends only on the threshold spacing, so it changes continuously under threshold deviation, whereas the RCRT tolerance changes with the gcd of the thresholds. By part (b), $\Delta_1$ should exceed $2\Delta_2/3$, since otherwise the second channel alone covers the recoverable range.</p>
</div>

{% capture col1 %}
{% include figure.html image="images/figs/icassp25_fig2.png" caption="Remainder plane for Δ<sub>1</sub> = 1.7 and Δ<sub>2</sub> = 2. All lines together cover [−17, 17]. Restricting the range to [−5, 5] retains only the red lines and increases their spacing from d<sub>1</sub> = 0.1 to d<sub>2</sub> = 0.3, which enlarges the error tolerance." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/icassp25_fig3.png" caption="Mean absolute error under 2–12-bit quantization (10⁴ trials, inputs in [−0.56, 0.56]). With deviated thresholds, the RCRT requires approximately 9 bits to recover the signal, whereas the TSSA attains the error of the designed thresholds 0.14 and 0.16 at every bit depth." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include citation.html lookup="doi:10.1109/ICASSP49660.2025.10888047" %}

### On-Chip Real-Time Reconstruction

<div class="summary">
  <b>Problem</b>
  <span>Modulo recovery is usually performed offline in software, which precludes real-time operation.</span>
  <b>Approach</b>
  <span>With consecutive moduli, the modular inverse has a closed form, so the RCRT reduces to four fixed arithmetic steps that map onto a streaming FPGA pipeline.</span>
  <b>Result</b>
  <span>Folding and reconstruction on one FPGA with a fixed <b>latency of 51 clock cycles</b> and a throughput of one sample per clock cycle, using less than <b>3% of the device</b> (1,200 LUTs and 2 DSP slices) and less than 0.7 W of dynamic power.</span>
</div>

<div class="theorem">
  <p class="theorem-title">Corollary (inverse-free RCRT)</p>
  <p>If $\tau_2 = \tau_1 + 1$, then $\tau_1^{-1} \equiv \tau_1 \pmod{\tau_2}$, and the reconstruction becomes</p>
  \[\hat q = \left\lfloor \frac{\hat y_2 - \hat y_1}{\varepsilon} \right\rceil,\quad \hat n_1 = \langle \hat q\,\tau_1 \rangle_{\tau_2},\quad \hat n_2 = \frac{\hat n_1\tau_1 - \hat q}{\tau_2},\quad \hat g = \frac{1}{2}\sum_{\ell=1}^{2}\left(\hat n_\ell\Delta_\ell + \hat y_\ell\right).\]
</div>

{% include figure.html image="images/figs/ch08_Pipeline.png" caption="Pipelined RCRT reconstruction on the FPGA." %}

{% include figure.html image="images/figs/ch08_Ex1.jpg" caption="Two-channel sampling and real-time on-chip reconstruction of a 10 kHz sinusoid at 1.55 times the Nyquist rate." %}

{% include citation.html lookup="doi:10.1109/SAM68950.2026.11687878" %}
