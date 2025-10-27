---
icon: pen-to-square
date: 2025-10-27
category:
  - WSL
tag:
  - WSL
---

# 安装CentOS for WSL

安装教程参考：[https://www.lanmper.cn/redis/t9367](https://www.lanmper.cn/redis/t9367)

本帖主要记录安装完之后遇到的一个问题：

![](/assets/images/wsl/Curl-error35.png)

依次执行以下命令即可：

```bash
sudo update-crypto-policies --set DEFAULT
sudo dnf clean all
sudo dnf update
```

