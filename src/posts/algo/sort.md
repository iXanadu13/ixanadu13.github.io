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
typedef long long ll;
using namespace std;
constexpr int N = 1e5 + 5;
int a[N], b[N];
void merge(int l, int mid, int r){
    if (l==r) return;
    if (l+1 == r){
        if (a[l] > a[r]){
            swap(a[l], a[r]);
        }
        return;
    }
    merge(l, (l+mid)>>1, mid);
    merge(mid+1, (mid+1+r)>>1, r);
    int i = l, j = mid+1;
    for (int k = l; k <= r; ++k) {
        if (j>r || i<=mid && a[i]<=a[j]) b[k]=a[i++];
        else b[k]=a[j++];
    }
    memcpy(a+l, b+l, (r-l+1)* sizeof(int));
//    for(int k=l;k<=r;k++) a[k]=b[k];
}
int main(){
    ios::sync_with_stdio(false);
    cin.tie(0),cout.tie(0);
    int n;
    cin >> n;
    for (int i = 1; i <= n; ++i)
        cin >> a[i];
    merge(1, (1+n)>>1, n);
    for (int i = 1; i <= n; ++i)
        cout << a[i] << ' ';
    return 0;
}
```
## 快速排序
TODO
## 堆排序
TODO
## 计数排序
TODO
## 桶排序
TODO
## 基数排序
TODO