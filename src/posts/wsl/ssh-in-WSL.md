---
icon: pen-to-square
date: 2025-04-02
category:
  - WSL
tag:
  - WSL
---

# 通过SSH连接WSL

首先卸载WSL中自带的ssh server，然后重新安装：

```bash
# 卸载
sudo apt-get remove openssh-server
# 安装
sudo apt-get install openssh-server
```

编辑配置文件：

```bash
sudo vim /etc/ssh/sshd_config
```

```
Port 2222  # 默认的是22，但是windows有自己的ssh服务用的也是22端口，修改一下
PasswordAuthentication yes # 允许用户密码方式连接
PermitRootLogin yes # 允许 root 用户连接
```

然后重启ssh服务：

```bash
sudo service ssh --full-restart
```

在Windows中尝试使用ssh连接：

```bash
ssh root@localhost -p 2222
```

![](/assets/images/wsl/ssh-cmd.png)

或者使用其他ssh远程连接工具（FinalShell/MobaXterm）

![](/assets/images/wsl/ssh-finalshell-config.png)

![](/assets/images/wsl/ssh-finalshell.png)


