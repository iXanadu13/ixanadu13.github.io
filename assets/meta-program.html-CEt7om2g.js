import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as n,o as l}from"./app-BiiCq16Q.js";const h={};function t(e,s){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="c-高级特性实例" tabindex="-1"><a class="header-anchor" href="#c-高级特性实例"><span>C++高级特性实例</span></a></h1><h2 id="constexpr初探——阶乘" tabindex="-1"><a class="header-anchor" href="#constexpr初探——阶乘"><span>constexpr初探——阶乘</span></a></h2><div class="language-cpp line-numbers-mode" data-highlighter="shiki" data-ext="cpp" data-title="cpp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &lt;iostream&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">using</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> namespace</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> std</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">constexpr</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> fac</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> n</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> ?</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> :</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (n </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">*</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> fac</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(n</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">));</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    constexpr</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> auto</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> x </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> fac</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意这里的x是在编译期间求值的，生成的汇编代码大致如下：</p><div class="language-s line-numbers-mode" data-highlighter="shiki" data-ext="s" data-title="s" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>main:</span></span>
<span class="line"><span>        push    rbp</span></span>
<span class="line"><span>        mov     rbp, rsp</span></span>
<span class="line"><span>        mov     DWORD PTR [rbp-4], 120</span></span>
<span class="line"><span>        mov     eax, 0</span></span>
<span class="line"><span>        pop     rbp</span></span>
<span class="line"><span>        ret</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模板元编程——斐波那契数列" tabindex="-1"><a class="header-anchor" href="#模板元编程——斐波那契数列"><span>模板元编程——斐波那契数列</span></a></h2><p>模板元编程是一种广泛应用于C++库开发的编程范式。在巧妙的模板的帮助下，程序员可以在编译时执行算法。C++模板元程序被证明是图灵完备的，因此可以在编译时间内执行大规模的算法。</p><div class="language-cpp line-numbers-mode" data-highlighter="shiki" data-ext="cpp" data-title="cpp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &lt;iostream&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">using</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> namespace</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> std</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> N</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">struct</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Fibonacci</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> constexpr</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> value </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> Fibonacci&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">N</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;::value </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">                                 Fibonacci&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">N</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> -</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;::value;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">};</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">struct</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Fibonacci</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> constexpr</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> value </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">};</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">struct</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Fibonacci</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> constexpr</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> value </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    constexpr</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> auto</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> x </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> Fibonacci&lt;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">20</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;::value;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义后缀" tabindex="-1"><a class="header-anchor" href="#自定义后缀"><span>自定义后缀</span></a></h2><div class="language-cpp line-numbers-mode" data-highlighter="shiki" data-ext="cpp" data-title="cpp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &lt;iostream&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">using</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> namespace</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> std</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">long</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> double</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> operator</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &quot;&quot;_km(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">long</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> double</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    auto</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> dis </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1.2</span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;">_km</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="简易的c-编译时字符串混淆" tabindex="-1"><a class="header-anchor" href="#简易的c-编译时字符串混淆"><span>简易的C++编译时字符串混淆</span></a></h2><div class="language-cpp line-numbers-mode" data-highlighter="shiki" data-ext="cpp" data-title="cpp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &lt;iostream&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">using</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> namespace</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> std</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">size_t</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">... </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">I</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">struct</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> MetaString1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    constexpr</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> __attribute</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">((always_inline)) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">MetaString1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> char</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> *</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">str)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        : </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">buffer_</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">encrypt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[I])...}{}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    const</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> char</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> *</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">decrypt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">size_t</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#ABB2BF;"> sizeof...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(I); </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">i)</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            buffer_</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> decrypt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">buffer_</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i]);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        buffer_</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#A626A4;--shiki-dark:#ABB2BF;">sizeof...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(I)] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#A626A4;--shiki-dark:#ABB2BF;"> const_cast</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;const</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> char*&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(buffer_);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">private:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    constexpr</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> char</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> encrypt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> c</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> c </span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2;">^</span><span style="--shiki-light:#986801;--shiki-dark:#E06C75;"> 0x</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">55</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    constexpr</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> char</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> decrypt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">char</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> c</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">return</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> encrypt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(c); }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">private:</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    volatile</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> char</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> buffer_</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[</span><span style="--shiki-light:#A626A4;--shiki-dark:#ABB2BF;">sizeof...</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(I) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">];</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // 避免编译器过度优化</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">template</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;std::</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">size_t</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">... </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">I</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">constexpr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> __attribute((always_inline)) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">auto</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> index_seq_helper</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> char</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> *</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, std::</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">index_sequence</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;I...&gt;)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> MetaString1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;I...&gt;(str).</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">decrypt</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 注意，sizeof(&quot;123&quot;) == 4，但是auto str &quot;123&quot;; sizeof(str) == 8 (返回了const char*长度)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 因此在这里只能使用宏，不能使用自定义后缀</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#define</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> OBFUSCATED1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">str</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) (</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">index_seq_helper</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(str, make_index_sequence</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;sizeof</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(str) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{}))</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    cout </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;&lt;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> OBFUSCATED1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Hello, world&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;&lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用-O1编译参数即可在编译结果中消除字符串常量<code>&quot;Hello, world&quot;</code>。</p><p>此外，这里采用了固定的xor加密算法<code>c ^ 0x55</code>，可以使用随机xor值、随机使用多种加密算法等方式进一步提升加密强度。</p><h2 id="ref" tabindex="-1"><a class="header-anchor" href="#ref"><span>Ref</span></a></h2><ul><li>https://github.com/andrivet/ADVobfuscator</li><li>https://www.researchgate.net/publication/259005783_Random_number_generator_for_C_template_metaprograms</li><li>https://www.zhihu.com/question/378525362/answer/1072878269</li><li>https://gist.github.com/KoneLinx/d3601597248bed423daf1a7cf7bd9533</li></ul>`,16)]))}const r=i(h,[["render",t],["__file","meta-program.html.vue"]]),d=JSON.parse(`{"path":"/posts/cpp/meta-program.html","title":"C++高级特性实例","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-12-17T00:00:00.000Z","category":["C++"],"tag":["C++","Metaprogramming"],"description":"C++高级特性实例 constexpr初探——阶乘 注意这里的x是在编译期间求值的，生成的汇编代码大致如下： 模板元编程——斐波那契数列 模板元编程是一种广泛应用于C++库开发的编程范式。在巧妙的模板的帮助下，程序员可以在编译时执行算法。C++模板元程序被证明是图灵完备的，因此可以在编译时间内执行大规模的算法。 自定义后缀 简易的C++编译时字符串混淆...","head":[["meta",{"property":"og:url","content":"https://iXanadu13.github.io/posts/cpp/meta-program.html"}],["meta",{"property":"og:site_name","content":"Xanadu13's Blog"}],["meta",{"property":"og:title","content":"C++高级特性实例"}],["meta",{"property":"og:description","content":"C++高级特性实例 constexpr初探——阶乘 注意这里的x是在编译期间求值的，生成的汇编代码大致如下： 模板元编程——斐波那契数列 模板元编程是一种广泛应用于C++库开发的编程范式。在巧妙的模板的帮助下，程序员可以在编译时执行算法。C++模板元程序被证明是图灵完备的，因此可以在编译时间内执行大规模的算法。 自定义后缀 简易的C++编译时字符串混淆..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-18T13:36:08.000Z"}],["meta",{"property":"article:tag","content":"C++"}],["meta",{"property":"article:tag","content":"Metaprogramming"}],["meta",{"property":"article:published_time","content":"2024-12-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-18T13:36:08.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"C++高级特性实例\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-12-17T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-18T13:36:08.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Xanadu13\\",\\"url\\":\\"https://github.com/iXanadu13\\"}]}"]]},"headers":[{"level":2,"title":"constexpr初探——阶乘","slug":"constexpr初探——阶乘","link":"#constexpr初探——阶乘","children":[]},{"level":2,"title":"模板元编程——斐波那契数列","slug":"模板元编程——斐波那契数列","link":"#模板元编程——斐波那契数列","children":[]},{"level":2,"title":"自定义后缀","slug":"自定义后缀","link":"#自定义后缀","children":[]},{"level":2,"title":"简易的C++编译时字符串混淆","slug":"简易的c-编译时字符串混淆","link":"#简易的c-编译时字符串混淆","children":[]},{"level":2,"title":"Ref","slug":"ref","link":"#ref","children":[]}],"git":{"createdTime":1734422413000,"updatedTime":1734528968000,"contributors":[{"name":"Xanadu13","email":"xanadu13@qq.com","commits":2}]},"readingTime":{"minutes":1.7,"words":511},"filePathRelative":"posts/cpp/meta-program.md","localizedDate":"2024年12月17日","excerpt":"\\n<h2>constexpr初探——阶乘</h2>\\n<div class=\\"language-cpp line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"cpp\\" data-title=\\"cpp\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">#include</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> &lt;iostream&gt;</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">using</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\"> namespace</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#E5C07B\\"> std</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">;</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">constexpr</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\"> int</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\"> fac</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">int</span><span style=\\"--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic\\"> n</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">{</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">    return</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> n </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">&lt;=</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> 1</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\"> ?</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> 1</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\"> :</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> (n </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">*</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\"> fac</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(n</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">-</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\">1</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">));</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">}</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">int</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\"> main</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">() {</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">    constexpr</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\"> auto</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> x </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">=</span><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\"> fac</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\">5</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">);</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{r as comp,d as data};