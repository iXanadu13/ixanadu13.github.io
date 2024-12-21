---
icon: pen-to-square
date: 2024-12-21
category:
  - C
tag:
  - C
---

# C语言中的union

## 共用内存

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

## size计算

union的大小计算遵循以下的规则：
- 联合的大小至少是最大成员的大小
- 当最大成员大小不是最大对齐数的整数倍的时候，则对齐到最大对齐数的整数倍

```c
#include<stdio.h>
union Un1
{
	  char c[5];  // 1*5B
	  int i;      // 4*1B
};
union Un2
{
	  short c[7]; // 2*7B
	  int i;      // 4*1B
};
int main()
{
	  printf("%d\n", sizeof(union Un1));  // 8
	  printf("%d\n", sizeof(union Un2));  // 16
}
```