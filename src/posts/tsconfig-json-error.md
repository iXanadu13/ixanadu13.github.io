---
icon: pen-to-square
date: 2024-12-26
category:
  - VSCode
---

# 解决vscode报错：找不到“cookie”的类型定义文件。程序包含该文件是因为: 隐式类型库 "cookie" 的入口点ts

第一步：清理yarn缓存

```bash
yarn cache clean
```

第二步：删除node_modules文件夹和yarn.lock

第三步：重新下载依赖

```bash
yarn install
```

然后你就会发现报错已经消失辣~

