---
icon: pen-to-square
date: 2025-02-24
category:
  - C++
tag:
  - algorithm
---

# 常见排序算法及其实现

## 排序算法总览

|排序算法|平均时间复杂度|最好|最坏|空间复杂度|稳定性|
|:---:|:---:|:---:|:---:|:---:|:---:|
|冒泡排序|O(n^2)|O(n)|O(n^2)|O(1)|稳定|
|选择排序|O(n^2)|O(n^2)|O(n^2)|O(1)|不稳定|
|插入排序|O(n^2)|O(n)|O(n^2)|O(1)|稳定|
|希尔排序|O(nlog²n)|O(nlog²n)|O(nlog²n)|O(1)|不稳定|
|归并排序|O(nlogn)|O(nlogn)|O(nlogn)|O(n)|稳定|
|快速排序|O(nlogn)|O(nlogn)|O(n^2)|O(logn)|不稳定|
|堆排序|O(nlogn)|O(nlogn)|O(nlogn)|O(1)|不稳定|
|计数排序|O(n+m)|O(n+m)|O(n+m)|O(m)|稳定|
|桶排序|O(n)|O(n)|O(n^2)|O(n)|稳定|
|基数排序|O(n·k)|O(n·k)|O(n·k)|O(n+k)|稳定|



## 冒泡排序

```cpp
#include <bits/stdc++.h>
using namespace std;
int main(){
    ios::sync_with_stdio(false);
    cin.tie(0),cout.tie(0);
    int n;
    cin >> n;
    vector<int> arr(n);
    for (auto &it : arr)
        cin >> it;
    for (int i = n-1; i > 0; --i) {
        bool sorted = true;
        for (int j = 0; j < i; ++j) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
                sorted = false;
            }
        }
        if (sorted) break;
    }
    for (auto e : arr)
        cout << e << ' ';
    return 0;
}
```

## 选择排序
TODO
## 插入排序
TODO
## 希尔排序
TODO
## 归并排序
```cpp
#include <bits/stdc++.h>
using i64 = long long;
using namespace std;
typedef pair<int, int> pii;
constexpr int N = 1e5 + 10;
vector<int> b(N);
void merge_sort(vector<int> &arr, int l, int r) {
    if (l >= r) return;
    if (l + 1 == r) {
        if (arr[l] > arr[r]) swap(arr[l], arr[r]);
        return;
    }
    int mid = (l + r) >> 1;
    merge_sort(arr, l, mid);
    merge_sort(arr, mid+1, r);
    int left = l, right = mid+1;
    for (int i = l; i <= r; ++i) {
        if (left <= mid && right <= r) {
            if (arr[left] < arr[right]) b[i] = arr[left++];
            else b[i] = arr[right++];
        } else if (left <= mid) {
            b[i] = arr[left++];
        } else {
            b[i] = arr[right++];
        }
    }
    for (int i = l; i <= r; ++i) {
        arr[i] = b[i];
    }
}
void solve(){
    int n; cin >> n;
    vector<int> arr(n);
    for (auto &e : arr)
        cin >> e;
    
    merge_sort(arr, 0, arr.size()-1);
    for (auto &e : arr)
        cout << e << ' ';
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
## 快速排序

每次取`arr[l]`为枢轴：

```cpp
#include <bits/stdc++.h>
using i64 = long long;
using namespace std;
typedef pair<int, int> pii;
constexpr int N = 1e5 + 10;
mt19937_64 rng(random_device{}());
int partition(vector<int>& arr, int l, int r) {
    int p = arr[l];
    while (l < r) {
        while (l < r && arr[r] >= p) --r;
        swap(arr[l], arr[r]);
        while (l < r && arr[l] <= p) ++l;
        swap(arr[l], arr[r]); 
    }
    return l;
}
void quick_sort(vector<int> &arr, int l, int r) {
    int mid = partition(arr, l, r);
    if (l < mid - 1) quick_sort(arr, l, mid-1);
    if (mid + 1 < r) quick_sort(arr, mid+1, r);
}
void solve(){
    int n; cin >> n;
    vector<int> arr(n);
    for (auto &e : arr)
        cin >> e;
    
    quick_sort(arr, 0, arr.size() - 1);
    for (auto &e : arr)
        cout << e << ' ';
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

随机挑选枢轴：

```cpp
#include <bits/stdc++.h>
using i64 = long long;
using namespace std;
typedef pair<int, int> pii;
constexpr int N = 1e5 + 10;
mt19937_64 rng(random_device{}());
int partition(vector<int> &arr, int l, int r) {
    int mid = l + rng() % (r-l+1);
    int p = arr[mid];
    swap(arr[l], arr[mid]);
    while (l < r){
        while (l < r && arr[r] >= p) --r;
        swap(arr[l], arr[r]);
        while (l < r && arr[l] <= p) ++l;
        swap(arr[l], arr[r]);
    }
    assert(l == r);
    return l;
}
void quick_sort(vector<int> &arr, int l, int r) {
    int mid = partition(arr, l, r);
    if (l < mid - 1) quick_sort(arr, l, mid-1);
    if (mid + 1 < r) quick_sort(arr, mid+1, r);
}
void solve(){
    int n; cin >> n;
    vector<int> arr(n);
    for (auto &e : arr)
        cin >> e;
    
    quick_sort(arr, 0, arr.size() - 1);
    for (auto &e : arr)
        cout << e << ' ';
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

## 堆排序
```cpp
#include <bits/stdc++.h>
using i64 = long long;
using namespace std;
typedef pair<int, int> pii;
constexpr int N = 1e5 + 10;
mt19937_64 rng(random_device{}());
/// 堆的长度为 n, 从节点 i 开始,从顶至底堆化
void siftdown(vector<int> &arr, int n, int i) {
    while (true) {
        int l = i * 2 + 1;
        int r = i * 2 + 2;
        int mx = i;
        if (l < n && arr[l] > arr[mx]) mx = l;
        if (r < n && arr[r] > arr[mx]) mx = r;
        if (mx == i) break;
        swap(arr[mx], arr[i]);
        i = mx;
    }
}
void heap_sort(vector<int> &arr) {
    int n = arr.size();
    for (int i = n/2-1; i >= 0; --i)
        siftdown(arr, n, i);
    for (int i = n-1; i >= 1; --i) {
        swap(arr[0], arr[i]);
        siftdown(arr, i, 0);
    }
}
void solve(){
    int n; cin >> n;
    vector<int> arr(n);
    for (auto &e : arr)
        cin >> e;
    
    heap_sort(arr);
    for (auto &e : arr)
        cout << e << ' ';
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
## 计数排序
TODO
## 桶排序
TODO
## 基数排序
TODO