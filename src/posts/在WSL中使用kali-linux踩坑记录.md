---
icon: pen-to-square
date: 2024-11-30
category:
  - WSL
tag:
  - WSL
---

# 在WSL中使用kali-linux踩坑记录

## 安装kali-linux

```bash
wsl --install kali-linux
```

## 安装黑科技kex

```bash
sudo apt install kali-win-kex
```

## 运行kex

按照[视频](https://youtu.be/PaEcQmgEz78?t=613)里说的尝试运行`kex --esm --ip -sound`会提示找不到命令，如果直接运行`kex`，输完密码，等待大概十秒钟后，提示开启成功：

![](/assets/images/wsl/kex.png)

但是TigerVNC连接不上：

![](/assets/images/wsl/TigerVNC-pswd-failed.png)

google了好久，找到一个遇到相同问题的：
https://www.reddit.com/r/bashonubuntuonwindows/comments/icu9ks/why_winkex_does_not_working_please_help_me/?rdt=50615

但是下面的回答没有帮助。

再次搜索一番，发现了这个帖子：https://access.redhat.com/solutions/5011721

我们知道，linux里各种设备都是文件，输密码也会有一个密码文件。而在非sudo下试图登录时没有读取密码文件的权限，因此才有“Opening password file failed”。

尝试`sudo kex`之后，发现可以正常进入kali-linux桌面：

![kali-linux桌面](/assets/images/wsl/kali-linux桌面.png)

但是这里和默认用户下的桌面、各种文件夹是不互通的，而且笔者也不喜欢在root下运行wsl，因为此时你可以随意删除主机系统文件。

## 最终解决方法

1. 在主机上安装TigerVNC：[https://sourceforge.net/projects/tigervnc](https://sourceforge.net/projects/tigervnc)

2. 在kali-linux的bash中执行kex，启动win-kex server，然后直接使用TigerVNC连接wsl即可。

![](/assets/images/wsl/VNC直接连接.png)

这里的端口号(5901)填win-kex server启动后开放给你的端口。

