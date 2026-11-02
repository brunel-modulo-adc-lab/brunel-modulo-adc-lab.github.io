---
title: Theory
toc: true
nav:
  order: 1
  tooltip: Single- and multi-channel modulo sampling theory
---

# Theory

A modulo ADC folds the input into [−λ, λ), and the central question is under which conditions the folding can be undone.
With one channel, the answer depends on the smoothness of the signal. With several channels, it follows from number theory.

{% include section.html %}

## Single-Channel

### Folding and Sampling

The signal is folded and then sampled at f<sub>s</sub>. Recovery is possible when the sampling rate is high enough for neighboring samples to indicate where the folding occurred.
Two quantities describe the setting, namely the **oversampling factor (OF)**, the ratio of the sampling rate to the Nyquist rate, and the **folding-depth ratio** ρ, the ratio of the signal peak to the folding threshold λ.

{% include figure.html image="images/figs/SystemArchi.png" caption="Single-channel modulo sampling, consisting of folding, sampling, and recovery." %}

### Tightened Recovery Guarantee

<div class="summary">
  <b>Problem</b>
  <span>The unlimited sampling framework requires OF ≥ 2πe ≈ 17, and its noise guarantee only admits OF on a doubling ladder (17, 34, 68, 137, …). At ρ = 10 with noise at 10% of λ, it requires OF ≈ 137. Clock jitter is not covered.</span>
  <b>Approach</b>
  <span>The Stirling-type bound on high-order differences is replaced by a Bernstein-type bound, which gives a single condition linking the folding-depth ratio, the noise level, the sampling rate, and the difference order.</span>
  <b>Result</b>
  <span>Noiseless recovery requires only <b>OF &gt; 3</b>, a factor of 5.7 below 2πe. In the noisy example above, the required OF falls from 136.6 to <b>12.8</b>, and the guarantee extends to bounded clock jitter.</span>
</div>

<div class="theorem">
  <p class="theorem-title">Theorem (recovery condition)</p>
  <p>Let $g$ be bandlimited to $\Omega$, sampled with period $T$ (with $T\Omega \le \pi$) and folded with additive noise, $y[k] = \mathcal{M}_\lambda(g(kT)) + \eta[k]$. Write $\rho = \lVert g\rVert_\infty/\lambda$ and $\rho_\eta = \lVert \eta\rVert_\infty/\lambda$. For any difference order $N \ge 1$, if</p>
  \[\rho\left(2\sin\frac{T\Omega}{2}\right)^{N} + 2^{N}\rho_\eta < 1,\]
  <p>then the difference-based algorithm returns $\hat g[k] = g[k] + \eta[k] + 2m\lambda$ for a constant integer $m$.</p>
  <p><b>Interpretation.</b> Each difference scales a bandlimited signal by at most $2\sin(T\Omega/2)$, which is below 1 once OF &gt; 3. After sufficiently many differences, the differenced signal lies below the threshold, so the folding integers can be identified.</p>
</div>

<div class="theorem">
  <p class="theorem-title">Corollary (second-order operating point)</p>
  <p>With $N = 2$ (RSoD), recovery is guaranteed whenever $\rho_\eta < 1/4$ and</p>
  \[\mathrm{OF} > \pi\sqrt{\frac{\rho}{1-4\rho_\eta}}.\]
  <p>For sinc-like spectra, the requirement is lower by a further factor of $\sqrt{3}$. The required rate therefore grows only with $\sqrt{\rho}$.</p>
</div>

{% capture col1 %}
{% include figure.html image="images/figs/OFvsrho.png" caption="Simulated reconstruction quality (color scale in dB) together with the two bounds. The empirical transition lies within 10% of the sinc bound." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/Rho100.jpg" caption="Hardware recovery at ρ = 108 with a 3-bit ADC, giving 57.1 dB SINAD (9.2 ENOB) compared with 19.7 dB for a conventional 3-bit ADC." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include citation.html lookup="doi:10.1109/TSP.2026.3696002" %}

{% include section.html %}

## Multi-Channel

### The Chinese Remainder Theorem

A problem from the *Sunzi Suanjing* asks for a number that leaves remainder 2 when divided by 3, remainder 3 when divided by 5, and remainder 2 when divided by 7.
No single remainder determines the number, whereas the three together determine it uniquely below 105, namely **23**. This is the Chinese remainder theorem (CRT).

{% capture col1 %}
{% include figure.html image="images/figs/crt_puzzle.jpg" caption="The remainder problem from the Sunzi Suanjing (今有物不知其数)." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/crt_steps.jpg" caption="Solution of the problem by the CRT in three steps." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

### From Remainders to Modulo ADCs

A modulo ADC with folding threshold Δ<sub>l</sub> outputs a **remainder** of the input. Several channels with different thresholds provide several remainders of the same sample, and the CRT combines them into the full-range value sample by sample. Each channel operates at the Nyquist rate, so **no oversampling** is required.

{% include figure.html image="images/figs/crt_channels.jpg" caption="Each channel folds the same signal with its own threshold Δ and produces one remainder." %}

### Robust CRT

The classical CRT applies to exact integers only. A remainder error of one unit in a single channel can shift the result by a multiple of the product of the other moduli.
The **robust CRT (RCRT)** operates on real-valued, noisy remainders and bounds the reconstruction error whenever the remainder errors stay below a known tolerance.

{% capture col1 %}
{% include figure.html image="images/figs/crt_limits.jpg" caption="The classical CRT requires integer remainders and is sensitive to remainder errors." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/crt_mc_vs_rcrt.jpg" caption="The multi-channel system formulated as an RCRT problem." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

<div class="theorem">
  <p class="theorem-title">RCRT for modulo ADCs</p>
  <p>Choose thresholds $\Delta_\ell = \varepsilon\tau_\ell$, $\ell = 1,\dots,L$, where the $\tau_\ell$ are pairwise coprime integers and $\varepsilon > 0$ is their common divisor. Every sample in $[-P, P)$ with</p>
  \[P = \frac{\varepsilon\,\tau_1\tau_2\cdots\tau_L}{2}\]
  <p>is recovered exactly from its $L$ remainders whenever the remainder errors satisfy $\lVert \mathbf{e}\rVert_\infty < \varepsilon/4$, and the reconstruction error is then at most $\max_\ell |e_\ell|$.</p>
  <p><b>Interpretation.</b> The product of the $\tau_\ell$ sets the recoverable range, and the common divisor $\varepsilon$ sets the error tolerance. The design problem is the choice of these parameters.</p>
</div>

{% include figure.html image="images/figs/ch05_Mul-flow.png" caption="Multi-channel modulo ADC sampling system with RCRT reconstruction." %}

### Optimal Threshold Selection

<div class="summary">
  <b>Problem</b>
  <span>The RCRT treats the moduli as free parameters. For a hardware limit on the threshold and a target recoverable range, no rule existed for choosing the coprime set that maximizes the error tolerance, and designs relied on prime moduli or numerical search.</span>
  <b>Approach</b>
  <span>The design is reduced to minimizing the largest coprime factor under a product constraint, which is solved in closed form using the coprimality of consecutive (odd) integers.</span>
  <b>Result</b>
  <span>Closed-form optimal thresholds for 2, 3, and 4 channels, obtained with a few comparisons and no search. In a three-channel example, the error tolerance is <b>38% higher</b> than that of the best prime-only design and 57% higher than that of a structured 2ⁿ±1 design.</span>
</div>

<div class="theorem">
  <p class="theorem-title">Theorem (optimal moduli, L = 2, 3, 4)</p>
  <p>Let $\rho_d > 1$ be the required range ratio. The error tolerance $\varepsilon/4$ is maximized by the following moduli.</p>
  <p>• $L = 2$: consecutive integers $\{\tau_1,\tau_2\} = \{\lceil\rho_d\rceil,\ \lceil\rho_d\rceil + 1\}$.</p>
  <p>• $L = 3$: $(2,3,5)$ if $\rho_d \le 6$, and otherwise a triple of near-consecutive integers around $n_0 = \min\{n \ge 3 : n(n-1) \ge \rho_d\}$, chosen according to the parity of $n_0$.</p>
  <p>• $L = 4$: $(2,3,5,7)$ if $\rho_d \le 30$, and otherwise a quartet around $n_0 = \min\{n \ge 5 : n(n-1)(n-2) \ge \rho_d\}$, chosen from a short table of parity and remainder cases.</p>
  <p><b>Interpretation.</b> The optimal moduli are as close to each other as coprimality permits, near $\rho_d^{1/(L-1)}$.</p>
</div>

<div class="theorem">
  <p class="theorem-title">Corollary (error tolerance of an L-channel modulo ADC)</p>
  <p>With these thresholds and largest threshold $\Delta_{\max}$, the system samples at $L$ times the Nyquist rate and recovers the signal whenever</p>
  \[\lVert \mathbf{e}\rVert_\infty < \frac{C\,\Delta_{\max}}{4}\,\rho^{-1/(L-1)}, \qquad C \in (0,1],\ C \to 1 \text{ as } \rho \to \infty.\]
  <p><b>Interpretation.</b> The error tolerance has the same form as in single-channel unlimited sampling, whereas the sampling rate grows <b>linearly</b> rather than exponentially with the number of channels. At ρ = 10, three channels tolerate an error of 2.00 at three times the Nyquist rate, compared with 1.11 for one channel at 34 times the Nyquist rate.</p>
</div>

{% include citation.html lookup="doi:10.1109/TIT.2026.3723974" %}
{% include citation.html lookup="doi:10.1109/ICASSP48485.2024.10448478" %}

### Layered Robust CRT

<div class="summary">
  <b>Problem</b>
  <span>Practical signals mostly take small values with occasional large peaks. A layered RCRT assigns a larger error tolerance to small amplitudes, but the modulus pair that yields exactly K layers with the largest tolerances had been found only by ad hoc search.</span>
  <b>Approach</b>
  <span>The number of layers equals the length of the remainder chain in Euclid's algorithm. The worst case of Euclid's algorithm, consecutive Fibonacci-like numbers, therefore gives the largest number of layers for the smallest moduli.</span>
  <b>Result</b>
  <span>A closed-form construction that requires checking only three seeds. Compared with the previous design with the same full range, the error tolerance is <b>approximately 2.4 times higher at every layer</b>.</span>
</div>

<div class="theorem">
  <p class="theorem-title">Theorem (Fibonacci-inspired moduli)</p>
  <p>Let $F_{d,k}$ be the Fibonacci-like sequence with $F_{d,0} = d$, $F_{d,1} = 1$. For $K \ge 1$ layers and range ratio $\rho_d$, set</p>
  \[\zeta_d = \left\lceil \frac{\rho_d - F_{d,K}}{F_{d,K+1}} \right\rceil,\quad \tau_1 = \zeta_d F_{d,K+1} + F_{d,K},\quad \tau_2 = \tau_1 + F_{d,K+1}.\]
  <p>Then $(\tau_1,\tau_2)$ is coprime with exactly $K$ robust layers, and layer $j$ tolerates errors up to $\varepsilon F_{d,K+2-j}/4$. The smallest $\tau_2$ over all seeds is attained for $d \in \{1,2,3\}$.</p>
  <p><b>Interpretation.</b> The error tolerance of each layer is approximately φ ≈ 1.618 times that of the next layer, so the tolerance decreases geometrically as the amplitude grows.</p>
</div>

{% capture col1 %}
{% include figure.html image="images/figs/P3.png" caption="Remainder map of a layered design. Small inputs (inner layers) lie on widely spaced lines." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/simulRes_1_RRSE.jpg" caption="Reconstruction error versus remainder-error bound. The proposed pair (5, 7) remains accurate up to approximately 2.4 times the remainder error tolerated by the baseline (5, 17) at both layers." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include citation.html lookup="doi:10.1109/TIT.2026.3723974" %}

### Complex-Valued Systems

<div class="summary">
  <b>Problem</b>
  <span>I/Q receivers process complex-valued signals. Two independent real-valued systems require four ADCs, and a conjugate design requires two but lacked a rule for selecting its thresholds.</span>
  <b>Approach</b>
  <span>Conjugate Gaussian-integer thresholds $\varepsilon(p \pm qi)$ are used. Coprimality then reduces to a parity condition on $(p, q)$, and the optimal design is the admissible lattice point closest to a circle determined by the required range.</span>
  <b>Result</b>
  <span>A closed-form rule that comes within approximately 1% of the optimal error tolerance, together with an exact search based on Fermat's theorem on sums of two squares. Randomly chosen thresholds are infeasible in 42–67% of trials.</span>
</div>

<div class="theorem">
  <p class="theorem-title">Corollary (closed-form selection)</p>
  <p>With $\beta = 2g_{\max}/\Delta_{\max}$, choose</p>
  \[p = \lceil \beta \rceil,\qquad q = \begin{cases} 1, & p \text{ even} \\ 2, & p \text{ odd} \end{cases},\qquad \varepsilon = \frac{\Delta_{\max}}{\sqrt{p^2+q^2}}.\]
  <p>Then $\gcd(p,q) = 1$ and $p - q$ is odd, so the pair is feasible for every $\beta$, and the recoverable range covers $\beta$.</p>
</div>

{% capture col1 %}
{% include figure.html image="images/figs/ch4_complex_system_diagram.png" caption="Complex-valued two-channel modulo ADC." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ch4_complex_boundary_circle.jpg" caption="Feasible threshold pairs near the boundary circle." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include citation.html lookup="doi:10.1109/SAMPTA64769.2025.11133533" %}

### Bit Depth and Bit-Efficient Quantization

<div class="summary">
  <b>Problem</b>
  <span>Quantizing L channels independently costs approximately L − 1 additional bits per sample compared with a conventional ADC.</span>
  <b>Approach</b>
  <span>The scaled difference between the two remainders is a small integer. The system transmits the output of channel 1 together with this difference, which requires one additional operational amplifier, and decodes the folding integers directly by the extended CRT (ECRT).</span>
  <b>Result</b>
  <span>Only <b>1–2 additional bits per sample</b>, independent of ρ. To reach an error of 10⁻², the ECRT requires 19 bits per sample, compared with 28 for the standard RCRT and 18 for an ideal conventional ADC.</span>
</div>

<div class="theorem">
  <p class="theorem-title">Theorem (ECRT bit budget)</p>
  <p>With consecutive moduli $\tau_1 = \lceil\rho\rceil$, $\tau_2 = \lceil\rho\rceil + 1$, the folding integers are recovered exactly whenever the error in the difference is below $\varepsilon/4$, in which case the remaining error is the quantization error of channel 1. Compared with a conventional ADC using $B_c = b + \lceil\log_2\rho\rceil$ bits, the number of bits per sample is</p>
  \[B_{\mathrm{ECRT}} = \begin{cases} B_c + 1, & 2^{n-1} < \rho \le 2^{n} - 1 \\ B_c + 2, & 2^{n} - 1 < \rho \le 2^{n} \end{cases}\qquad n \ge 1.\]
  <p><b>Interpretation.</b> The overhead is one bit except when ρ lies just below a power of two, where it is two bits.</p>
</div>

{% capture col1 %}
{% include figure.html image="images/figs/ch06_SystemDia22.png" caption="Bit-efficient two-channel modulo ADC based on the ECRT." %}
{% endcapture %}

{% capture col2 %}
{% include figure.html image="images/figs/ch06_Simulation1.png" caption="Reconstruction error versus bit rate. The ECRT remains one bit above an ideal conventional ADC." %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}

{% include citation.html lookup="doi:10.1109/LSP.2026.3657150" %}

### Threshold Deviation

<div class="summary">
  <b>Problem</b>
  <span>A threshold designed as 1.4 V may deviate to 1.41 V because of ADC resolution, reference drift, temperature, or noise. The recoverable range and the error tolerance of the RCRT depend on the least common multiple and the greatest common divisor of the two thresholds, and the effect of such a deviation had not been quantified.</span>
  <b>Approach</b>
  <span>Each threshold is modeled as a number recorded to m decimal places, i.e., a random integer multiple of 10<sup>α−m</sup>, and the distributions of the gcd and lcm of random integers are derived from analytic number theory.</span>
  <b>Result</b>
  <span>With high probability, the error tolerance is on the order of 10<sup>α−m</sup> and the recoverable range on the order of 10<sup>m+α</sup>. Each additional decimal place of threshold precision thus reduces the error tolerance by a factor of approximately 10 and enlarges the recoverable range by a similar factor. This result motivates the TSSA on the <a href="../algorithms/#threshold-sensitivity-stabilization-algorithm-tssa">Algorithms</a> page.</span>
</div>

<div class="theorem">
  <p class="theorem-title">Theorem (threshold precision versus performance)</p>
  <p>Let the maximum threshold be $\Delta_{\max} = \Gamma_{\max}\times 10^{\alpha-m}$ and the deviated thresholds $\Delta_\ell = A_\ell \times 10^{\alpha-m}$, $\ell = 1,2$, with $A_\ell$ drawn uniformly and independently from $\{1,\dots,\Gamma_{\max}\}$. Then the error tolerance $\delta$ and the recoverable range $P$ satisfy</p>
  \[\mathbb{P}\left\{\frac{10^{\alpha-m}}{4} \le \delta \le 10^{\alpha-m}\right\} > 86.2\% + \mathcal{O}\!\left(\frac{\log\Gamma_{\max}}{\Gamma_{\max}}\right),\]
  \[\mathbb{P}\left\{\frac{\Gamma_{\max}^2\times 10^{\alpha-m}}{4} < P < \Gamma_{\max}^2\times 10^{\alpha-m}\right\} > 73\% + \mathcal{O}\!\left(\frac{\log\Gamma_{\max}}{\Gamma_{\max}}\right).\]
  <p><b>Example.</b> For $\Delta_2 = 2$ and $\Delta_1 = \sqrt 3$ recorded to one decimal place (1.7), $\delta = 2.5\times10^{-2}$ and $P = 17$. Recorded to two decimal places (1.73), $\delta = 2.5\times10^{-3}$ and $P = 173$.</p>
</div>

{% include figure.html image="images/figs/icassp25_fig1.png" caption="Error tolerance δ and recoverable range P for Δ<sub>2</sub> = 2 and Δ<sub>1</sub> = √3 recorded to m = 1, …, 10 decimal places. The error tolerance decreases and the recoverable range increases exponentially with m." width="60%" %}

{% include citation.html lookup="doi:10.1109/ICASSP49660.2025.10888047" %}
