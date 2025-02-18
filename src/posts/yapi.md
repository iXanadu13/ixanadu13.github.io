---
icon: pen-to-square
date: 2025-02-18
category:
  - yapi
tag:
  - WSL
---

# Yapi安装教程

作为一个已经停止维护的项目，Yapi 安装过程中比较容易踩坑，这里记录一下安装过程。

## 相关文档

[https://hellosean1025.github.io/yapi/devops/index.html#%e5%ae%89%e8%a3%85](https://hellosean1025.github.io/yapi/devops/index.html#%e5%ae%89%e8%a3%85)

文档里提到的方式一无法成功，存在两个问题：

- 淘宝镜像源地址已由`https://registry.npm.taobao.org`变更为`https://registry.npmmirror.com`

- 可视化部署程序中，仍然尝试旧的yapi存档网站/错误淘宝镜像源地址的下载安装包，而这些网站已无法访问。

因此，只能使用方式二：命令行部署。

而Yapi不支持高版本的node，如果采用过高版本会出现一连串类似以下的报错，无法使用：

```
yapi (node:11836) Warning: Accessing non-existent property 'cat' of module exports inside circular dependency
```

而我又不希望特地为了yapi频繁使用`nvm`切换本地node版本，因此直接在WSL2 Ubuntu 20.04上安装yapi。

## 安装环境

- WSL2 Ubuntu 20.04
- nodejs 10.19.0
- npm
- MongoDB v3.6.8

### WSL2 Ubuntu 20.04

不再赘述，可以参考我的[另一篇文章](wsl/WSL-memo.html)

### nodejs && npm

```bash
apt-get install nodejs
apt-get install npm
```

### MongoDB

```bash
sudo apt install mongodb
```

MongoDB 目前是一个 systemd 服务，我们可以使用 systemctl 来检查和修改它的状态：

```bash
sudo systemctl status mongodb
sudo systemctl stop mongodb
sudo systemctl start mongodb
```

配置MongoDB用户名和密码：

```bash
mongo

# 进入 MongoDB shell 后，切换到数据库管理员
use admin
# 创建 root 用户
db.createUser({user:"admin", pwd:"admin123", roles:[{role:"root", db:"admin"}]})


# 切换到数据库 yapi
use yapi
# 创建 yapi 管理员用户
db.createUser({user:"yapiAdmin", pwd:"yapi123", roles:[{role:"dbOwner", db:"yapi"}]})

# 退出
exit

# 重新启动MongoDB并连接创建的用户
sudo service mongod restart
```

## Yapi安装

不要把Yapi安装在`/usr/bin/`目录下，否则会出现权限问题。

```bash
cd /usr/local/
mkdir yapi
cd yapi
git clone https://github.com/YMFE/yapi.git vendors //或者下载 zip 包解压到 vendors 目录（clone 整个仓库大概 140+ M，可以通过 `git clone --depth=1 https://github.com/YMFE/yapi.git vendors` 命令减少，大概 10+ M）
cp vendors/config_example.json ./config.json //复制完成后请修改相关配置
vim config.json //修改相关配置
```

```json
{
  "port": "3000",
  "adminAccount": "admin@admin.com", // 可以改成你的邮箱
  "timeout":120000,
  "db": {
    "servername": "127.0.0.1",
    "DATABASE": "yapi",
    "port": 27017,
    "user": "yapiAdmin",
    "pass": "yapi123",
    "authSource": ""
  },
  "mail": {
    "enable": true,
    "host": "smtp.163.com",
    "port": 465,
    "from": "***@163.com",
    "auth": {
      "user": "***@163.com",
      "pass": "*****"
    }
  }
}
```

保存并退出。

```bash
cd vendors
sudo npm install --production --registry https://registry.npmmirror.com
sudo npm run install-server //安装程序会初始化数据库索引和管理员账号，管理员账号名可在 config.json 配置
sudo node server/app.js //启动服务器后，请访问 127.0.0.1:{config.json配置的端口}，初次运行会有个编译的过程，请耐心等候
```

然后就可以在主机浏览器直接通过`http://localhost:3000`访问 `Yapi` 了。管理员初始账号见`config.json`文件，密码为`ymfe.org`。

## 警告

笔者直接安装在个人笔记本的WSL2中，没有考虑安全方面的问题。如安装在生产环境中，请务必做好防护措施，否则产生的损失后果自负。

## Ref
- https://hellosean1025.github.io/yapi/devops/index.html#%e5%ae%89%e8%a3%85
- https://juejin.cn/post/6953555933733584904
- https://blog.csdn.net/weixin_47679150/article/details/107918607
- https://shawchen08.github.io/2019/04/04/yapi-deploy/
- https://longdada.me/ubuntu-20-04-install-yapi/
- https://zhuanlan.zhihu.com/p/655022723
