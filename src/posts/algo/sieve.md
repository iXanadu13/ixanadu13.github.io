---
icon: pen-to-square
date: 2024-11-19
category:
  - C++
tag:
  - algorithm
  - luogu
star: true
---

# 素数筛

题目传送门：[洛谷3383]

题意：给定一个范围 $n$ ，有 $q$ 个询问，每次输出第 $k$ 小的素数。

## Solution 1: 埃氏筛

时间复杂度[^注1]：$O( n·loglog \sqrt{n} )$

[^注1]: 只考虑筛的过程，如果要取出素数还需$O(n)$

注意，这里的`g[x] == 1`表示确定x不是素数

```cpp
#include <iostream>
#include <vector>
typedef long long ll;
using namespace std;
const int N = 1e8 + 5;
bool g[N];
int main(){
    ios::sync_with_stdio(false);
    cin.tie(0),cout.tie(0);
    g[0] = 1; g[1] = 1;
    for(int i = 2; i < 10000; ++i){
        if (g[i]) continue;
        for (int j = i * i; j<N; j+=i) {
            g[j] = true;
        }
    }
    int n,q,cnt = 0;
    cin >> n >> q;
    vector<int> prime(n+2);
    for (int i = 2; i <= n; ++i) {
        if (!g[i]) prime[++cnt] = i;
    }
    while (q--){
        int x;
        cin>>x;
        cout << prime[x] << '\n';
    }
    return 0;
}
```

测评用时：1.44s [submit 1]

## Solution 2: 线性筛（欧拉筛）

线性筛避免了对一个合数重复标记，达到了线性时间复杂度

时间复杂度：$O(n)$

```cpp
#include <iostream>
#include <vector>
typedef long long ll;
using namespace std;
const int N = 1e8 + 5;
int main(){
    ios::sync_with_stdio(false);
    cin.tie(0),cout.tie(0);
    int n,q;
    cin >> n >> q;
    vector<bool> g(N);
    vector<int> prime;
    for (int i = 2; i <= n; ++i) {
        if (!g[i]){
            prime.push_back(i);
        }
        for (int pri_j : prime) {
            int mul = i * pri_j;
            if (mul > n) break;
            g[mul] = true;
            if (i % pri_j == 0){
                break;
            }
        }
    }
    while (q--){
        int x;
        cin>>x;
        cout << prime[x-1] << '\n';
    }
    return 0;
}
```

测评用时：0.75s [submit 2]

## Solution 3: 埃氏筛+bitset

由于`bitset`、`vector<bool>`存在常数优化，埃氏筛+bitset的效率可以接近线性筛

```cpp
#include <iostream>
#include <vector>
#include <bitset>
typedef long long ll;
using namespace std;
const int N = 1e8 + 5;
int main(){
    ios::sync_with_stdio(false);
    cin.tie(0),cout.tie(0);
    bitset<N> g;
    g[0] = 1; g[1] = 1;
    for(int i = 2; i < 10000; ++i){
        if (g[i]) continue;
        for (int j = i * i; j<N; j+=i) {
            g[j] = true;
        }
    }
    int n,q,cnt = 0;
    cin >> n >> q;
    vector<int> prime(n+2);
    for (int i = 2; i <= n; ++i) {
        if (!g[i]) prime[++cnt] = i;
    }
    while (q--){
        int x;
        cin>>x;
        cout << prime[x] << '\n';
    }
    return 0;
}
```

测评用时：0.82s [submit 3]


[洛谷3383]: https://www.luogu.com.cn/problem/P3383
[submit 1]: https://www.luogu.com.cn/record/189758019
[submit 2]: https://www.luogu.com.cn/record/192884339
[submit 3]: https://www.luogu.com.cn/record/192884837
