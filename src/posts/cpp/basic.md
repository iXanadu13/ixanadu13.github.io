---
icon: pen-to-square
date: 2025-04-18
category:
  - C++
tag:
  - C++
---

# C++编码基础

## 使用cout时保留几位小数

```cpp
cout << fixed << setprecision(2) << (double) ans / n;
```

## 读入一整行，再以空格split

```cpp
vector<string> words;
string line;
getline(cin, line); // 这里是因为前面有一个换行还没读掉
for (int i = 0; i < n; ++i) {
    getline(cin, line);
    istringstream iss(line);
    string token;
    while (iss >> token) {
        words.push_back(token);
    }
}
```
## 字符串是否包含子串

### C语言中的strstr方法

```c
#include <string.h>
#include <assert.h>
int main() {
    constexpr char str1[10] = "banana";
    constexpr char str2[5] = "na";
    assert(strstr(str1, str2) - str1 == 2);
    return 0;
}
```

![](/assets/images/cpp/basic-strstr.png)

### C++中的find方法

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    string str1 = "banana";
    string str2 = "na";
    assert(str1.find(str2) == 2);
    assert(str1.find(str2, 3) == 4);
}
```

### C++中的contains方法

需要C++23

```cpp
#include <bits/stdc++.h>
using namespace std;
int main() {
    string str1 = "banana";
    string str2 = "na";
    assert(str1.contains(str2));
}
```

### KMP算法

[传送门](../algo/kmp.html)

