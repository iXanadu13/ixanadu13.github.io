---
icon: pen-to-square
date: 2024-12-07
category:
  - 虚拟机
tag:
  - vmware
---

# 在VMware中安装MacOS虚拟机

**写在前面：如果宿主机是AMD的cpu，不需要再尝试了，直接放弃就行**

## 下载iso镜像文件

[](https://archive.org/download/macos_iso)


我下载的是这个：

![](/assets/images/虚拟机/macos-iso.png)

## 下载VMware

这个不多说，网上找个就行，我的是VMware Workstation 17 Pro

## 使用macOS Unlocker

[](https://github.com/BDisp/unlocker)

直接把仓库git clone或者下载下来即可，接着找到需要的win-install.cmd，右键以管理员身份运行。

**注意运行之前先把VMware关了，不然会遇到Permission Denied。**

如果忘关了，关闭VMware之后重新运行即可。

## 创建虚拟机

1. 打开VMware Workstation，右键新建虚拟机

![](/assets/images/虚拟机/新建虚拟机.png)

2. 选择自定义安装

![](/assets/images/虚拟机/step2.png)

3. 硬件兼容性

这里我使用了默认设置

![](/assets/images/虚拟机/step3.png)

4. 选择稍后安装映像文件

![](/assets/images/虚拟机/step4.png)

5. 选择操作系统类型

![](/assets/images/虚拟机/step5.png)

6. 设置虚拟机存放位置

![](/assets/images/虚拟机/step6.png)

7. 设置处理器数量

我设置的是1个处理器和4个内核，可视情况调整

![](/assets/images/虚拟机/step7.png)

8. 虚拟机内存

我使用的是默认值4096MB

![](/assets/images/虚拟机/step8.png)

9. 网络类型设置

这里选择NAT或者桥接都行

![](/assets/images/虚拟机/step9.png)

10. I/O控制器类型

使用默认值

![](/assets/images/虚拟机/step10.png)

11. 磁盘类型

使用默认值

![](/assets/images/虚拟机/step11-1.png)

![](/assets/images/虚拟机/step11-2.png)

12. 磁盘容量设置

![](/assets/images/虚拟机/step12.png)

13. 虚拟磁盘存放位置

![](/assets/images/虚拟机/step13.png)

至此，虚拟机创建完成

![](/assets/images/虚拟机/创建完毕.png)

14. 把下载好的iso镜像文件挂载到虚拟机

右键你创建好的虚拟机，点击“设置”：

![](/assets/images/虚拟机/step14.png)

15. 修改.vmx文件

找到存放vm的路径：

![](/assets/images/虚拟机/step15.png)

使用记事本打开该文件，在最下面新开一行，加入以下内容：

```toml
smc.version = "0"
```

![](/assets/images/虚拟机/修改smc.version.png)

## mac虚拟机，启动！

打开后会看到一个苹果图案，以及进度条。进度条走完之后就能进入以下页面：

![](/assets/images/虚拟机/虚拟机启动.png)

选择“简体中文”。

![](/assets/images/虚拟机/磁盘工具.png)

![](/assets/images/虚拟机/清空磁盘.png)

![](/assets/images/虚拟机/清空磁盘2.png)

接下来安装系统：

![](/assets/images/虚拟机/安装系统.png)

![](/assets/images/虚拟机/安装系统-继续.png)

![](/assets/images/虚拟机/安装系统-选择磁盘.png)

等待安装完成：

![](/assets/images/虚拟机/安装系统-waiting.png)


## Ref

- [](https://hackmd.io/@enoladne/BJjgo8R6F)
