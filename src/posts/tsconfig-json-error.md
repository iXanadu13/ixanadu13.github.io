---
icon: pen-to-square
date: 2024-12-26
category:
  - VSCode
---

# 记录前端开发过程中遇到的一些环境配置问题

## 解决vscode报错：找不到“cookie”的类型定义文件。程序包含该文件是因为: 隐式类型库 "cookie" 的入口点ts

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

## VSCode TS报错：找不到div

照着StackoverFlow上的[帖子](https://stackoverflow.com/questions/64974648/problem-with-visual-studio-code-using-react-jsx-as-jsx-value-with-create-react/64976666#64976666)，暂时解决了这个问题。

解决方法：[https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)

