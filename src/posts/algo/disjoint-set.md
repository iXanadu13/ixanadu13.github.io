---
icon: pen-to-square
date: 2025-04-12
category:
  - C++
tag:
  - algorithm
  - 并查集
---

# 并查集

- [HDOJ-1213 How Many Tables](http://acm.hdu.edu.cn/showproblem.php?pid=1213)

<details>

[Solution](../hdoj/1213-disjoint-set.html)

</details>

- [Leetcode 1631.最小体力消耗路径](https://leetcode.cn/problems/path-with-minimum-effort/)

<details>

```cpp
class DSet {
public:
    vector<int> fa;
    int n;
    int set_cnt; // 当前联通分量数
    DSet(int _n): n(_n), set_cnt(_n), fa(_n) {
        iota(fa.begin(), fa.end(), 0);
    }
    int find(int x) {
        if (x != fa[x]) fa[x] = find(fa[x]);
        return fa[x];
    }
    bool unite(int x, int y) {
        x = find(x), y = find(y);
        if (x == y) return false;
        fa[x] = y;
        --set_cnt;
        return true;
    }
};

struct edge {
    int x, y, len;
};
class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        vector<edge> edges;
        int n = heights.size(), m = heights[0].size();
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                int id = i * m + j;
                if (i) {
                    int len = abs(heights[i][j] - heights[i-1][j]);
                    edges.push_back({id, (i-1)*m+j, len});
                }
                if (j) {
                    int len = abs(heights[i][j] - heights[i][j-1]);
                    edges.push_back({id, i*m+j-1, len});
                }
            }
        }
        // 按照边长升序排序
        sort(edges.begin(), edges.end(), [&](const edge& e1, const edge& e2) {
            return e1.len < e2.len;
        });
        DSet dst(n*m);
        int ans = 0;
        int st = 0, ed = n * m - 1;
        // 如果加上某一条边之后st和ed联通了，这条边的边长即为答案
        for (auto&& e : edges) {
            dst.unite(e.x, e.y);
            if (dst.find(st) == dst.find(ed)) return e.len;
        }
        return ans;
    }
};
```

</details>