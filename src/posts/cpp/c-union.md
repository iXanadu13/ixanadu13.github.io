---
icon: pen-to-square
date: 2024-12-21
category:
  - C
tag:
  - C
---

# C语言中的union

`union`中的字段是共用内存的，比如可以用下面的代码判断机器是小端序还是大端序：

```c
#include <stdio.h>
union U
{
    char c;
    int i;
}u;

int main()
{
    u.i = 1;
    if(u.c == 1)
    {
        printf("little-endian");
    }
    else
    {
        printf("big-endian");
    }
}
```