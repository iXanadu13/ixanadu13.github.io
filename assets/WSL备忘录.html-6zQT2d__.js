import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,d as n,b as s,e,f as h,g as r,r as d,o as p}from"./app-gpn5QMCO.js";const o="/assets/images/wsl/wsl-list.png",k={};function g(c,i){const a=d("RouteLink");return p(),l("div",null,[i[3]||(i[3]=n('<h1 id="wsl备忘录" tabindex="-1"><a class="header-anchor" href="#wsl备忘录"><span>WSL备忘录</span></a></h1><p>在做计网实验时，之前用的一直都是VMware，最近偶然接触到WSL(Windows Subsystem for Linux)，在此记录基本配置过程。</p><h2 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置"><span>基本配置</span></a></h2><ul><li><p><a href="https://www.youtube.com/watch?v=PaEcQmgEz78" target="_blank" rel="noopener noreferrer">介绍视频</a>（需要武林绝学，或者b站随便找个都行）</p></li><li><p>支持的GUI应用：https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/gui-apps</p></li><li><p>取消自动挂载：https://devblogs.microsoft.com/commandline/automatically-configuring-wsl/</p></li></ul><h2 id="迁移" tabindex="-1"><a class="header-anchor" href="#迁移"><span>迁移</span></a></h2><blockquote><p>wsl默认安装在C盘，建议趁刚安装时迁移到容量充足的其他盘</p></blockquote><ol><li>查看当前安装的所有WSL</li></ol><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">wsl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --list</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -v</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>左边的*表示默认项</p><ol start="2"><li>先导出WSL到指定路径</li></ol><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">wsl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --export</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Ubuntu-20.04</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> E:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\w</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">sl</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\U</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">buntu-20.04.tar</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="3"><li>删除你要导出的wsl</li></ol><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">wsl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --unregister</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Ubuntu-20.04</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="4"><li>从第2步中导出的tar文件导入wsl，这里指定了version为2</li></ol><ul><li>格式：wsl --import &lt;WSL名称&gt; &lt;导入后wsl工作路径&gt; &lt;wsl压缩包路径&gt;</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">wsl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --import</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Ubuntu-20.04</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> E:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\w</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">sl</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\u</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">buntu-20.04</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> E:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\w</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">sl</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\U</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">buntu-20.04.tar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --version</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="5"><li>配置先前的默认登录用户</li></ol><ul><li>格式：&lt;EXE&gt; config --default-user &lt;用户名&gt;</li></ul><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ubuntu2004.exe</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> config</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --default-user</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> xanadu13</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>如果是kali-linux：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">kali.exe</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> config</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --default-user</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> xanadu13</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="常用指令" tabindex="-1"><a class="header-anchor" href="#常用指令"><span>常用指令</span></a></h2><p>软链接挂载文件夹：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ln</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /mnt/e/wsl/share</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ~/share</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>运行指定wsl：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">wsl</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -d</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> kali-linux</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="连接wsl桌面" tabindex="-1"><a class="header-anchor" href="#连接wsl桌面"><span>连接wsl桌面</span></a></h2>',28)),s("p",null,[i[1]||(i[1]=e("目前已知kali-linux wsl可以通过类似远程桌面的方式连接，具体见我的")),h(a,{to:"/posts/%E5%9C%A8WSL%E4%B8%AD%E4%BD%BF%E7%94%A8kali-linux%E8%B8%A9%E5%9D%91%E8%AE%B0%E5%BD%95.html"},{default:r(()=>i[0]||(i[0]=[e("另一篇文章")])),_:1}),i[2]||(i[2]=e("："))]),i[4]||(i[4]=s("h2",{id:"ref",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#ref"},[s("span",null,"Ref")])],-1)),i[5]||(i[5]=s("ul",null,[s("li",null,"https://www.jianshu.com/p/2a2d16029dc2")],-1))])}const m=t(k,[["render",g],["__file","WSL备忘录.html.vue"]]),y=JSON.parse(`{"path":"/posts/WSL%E5%A4%87%E5%BF%98%E5%BD%95.html","title":"WSL备忘录","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-11-30T00:00:00.000Z","category":["WSL"],"tag":["WSL"],"star":true,"sticky":true,"description":"WSL备忘录 在做计网实验时，之前用的一直都是VMware，最近偶然接触到WSL(Windows Subsystem for Linux)，在此记录基本配置过程。 基本配置 介绍视频（需要武林绝学，或者b站随便找个都行） 支持的GUI应用：https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/g...","head":[["meta",{"property":"og:url","content":"https://iXanadu13.github.io/posts/WSL%E5%A4%87%E5%BF%98%E5%BD%95.html"}],["meta",{"property":"og:site_name","content":"Xanadu13's Blog"}],["meta",{"property":"og:title","content":"WSL备忘录"}],["meta",{"property":"og:description","content":"WSL备忘录 在做计网实验时，之前用的一直都是VMware，最近偶然接触到WSL(Windows Subsystem for Linux)，在此记录基本配置过程。 基本配置 介绍视频（需要武林绝学，或者b站随便找个都行） 支持的GUI应用：https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/g..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://iXanadu13.github.io/assets/images/wsl/wsl-list.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-04T13:18:17.000Z"}],["meta",{"property":"article:tag","content":"WSL"}],["meta",{"property":"article:published_time","content":"2024-11-30T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-04T13:18:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"WSL备忘录\\",\\"image\\":[\\"https://iXanadu13.github.io/assets/images/wsl/wsl-list.png\\"],\\"datePublished\\":\\"2024-11-30T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-04T13:18:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Xanadu13\\",\\"url\\":\\"https://github.com/iXanadu13\\"}]}"]]},"headers":[{"level":2,"title":"基本配置","slug":"基本配置","link":"#基本配置","children":[]},{"level":2,"title":"迁移","slug":"迁移","link":"#迁移","children":[]},{"level":2,"title":"常用指令","slug":"常用指令","link":"#常用指令","children":[]},{"level":2,"title":"连接wsl桌面","slug":"连接wsl桌面","link":"#连接wsl桌面","children":[]},{"level":2,"title":"Ref","slug":"ref","link":"#ref","children":[]}],"git":{"createdTime":1733318297000,"updatedTime":1733318297000,"contributors":[{"name":"Xanadu13","email":"xanadu13@qq.com","commits":1}]},"readingTime":{"minutes":1.26,"words":379},"filePathRelative":"posts/WSL备忘录.md","localizedDate":"2024年11月30日","excerpt":"\\n<p>在做计网实验时，之前用的一直都是VMware，最近偶然接触到WSL(Windows Subsystem for Linux)，在此记录基本配置过程。</p>\\n<h2>基本配置</h2>\\n<ul>\\n<li>\\n<p><a href=\\"https://www.youtube.com/watch?v=PaEcQmgEz78\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">介绍视频</a>（需要武林绝学，或者b站随便找个都行）</p>\\n</li>\\n<li>\\n<p>支持的GUI应用：https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/gui-apps</p>\\n</li>\\n<li>\\n<p>取消自动挂载：https://devblogs.microsoft.com/commandline/automatically-configuring-wsl/</p>\\n</li>\\n</ul>","autoDesc":true}`);export{m as comp,y as data};
