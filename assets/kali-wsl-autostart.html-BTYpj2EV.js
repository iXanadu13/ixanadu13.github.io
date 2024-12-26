import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,d as s,o as i}from"./app-BMsVCMnT.js";const l="/assets/images/wsl/%E7%BB%AD%E8%88%AA.png",o="/assets/images/wsl/ArmouryCrate.png",n={};function r(p,t){return i(),e("div",null,t[0]||(t[0]=[s('<h1 id="kali-linux-wsl自启动问题" tabindex="-1"><a class="header-anchor" href="#kali-linux-wsl自启动问题"><span>kali-linux wsl自启动问题</span></a></h1><p>开始使用wsl后，有一次偶然发现kali-linux会自启动，长期处于Running状态。（运行<code>wsl --list -v</code>查看wsl状态）</p><p>一开始google搜索“关闭kali-linux自启动”相关内容，粗略浏览后都不符合我的情况，因为正常情况下未特殊配置wsl的话，kali-linux是不会自启动的。</p><p>后面偶然找到了这篇文章：</p><p><a href="https://superuser.com/questions/1746617/wsl2-kali-wont-stop-and-it-always-starts-on-boot/1746987#1746987" target="_blank" rel="noopener noreferrer">https://superuser.com/questions/1746617/wsl2-kali-wont-stop-and-it-always-starts-on-boot/1746987#1746987</a></p><p>照着做就能发现，是Armoury Crate一直在后台扫盘，意外扫到wsl文件导致kali-linux自启动。</p><p>使用G-Helper替代Armoury Crate后，问题成功解决。（卸载还挺麻烦，得先去官网下专用卸载工具，卸载完后重启并进入BIOS，关闭自动开启Armoury Crate的选项，然后再重启）</p><p>卸载之后没想到还有意外收获，之前我的笔记本一般用不了一上午，到上午第五节课基本就没电了，现在续航显示来到了恐怖的8小时：</p><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图中我已经用了3个半小时，估计实际续航在6-7小时左右。</p><p>最后，放一张当天的浏览记录，不多作评价了。</p><figure><img src="'+o+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',12)]))}const m=a(n,[["render",r],["__file","kali-wsl-autostart.html.vue"]]),g=JSON.parse(`{"path":"/posts/wsl/kali-wsl-autostart.html","title":"kali-linux wsl自启动问题","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-11-28T00:00:00.000Z","category":["WSL"],"tag":["WSL","Armoury Crate"],"description":"kali-linux wsl自启动问题 开始使用wsl后，有一次偶然发现kali-linux会自启动，长期处于Running状态。（运行wsl --list -v查看wsl状态） 一开始google搜索“关闭kali-linux自启动”相关内容，粗略浏览后都不符合我的情况，因为正常情况下未特殊配置wsl的话，kali-linux是不会自启动的。 后面偶...","head":[["meta",{"property":"og:url","content":"https://iXanadu13.github.io/posts/wsl/kali-wsl-autostart.html"}],["meta",{"property":"og:site_name","content":"Xanadu13's Blog"}],["meta",{"property":"og:title","content":"kali-linux wsl自启动问题"}],["meta",{"property":"og:description","content":"kali-linux wsl自启动问题 开始使用wsl后，有一次偶然发现kali-linux会自启动，长期处于Running状态。（运行wsl --list -v查看wsl状态） 一开始google搜索“关闭kali-linux自启动”相关内容，粗略浏览后都不符合我的情况，因为正常情况下未特殊配置wsl的话，kali-linux是不会自启动的。 后面偶..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://iXanadu13.github.io/assets/images/wsl/续航.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-26T03:46:14.000Z"}],["meta",{"property":"article:tag","content":"WSL"}],["meta",{"property":"article:tag","content":"Armoury Crate"}],["meta",{"property":"article:published_time","content":"2024-11-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-26T03:46:14.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"kali-linux wsl自启动问题\\",\\"image\\":[\\"https://iXanadu13.github.io/assets/images/wsl/续航.png\\",\\"https://iXanadu13.github.io/assets/images/wsl/ArmouryCrate.png\\"],\\"datePublished\\":\\"2024-11-28T00:00:00.000Z\\",\\"dateModified\\":\\"2024-12-26T03:46:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Xanadu13\\",\\"url\\":\\"https://github.com/iXanadu13\\"}]}"]]},"headers":[],"git":{"createdTime":1735184774000,"updatedTime":1735184774000,"contributors":[{"name":"Xanadu13","email":"xanadu13@qq.com","commits":1}]},"readingTime":{"minutes":1.14,"words":341},"filePathRelative":"posts/wsl/kali-wsl-autostart.md","localizedDate":"2024年11月28日","excerpt":"\\n<p>开始使用wsl后，有一次偶然发现kali-linux会自启动，长期处于Running状态。（运行<code>wsl --list -v</code>查看wsl状态）</p>\\n<p>一开始google搜索“关闭kali-linux自启动”相关内容，粗略浏览后都不符合我的情况，因为正常情况下未特殊配置wsl的话，kali-linux是不会自启动的。</p>\\n<p>后面偶然找到了这篇文章：</p>\\n<p><a href=\\"https://superuser.com/questions/1746617/wsl2-kali-wont-stop-and-it-always-starts-on-boot/1746987#1746987\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://superuser.com/questions/1746617/wsl2-kali-wont-stop-and-it-always-starts-on-boot/1746987#1746987</a></p>","autoDesc":true}`);export{m as comp,g as data};
