---
icon: pen-to-square
date: 2025-03-13
category:
  - RabbitMQ
tag:
  - WSL
---

# RabbitMQ安装踩坑记录

## Windows 安装

本来想着本地电脑上安装完RabbitMQ，也就跑跑测试，直接安装在Windows里也没啥问题，于是先安装了Erlang OTP，再安装RabbitMQ，配置完环境变量，启动rabbitmq-server时喜提报错：

```cmd
C:\Users\Xanadu13>rabbitmqctl stop
Stopping and halting node rabbit@Xanadu ...
Error: unable to perform an operation on node 'rabbit@Xanadu'. Please see diagnostics information and suggestions below.

Most common reasons for this are:

 * Target node is unreachable (e.g. due to hostname resolution, TCP connection or firewall issues)
 * CLI tool fails to authenticate with the server (e.g. due to CLI tool's Erlang cookie not matching that of the server)
 * Target node is not running

In addition to the diagnostics info below:

 * See the CLI, clustering and networking guides on https://rabbitmq.com/documentation.html to learn more
 * Consult server logs on node rabbit@Xanadu
 * If target node is configured to use long node names, don't forget to use --longnames with CLI tools

DIAGNOSTICS
===========

attempted to contact: [rabbit@Xanadu]

rabbit@Xanadu:
  * connected to epmd (port 4369) on Xanadu
  * epmd reports node 'rabbit' uses port 25672 for inter-node and CLI tool traffic
  * TCP connection succeeded but Erlang distribution failed
  * suggestion: check if the Erlang cookie is identical for all server nodes and CLI tools
  * suggestion: check if all server nodes and CLI tools use consistent hostnames when addressing each other
  * suggestion: check if inter-node connections may be configured to use TLS. If so, all nodes and CLI tools must do that
   * suggestion: see the CLI, clustering and networking guides on https://rabbitmq.com/documentation.html to learn more


Current node details:
 * node name: 'rabbitmqcli-633-rabbit@Xanadu'
 * effective user's home directory: c:/Users/Xanadu13
 * Erlang cookie hash: RLHiYW9O79itD2p1tY011A==
```

问题在于：不知为何生成了2个`.erlang.cookie`文件，一个在`C:\Windows\System32\config`路径下，一个在`C:\用户\用户名`路径下。
网上有说是因为“安装RabbitMQ时使用自定义路径”导致的，不知真假。

解决方法据说是使用后者替换前者，但是我遇到了没有权限访问System32\config的问题，索性全卸载了，重新在WSL里安装。

## WSL Ubuntu 20.04

照着[https://www.rabbitmq.com/docs/install-debian#apt-cloudsmith](https://www.rabbitmq.com/docs/install-debian#apt-cloudsmith)一步步做下来，安装一切顺利，最后启动的时候遇到问题：

```bash
$ sudo systemctl start rabbitmq-server
Job for rabbitmq-server.service failed because the control process exited with error code.
See "systemctl status rabbitmq-server.service" and "journalctl -xe" for details.
```

执行`journalctl -xe`查看日志，往上翻一翻能找到类似如下报错：

```
ubuntu ERROR: epmd error for host Xanadu: address (cannot connect to host/port)
```

解决方案：[https://serverfault.com/questions/729888/rabbitmq-server-not-starting-on-debian-jessie](https://serverfault.com/questions/729888/rabbitmq-server-not-starting-on-debian-jessie)


```bash
# 查看服务状态
sudo systemctl status rabbitmq-server
# 设置开机自启动
sudo systemctl enable rabbitmq-server
```

```bash
# 关闭rabbitmq服务
sudo systemctl stop rabbitmq-server
# 安装图形管理插件
sudo rabbitmq-plugins enable rabbitmq_management
```

之后就能在主机浏览器通过`http://localhost:15672`访问了，如果访问不了，请检查是否放行了对应端口，如果是在自己电脑上，直接关闭防火墙也行。

![](/assets/images/rabbitmq-login.png)

## 添加账号

```bash
# 添加账号
sudo rabbitmqctl add_user admin 123456
# 设置权限
sudo rabbitmqctl set_user_tags admin administrator
sudo rabbitmqctl set_permissions -p "/" admin ".*" ".*" ".*"
# 查看当前所有账号
sudo rabbitmqctl list_users
```

然后就能在浏览器中登录了：

![](/assets/images/rabbitmq-management.png)
