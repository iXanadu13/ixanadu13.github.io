---
icon: pen-to-square
date: 2025-08-29
category:
  - C++
tag:
  - codeforces
  - dp
---

# Codeforces Round 1044 (Div. 2 A-D)

## [A. Redstone?](https://codeforces.com/contest/2133/problem/A)

题目大意：n个齿轮从左到右耦合在一起，数组a表示每个齿轮的齿数。最左边的齿轮依次带动其他齿轮旋转，相邻齿轮旋转速度与齿数成反比。问是否存在一种排列，使得最右边的齿轮旋转速率和最左边的相等。

思路：最右侧齿轮转速为$ 1 \times \frac{a_1}{a_2} \times \frac{a_2}{a_3} \times ... \times \frac{a_{n-1}}{a_n} = \frac{a_1}{a_n}$，因此只需要找到两个相同的元素即输出yes，否则输出no。


```cpp
void solve() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (auto &e : arr)
        cin >> e;
    sort(arr.begin(), arr.end());
    bool ok = false;
    for (int i = 1; i < n; ++i) {
        if (arr[i] == arr[i-1]) {
            ok = true;
            break;
        }
    }
    cout << (ok ? "YES" : "NO") << '\n';
}
```

时间复杂度：$O(nlogn)$

## [B. Villagers](https://codeforces.com/contest/2133/problem/B)

题目大意：一群村民由于绿宝石的分配争议存在一个暴躁值$g_i$，Steve可以做任意多次如下操作：

- 任选两个村民$i$,$j$，给他们$max(g_i, g_j)$绿宝石让他们自行分配，他们的暴躁值都会降低$min(g_i, g_j)$并彼此成为朋友。

求让所有村民之间都成为朋友（朋友关系满足传递性）所需花费最小的绿宝石数量。

思路：对于任意两个村民，给他们发了绿宝石成为朋友后，原先暴躁值较低的村民暴躁值被清零。而朋友关系可传递，因此自然地想到可以把村民两两分组分别进行操作，之后在组间建立朋友关系的操作不需要再花费绿宝石。


```cpp
void solve() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (auto &e : arr)
        cin >> e;
    sort(arr.rbegin(), arr.rend());
    i64 ans = 0;
    for (int i = 0; i < n; i += 2) {
        ans += arr[i];
    }
    cout << ans << '\n';
}
```

时间复杂度：$O(nlogn)$

## [C. The Nether](https://codeforces.com/contest/2133/problem/C)

题目大意：Steve建了n个地狱传送门，每个传送门拥有0或多个传送出口，从起点到终点建边会组成有向无环图。你可以进行至多2n次询问，每次询问格式为`? x k s_1 ... s_k`，表示从x出发，只从后面k个点中选传送落脚点，能走过最多点的数量。每次询问的回答是一个正整数，即能走过最多点的数量。

求对于所有的传送路线中，经过最多点的路径。


思路：首先可以通过n次询问确定最长路径的起点，即每次询问`? i n s1 ... sn`，得到最大结果的i即为起点。然后考虑如何求出整个路径，观察之前的所有回答不难发现：n次询问中肯定存在答案为从1到len的所有回复，而我们只需要依次考虑是否能从长度为len的起点一步步跳到len-1、len-2，直到终点即可，至多又是n次询问。


```cpp
void solve() {
    int n;
    cin >> n;
    int len = 1, st = 1;
    vector<int> a[n + 1];
    for (int i = 1; i <= n; ++i) {
        cout << "? " << i << " " << n;
        for (int j = 1; j <= n; ++j) cout << ' ' << j;
        cout << '\n';
        cout.flush();
 
        int x;
        cin >> x;
        a[x].push_back(i);
        if (x > len) {
            len = x;
            st = i;
        }
    }
    vector<int> ans = {st};
    for (int i = len - 1; i >= 1; --i) {
        auto &possible = a[i];
        for (auto &nxt : possible) {
            cout << "? " << ans.back() << ' ' << 2;
            cout << ' ' << ans.back();
            cout << ' ' << nxt << '\n';
            cout.flush();
            int x;
            cin >> x;
            if (x == 1) continue;
            ans.push_back(nxt);
            break;
        }
    }
    cout << "! " << len;
    for (auto &x : ans) {
        cout << ' ' << x;
    }
    cout << '\n';
    cout.flush();
}
```

时间复杂度：$O(n)$


## [D. Chicken Jockey](https://codeforces.com/contest/2133/problem/D)

题目大意：n个鸡骑士堆叠在一起，每个鸡骑士血量为$h_i$，如果把一只鸡骑士砍死后，上面的鸡骑士会掉下来成为新的一叠，并且最下面的鸡骑士受到等于摔落高度的伤害，并可能触发链式死亡。

比如对于`1,2,1,3,5,2`，如果把血量为3的鸡骑士砍死，血量为5的鸡骑士受到了4点摔落伤害，最后形成两堆：`1,2,1`和`1,2`。

Steve的剑耐久度有限，对鸡骑士造成1点伤害需要消耗1点耐久值，求把鸡骑士全砍死需要消耗的最低耐久值。

思路：任何一只鸡骑士最多受到一次摔落伤害，此后它已经落地；可以优先把上方的鸡骑士砍死，受到尽可能多的摔落伤害。

考虑动态规划：`dp[i]`表示砍死i只鸡骑士所需的最小代价。对于`dp[i]`，要么把其下方的鸡骑士都砍死后，再花费`h[i] - 1`的耐久砍死第i只鸡骑士；要么消耗`h[i-1]`的耐久砍死其下方的鸡骑士，然后让其受到摔落伤害。

dfs + 记忆化更加易于理解：

```cpp
void solve() {
    int n;
    cin >> n;
    vector<int> h(n + 1);
    for (int i = 1; i <= n; ++i) cin >> h[i];
    vector<i64> dp(n + 1);
    auto dfs = [&](auto &&self, int i) -> i64 {
        if (i == 0) return 0;
        if (i == 1) return h[i];
        if (dp[i]) return dp[i];
        i64 res = self(self, i-1) + h[i] - 1;
        res = min(res, self(self, i-2) + h[i-1] + max(0, h[i] - (i-1)));
        return dp[i] = res;
    };
    cout << dfs(dfs, n) << '\n';
}
```

时间复杂度：$O(n)$
