---
# cover: /assets/images/cover2.jpg
icon: pen-to-square
date: 2024-11-30
category:
  - WSL
tag:
  - WSL
---

# WSL备忘录

在做计网实验时，之前用的一直都是VMware，最近偶然接触到WSL(Windows Subsystem for Linux)，在此记录基本配置过程。

## 基本配置

- [介绍视频]（需要武林绝学，或者b站随便找个都行）

- 支持的GUI应用：https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/gui-apps

- 取消自动挂载：https://devblogs.microsoft.com/commandline/automatically-configuring-wsl/

## 迁移

> wsl默认安装在C盘，建议趁刚安装时迁移到容量充足的其他盘

1. 查看当前安装的所有WSL

```bash
wsl --list -v
```

![](/assets/images/wsl/wsl-list.png)

左边的*表示默认项

2. 先导出WSL到指定路径

```bash
wsl --export Ubuntu-20.04 E:\wsl\Ubuntu-20.04.tar
```

3. 删除你要导出的wsl

```bash
wsl --unregister Ubuntu-20.04
```

4. 从第2步中导出的tar文件导入wsl，这里指定了version为2

+ 格式：wsl --import <WSL名称> <导入后wsl工作路径> <wsl压缩包路径>

```bash
wsl --import Ubuntu-20.04 E:\wsl\ubuntu-20.04 E:\wsl\Ubuntu-20.04.tar --version 2
```

5. 配置先前的默认登录用户

+ 格式：\<EXE> config --default-user <用户名>

```bash
ubuntu2004.exe config --default-user xanadu13
```

如果是kali-linux：

```bash
kali.exe config --default-user xanadu13
```

## 常用指令

软链接挂载文件夹：

```bash
ln -s /mnt/e/wsl/share ~/share
```

运行指定wsl：

```bash
wsl -d kali-linux
```

## 连接wsl桌面

目前已知kali-linux wsl可以通过类似远程桌面的方式连接，具体见我的[另一篇文章]：

## 在VSCode中连接WSL，写入权限问题

使用以下指令修改目录的所有权即可，注意把`<username>`替换为你的用户名：

```bash
sudo chown -R <username> /dir
```

例如，

```bash
sudo chown -R xanadu13 /usr/local/os
```

## Ref

- https://www.jianshu.com/p/2a2d16029dc2


[介绍视频]: https://www.youtube.com/watch?v=PaEcQmgEz78
[另一篇文章]: kali-linux-in-WSL.html