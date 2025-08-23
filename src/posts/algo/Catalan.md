---
icon: pen-to-square
date: 2025-08-23
category:
  - C++
tag:
  - algorithm
  - luogu
  - 卡特兰数
---

# 卡特兰数

## 出栈序列数量

[洛谷 P1044](https://www.luogu.com.cn/problem/P1044)

### 思路

对于一个指定的序列，我们能做入栈、出栈两种操作。

记$f(x,y)$表示当前序列有$x$个未入栈的数，栈中当前有$y$个数。

入栈操作即$f(x,y) \rightarrow f(x-1, y+1)$；

出栈操作即$f(x,y) \rightarrow f(x, y-1)$；

边界条件：$f(0, i) = 1$

所求答案为$f(n,0)$

### 代码

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1e5 + 5;
using i64 = long long;
mt19937_64 rng(random_device{}());
void solve() {
    vector<vector<i64>> dp(20, vector<i64>(20));
    int n;
    cin >> n;
    for (int i = 0; i <= n; ++i) {
        for (int j = 0; j <= n; ++j) {
            if (i == 0) dp[i][j] = 1; // 只能连续pop
            else if (j == 0) dp[i][j] = dp[i-1][j+1]; // 只能入栈
            else dp[i][j] = dp[i-1][j+1] + dp[i][j-1];
        }
    }
    cout << dp[n][0];
}
int main() {
#ifdef LOCAL
    freopen("data.in", "r", stdin);
    freopen("data.out", "w", stdout);
#endif
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    // int T;
    // cin >> T;
    // while (T--) 
        solve();
    return 0;
}
```

## Ref

- https://oi-wiki.org/math/combinatorics/catalan/