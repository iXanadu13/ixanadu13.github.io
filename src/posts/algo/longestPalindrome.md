---
icon: pen-to-square
date: 2025-02-26
category:
  - C++
tag:
  - algorithm
  - 动态规划
star: true
sticky: true
---

# 最长回文子串

题目传送门：[https://leetcode.cn/problems/longest-palindromic-substring/description/?envType=study-plan-v2&envId=top-100-liked](https://leetcode.cn/problems/longest-palindromic-substring/description/?envType=study-plan-v2&envId=top-100-liked)

## Solution 1: 遍历+中心扩展

时间复杂度：$O(n^2)$

顺序遍历，每次通过$O(n)$时间复杂度找到以当前字符为中心的最长回文子串，所有结果中取最长。

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int ml = 0, mx = 0;
        int n = s.size();
        auto f = [&](int left, int right) {
            // cout << left << ' ' << right << '\n';
            while (left > 0 && right < n-1 && s[left-1] == s[right+1]){
                --left, ++right;
            }
            if (right - left + 1 > mx) {
                mx = right - left + 1;
                ml = left;
                // cout << "mx, ml = " << mx << ' ' << ml << '\n';
            }
        };
        for (int i = 0; i < n; ++i) {
            f(i, i);
            if (i+1 < n && s[i] == s[i+1]) f(i, i+1);
        }
        return s.substr(ml, mx);
    }
};
```

## Solution 2: 动态规划

时间复杂度：$O(n^2)$

### 二维动态规划

定义`dp[i][j]`表示子串`s[i..j]`是否为回文字符串，显然`dp[i][i] = true`。

状态转移：如果`s[i] == s[j] && dp[i+1][j-1] == true`，则`dp[i][j] = true`。

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int ansl = 0, len = 1;
        int n = s.size();
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        // for (int i = 0; i < n; ++i)
        //     dp[i][i] = true;
        for (int i = n-1; i >= 0; --i) {
            for (int j = i; j < n; ++j) {
                if (s[i] == s[j]){
                    if (i+1>=j-1){
                        dp[i][j] = true;
                    } else if (i+1<n && j-1>=0){
                        dp[i][j] = dp[i+1][j-1];
                    }
                }
                if (dp[i][j] && j-i+1 > len) {
                    len = j-i+1;
                    ansl = i;
                }
            }
        }
        return s.substr(ansl, len);
    }
};
```


### 一维动态规划

`dp[j] = i` 表示以下标`j`结尾的最长回文子串从`i`开始，
初始状态`dp[i] = i`。

状态转移：令`left = dp[i-1]-1`，如果`left>=0 && s[left] == s[i]`，则`dp[i] = left`。（每次最多在左右各扩展1个字符）；如果扩展失败，则保持当前右边界`i`不变，向右收缩左边界`j`，直至`s[i..j]`为回文串。

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int ansl = 0, len = 1;
        vector<int> dp(s.size());
        for (int i = 0; i < dp.size(); ++i){
            dp[i] = i;
        }
        for (int i = 1; i < s.size(); ++i) {
            int left = dp[i-1]-1;
            if (left >= 0 && s[left] == s[i]){
                dp[i] = left;
            } else {
                while (++left < i){
                    int j = left, k = i;
                    while (j <= k && s[j] == s[k]) {
                        ++j, --k;
                    }
                    if (j > k) {
                        dp[i] = left;
                        break;
                    }
                }
            }
            if (i-dp[i]+1 > len){
                ansl = dp[i];
                len = i-dp[i]+1;
            }
        }
        return s.substr(ansl, len);
    }
};
```

## Solution 3: 字符串哈希

### 前缀哈希 + 二分

时间复杂度：$O(nlogn)$

```cpp
#include <bits/stdc++.h>
typedef long long ll;
using namespace std;
constexpr int N = 1e5 + 5;
class Hash {
    using u64 = unsigned long long;
    const u64 base = 131;  // base 的取值要保证覆盖字符集大小
    const u64 mod1 = 998244353, mod2 = 1e9 + 7;
private:
    int n;
    // h1[i+1] 表示前缀 s[0..i]  (前闭后闭) 的哈希值，特殊的：h1[0] = 0
    vector<u64> h1, h2;
    vector<u64> p1, p2;  // p[i] 就是 base^i 次方
public:
    explicit Hash(const string &s):
            n(s.size()), h1(vector<u64>(n + 1, 0)), h2(vector<u64>(n + 1, 0)),
            p1(vector<u64>(n + 1, 0)), p2(vector<u64>(n + 1, 0))
    {
        p1[0] = p2[0] = 1;  // power(base, 0) is 1
        for (size_t i = 1; i <= s.size(); i++) {
            // ch-'a'+1 的保证大于 0, 避开特殊的哈希零值
            h1[i] = (h1[i - 1] * base % mod1 + s[i - 1]) % mod1;
            h2[i] = (h2[i - 1] * base % mod2 + s[i - 1]) % mod2;
            p1[i] = p1[i - 1] * base % mod1;
            p2[i] = p2[i - 1] * base % mod2;
        }
    }

    // 计算字符串区间 s[i..j] 的哈希值, 前闭后闭
    // 取前缀 A = h1[j+1] 减去前缀 B = h1[(i-1)+1]
    // 在 base 进制下，左移 B 和 A 左端对其，然后相减, 定义为 [i..j] 区间的哈希值
    // 即 A - B * base ^ (j-i+1) (这里 ^ 符号是幂的意思)
    // 要保证传入的 j >= i
    u64 sub1(int i, int j) { 
        // assert(i >= 0 && i<n && i<=j && j < n);
        return (h1[j + 1] - h1[i] * p1[j - i + 1] % mod1 + mod1) % mod1; 
    }
    u64 sub2(int i, int j) { 
        // assert(i >= 0 && i<n && i<=j && j < n);
        return (h2[j + 1] - h2[i] * p2[j - i + 1] % mod2 + mod2) % mod2;
    }
};

class Solution {
public:
    string longestPalindrome(string s) {
        int n = s.size();
        string str;
        for (int i = 0; i < n; ++i) {
            str.push_back(s[i]);
            str.push_back('\1');
        }
        str.pop_back();
        n = n * 2 - 1;
        swap(str, s);
        int ansl = 0, len = 1;
        auto hash1 = Hash(s);
        auto rev = string(s.rbegin(), s.rend());
        auto hash2 = Hash(rev);
        // cout << hash1.sub1(0,4) << '\n';
        // cout << hash2.sub1(4,8) << '\n';
        // cout << hash1.sub2(0,4) << '\n';
        // cout << hash2.sub2(4,8) << '\n';
//        for (int i = 0; i < n; ++i) {
//            for (int j = i; j < n; ++j) {
////                printf("i=%d, j=%d, hash1=%d, hash2=%d\n", i,j,hash1.sub1(i,j), hash2.sub1(i,j));
//                printf("i=%d, j=%d, hash1=%d, hash2=%d\n", i,j,hash1.sub2(i,j), hash2.sub2(i,j));
//            }
//        }
        auto solve = [&](int i) {
            int l = 0, r = min({i, n-i, n>>1});
            while (l < r) {
                int mid = (l+r+1) >> 1;
                int left, right;
                left = i-mid, right = i+mid;
            //    int h11 = hash1.sub1(left, i);
            //    int h21 = hash2.sub1(n-1-right, n-1-i);
            //    int h12 = hash1.sub2(left, i);
            //    int h22 = hash2.sub2(n-1-right, n-1-i);
                if ( left >= 0 && right < n && i >= 0 && i < n && 
                    hash1.sub1(left, i) == hash2.sub1(n-1-right, n-1-i)
                && hash1.sub2(left, i) == hash2.sub2(n-1-right, n-1-i)
                ){
                    l = mid;
                } else {
                    r = mid - 1;
                }
            }
            int new_len = l + (s[i-l]!=1);
            if (new_len > len){
                len = new_len;
                ansl = i - l;
            }
        };
        for(int i = 0; i < n; ++i){
            solve(i);
        }
        string res;
        int valid = 0, i = ansl;
        while (valid < len) {
            if (s[i] != 1) {
                ++valid;
                res.push_back(s[i]);
            }
            ++i;
        }
        return res;
    }
};
int main()
{
#ifndef ONLINE_JUDGE
    freopen("data.in", "r", stdin);
    freopen("data.out", "w", stdout);
#endif
    string str;
    cin >> str;
    auto sol = new Solution;
    cout << sol -> longestPalindrome(str);
    return 0;
}
```

### 前缀哈希 + 遍历枚举答案

时间复杂度：$O(n)$



## Solution 4: Manacher算法

时间复杂度：$O(n)$

<!-- TODO：添加讲解思路和代码 -->
[https://oi-wiki.org/string/manacher/](https://oi-wiki.org/string/manacher/)

## Ref

- [https://oi-wiki.org/string/hash/#最长回文子串](https://oi-wiki.org/string/hash/#最长回文子串)
- [https://writings.sh/post/algorithm-longest-palindromic-substring#前缀哈希法--二分](https://writings.sh/post/algorithm-longest-palindromic-substring#前缀哈希法--二分)
