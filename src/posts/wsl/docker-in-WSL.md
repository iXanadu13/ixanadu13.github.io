---
icon: pen-to-square
date: 2024-12-05
category:
  - WSL
tag:
  - WSL
---

# 在WSL中使用Docker

今天尝试在WSL中使用Docker，运行

```bash
docker run hello-world
```

获得报错：

```bash
Get https://registry-1.docker.io/v2/: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaitin headers)
```

![](/assets/images/wsl/wsl-docker-run-helloworld-fail.png)

尝试了很多解决方案，比如更改docker镜像源、修改/etc/docker/daemon.json、配置/etc/resolv.conf中的nameserver为8.8.8.8、在前面加sudo等等，都没有成功。

最终解决方案：

在`/etc/systemd/system/docker.service.d/proxy.conf`添加

```
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890/"
Environment="HTTPS_PROXY=http://127.0.0.1:7890/"
Environment="NO_PROXY=localhost,127.0.0.1"
```

其中127.0.0.1和7890分别为你的武林绝学的代理服务器默认地址、默认端口。

然后重启服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

再执行`docker run hello-world`，顺利成功！

![](/assets/images/wsl/wsl-docker-run-helloworld.png)

