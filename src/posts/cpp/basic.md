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

