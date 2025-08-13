---
icon: pen-to-square
date: 2025-08-13
category:
  - C++
tag:
  - C++
  - KMP
---

# KMP算法

[https://oi-wiki.org/string/kmp/](https://oi-wiki.org/string/kmp/)

```cpp
vector<int> pre(string &s) {
    int n = s.size();
    vector<int> pi(n);
    for (int i = 1; i < n; ++i) {
        int j = pi[i-1];
        while (j && s[i] != s[j]) j = pi[j-1];
        if (s[i] == s[j]) ++j;
        pi[i] = j;
    }
    return pi;
}
int kmp(string &str1, string &str2) {
    string str = str2 + '#' + str1;
    vector<int> pi = pre(str);
    int n = str2.size();
    for (size_t i = str2.size() + 1; i < str.size(); ++i) {
        if (pi[i] == n) return i - 2 * n;
    }
    return -1;
}
void solve() {
    string str1 = "banana";
    string str2 = "na";
    assert(kmp(str1, str2) == 2);
}
```

## 相关题目

- [洛谷P3375](https://www.luogu.com.cn/problem/P3375)
- [LC 3036](https://leetcode.cn/problems/number-of-subarrays-that-match-a-pattern-ii/description/)

