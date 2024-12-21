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
