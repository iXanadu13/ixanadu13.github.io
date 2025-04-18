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

::: warning

危险的操作！注意这会永远丢失当前工作区未保存的提交、被你强制回退的提交。

如果需要保留历史，请使用git revert

:::

## 比较2个分支

```bash
git diff branch_old branch_new --stat
```
