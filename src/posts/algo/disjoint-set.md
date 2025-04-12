---
icon: pen-to-square
date: 2023-10-17
category:
  - C++
tag:
  - algorithm
---

# 并查集

题目传送门：[http://acm.hdu.edu.cn/showproblem.php?pid=1213](http://acm.hdu.edu.cn/showproblem.php?pid=1213)

```cpp
#include <bits/stdc++.h>
using namespace std;
int fa[1005];
int find(int x1){
    if(fa[x1]!=x1) fa[x1]=find(fa[x1]);
    return fa[x1];
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(0),cout.tie(0);
    int t,n,m,x,y;
    cin>>t;
    while (t--){
        cin>>n>>m;
        iota(fa+1, fa+n+1, 1);
        while (m--){
            cin>>x>>y;
            fa[find(x)]=find(y);
        }
        int cnt=0;
        for(int i=1;i<=n;i++){
            if(fa[i]==i) cnt++;
        }
        cout<<cnt<<'\n';
    }
    return 0;
}

```
