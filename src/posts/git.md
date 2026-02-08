---
icon: pen-to-square
date: 2024-12-05
category:
  - Git
tag:
  - Git
---

# 记录有关Git的命令

## Git Merge Failed

试图合并分支时，有时候会遇到这样的报错：
Git Merge Failed
fatal: You have not concluded your merge (MERGE_HEAD exists).

有2种选择：
- 输入`git commit -m "commit info"`合并分支。
- 放弃本地分支，直接覆盖：

```bash
git reset --hard
git pull
```

## 强制回退commit并删除历史记录

```bash
git reset --hard commit_id
git push -f
```

::: danger

危险的操作！注意这会永远丢失当前工作区未保存的提交、被你强制回退的提交。

如果需要保留历史，请使用git revert

:::

## 比较2个分支

```bash
git diff branch_old branch_new --stat
```

## 更新子模块信息

如果直接修改.gitmodules文件，子模块路径的修改是无效的，例如尝试在已不再属于子模块的路径中使用`git add`，命令依旧会失败。

正确的更新方式如下：

### 1. 删除旧的子模块信息

::: danger
注意`git rm`命令会删除路径下所有文件和文件夹，请先做好备份
:::

```bash
git submodule deinit -f decompilation-test/test-data
git rm -f decompilation-test/test-data
```

### 2. 添加新模块信息

```bash
git submodule add \
  https://github.com/leibnitz27/cfr_tests.git \
  decompilation-test/test-data/precompiled_tests
```
