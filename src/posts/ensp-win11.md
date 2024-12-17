---
icon: pen-to-square
date: 2024-12-09
category:
  - eNSP
tag:
  - eNSP
  - win11
  - VirtualBox
---

# 解决在windows 11中无法使用eNSP的问题

## 前置

- eNSP 1.3.00.100 Setup.exe
- VirtualBox-5.2.44-139111-Win.exe
- WinPcap_4_1_3.exe

首先，你必须下载好这些软件，复制这些文件名自行google都不难下载到。（PS：基本上都是百度网盘链接，没会员的话估计要等一会儿）

至于版本，不需要和我这里完全相同，以具体你搜到的教程为准。但是VirtualBox版本必须是5.x开头的，那些新版的7.x的肯定不行，如果你已经通过VirtualBox 7.x安装了虚拟机，那么很遗憾你必须在VirtualBox 7.x和eNSP之间做出取舍了。

安装顺序看搜到的教程即可，不再赘述。

## 解决AR启动40错误

当你满心欢喜地安装完eNSP，可能还顺便完成了计算机网络的HTTP、ARP实验，似乎一切正常。但如果你尝试启动一个AR路由器，你就会收到一个编号为40的启动错误。（其实启动FW设备也会这样，笔者也是在做NAT实验时发现，无论如何都绕不开AR路由器...）

首先，请根据跳出的帮助，一步步照着完成，如果确认已经全部完成，但还是无法启动AR设备，而且你电脑还是Win11的话，那请接着看下去：

首先，以管理员身份运行cmd，输入`bcdedit`：

![](/assets/images/ensp/bcdedit.png)

确认这里的`hypervisorlaunchtype`项的值为`Off`，如果不为Off，运行`bcdedit /set hypervisorlaunchtype off`即可。

注意：执行完这条指令后必须重启计算机才能生效。 **（不能关机再开机，必须选择重新启动）**

如果你和我一样是Windows 11 家庭版，可能还需要继续看下去：

在cmd中输入regedit打开注册表编辑器，编辑->查找->输入CachedDrtmAuthIndex，不出意外的话能跳到类似于`计算机\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\DeviceGuard`的路径，然后把这里的两个项或者三个项的值均修改为0，再重启电脑。（我的三项初始值分别为0,1,1）

![](/assets/images/ensp/regedit.png)

重启完成后，就能愉快地使用AR路由器了~
