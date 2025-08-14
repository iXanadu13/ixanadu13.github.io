---
icon: pen-to-square
date: 2025-08-14
category:
  - C++
tag:
  - C++
---

# 最长递增子序列

## n^2 dp

<details>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
typedef pair<int, int> pii;
mt19937_64 rng(random_device{}());
void solve() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (auto &e : arr)
        cin >> e;
    vector<int> dp(n, 1);
    int ans = 1;
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] >= arr[i]) {
                dp[j] = max(dp[j], dp[i] + 1);
                ans = max(ans, dp[j]);
            }
        }
    }
    cout << ans << '\n';
}
int main()
{
#ifdef LOCAL
    freopen("data.in", "r", stdin);
    freopen("data.out", "w", stdout);
#endif
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    solve();
    return 0;
}
```

</details>

## 二分查找优化

时间复杂度：O(nlogn)

<details>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
typedef pair<int, int> pii;
mt19937_64 rng(random_device{}());
void solve() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (auto &e : arr)
        cin >> e;
    vector<int> q;
    for (int i = 0; i < n; ++i) {
        auto p = lower_bound(q.begin(), q.end(), arr[i]);
        if (p == q.end()) {
            q.push_back(arr[i]);
        } else {
            *p = arr[i];
        }
    }
    cout << q.size() << '\n';
}
int main()
{
#ifdef LOCAL
    freopen("data.in", "r", stdin);
    freopen("data.out", "w", stdout);
#endif
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    solve();
    return 0;
}
```

</details>

## 打印任意一条LIS序列

<details>

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
typedef pair<int, int> pii;
mt19937_64 rng(random_device{}());
void solve()
{
    int n;
    cin >> n;
    vector<int> arr(n);
    for (auto &e : arr)
        cin >> e;
    vector<int> val;
    map<int, set<int>> mx;
    for (auto it : arr) {
        auto p = upper_bound(val.begin(), val.end(), it);
        if (p == val.end()) {
            val.push_back(it);
            mx[val.size() - 1].insert(it);
        }
        else {
            *p = it;
            mx[p - val.begin()].insert(it);
        }
    }
    vector<int> res;
    res.push_back(val.back());
    for (int i = n - 1; i >= 0; i--) {
        auto w = mx[i].upper_bound(res.back());
        if (w == mx[i].begin()) continue;
        w = prev(w);
        res.push_back(*w);
    }
    reverse(res.begin(), res.end());
    res.pop_back();
    for (auto it : res)
        cout << it << ' ';
    cout << '\n';
}
int main()
{
#ifdef LOCAL
    freopen("data.in", "r", stdin);
    freopen("data.out", "w", stdout);
#endif
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    solve();
    return 0;
}
```

</details>

## 相关题目

- [LC 300](https://leetcode.cn/problems/longest-increasing-subsequence/description/)
