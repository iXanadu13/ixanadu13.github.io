---
icon: pen-to-square
date: 2025-04-21
category:
  - hdoj
  - C++
tag:
  - algorithm
  - sort
---

# HDOJ-3743 Frosh Week

题目传送门：[http://acm.hdu.edu.cn/showproblem.php?pid=3743](http://acm.hdu.edu.cn/showproblem.php?pid=3743)

## 题目大意

$N$个学生需要按照某种指标排序，每次只能交换相邻的两个学生，求最小交换次数。

## Solution

归并排序统计逆序对，经典问题：

```cpp
#include <bits/stdc++.h>
using i64 = long long;
using namespace std;
typedef pair<int, int> pii;
constexpr int N = 1e5 + 5;
i64 merge_sort(vector<int> &a) {
    i64 cnt = 0;
    vector<int> b(a.size());
    auto merge0 = [&](auto self, int l, int r) -> void {
        if (l >= r) return;
        if (l + 1 == r) {
            if (a[l] > a[r]) {
                swap(a[l], a[r]);
                ++cnt;
            }
            return;
        }
        int mid = (l + r) >> 1;
        self(self, l, mid);
        self(self, mid+1, r);
        int left = l, right = mid + 1;
        for (int i = l; i <= r; ++i) {
            if (left <= mid && right <= r) {
                if (a[left] < a[right]) b[i] = a[left++];
                else {
                    b[i] = a[right++];
                    cnt += (mid+1-left);
                }
            } else if (left > mid){
                b[i] = a[right++];
            } else {
                b[i] = a[left++];
            }
        }
        for (int i = l; i <= r; ++i)
            a[i] = b[i];
    };
    merge0(merge0, 0, a.size()-1);
    return cnt;
}
void solve() {
    int n; 
    while (cin >> n) {
        vector<int> arr(n);
        for (auto &e : arr)
            cin >> e;
        cout << merge_sort(arr) << '\n';
    }
}
int main()
{
#ifndef ONLINE_JUDGE
    freopen("data.in", "r", stdin);
    freopen("data.out", "w", stdout);
#endif
    ios::sync_with_stdio(false);
    cin.tie(0); cout.tie(0);
    solve();
    return 0;
}
```

![](/assets/images/hdoj/3743.png)