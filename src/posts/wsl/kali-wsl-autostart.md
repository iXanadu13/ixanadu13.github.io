---
icon: pen-to-square
date: 2024-11-28
category:
  - WSL
tag:
  - WSL
  - Armoury Crate
---

# kali-linux wsl自启动问题

开始使用wsl后，有一次偶然发现kali-linux会自启动，长期处于Running状态。（运行`wsl --list -v`查看wsl状态）

一开始google搜索“关闭kali-linux自启动”相关内容，粗略浏览后都不符合我的情况，因为正常情况下未特殊配置wsl的话，kali-linux是不会自启动的。

后面偶然找到了这篇文章：

[https://superuser.com/questions/1746617/wsl2-kali-wont-stop-and-it-always-starts-on-boot/1746987#1746987](https://superuser.com/questions/1746617/wsl2-kali-wont-stop-and-it-always-starts-on-boot/1746987#1746987)

照着做就能发现，是Armoury Crate一直在后台扫盘，意外扫到wsl文件导致kali-linux自启动。

使用G-Helper替代Armoury Crate后，问题成功解决。（卸载还挺麻烦，得先去官网下专用卸载工具，卸载完后重启并进入BIOS，关闭自动开启Armoury Crate的选项，然后再重启）

卸载之后没想到还有意外收获，之前我的笔记本一般用不了一上午，到上午第五节课基本就没电了，现在续航显示来到了恐怖的8小时：

![](/assets/images/wsl/续航.png)

图中我已经用了3个半小时，估计实际续航在6-7小时左右。

最后，放一张当天的浏览记录，不多作评价了。

![](/assets/images/wsl/ArmouryCrate.png)

