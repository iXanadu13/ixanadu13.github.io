---
icon: pen-to-square
date: 2025-02-26
tag:
  - algorithm
  - 动态规划
  - cpp
star: true
sticky: true
---

# 最长回文子串

题目传送门：[https://leetcode.cn/problems/longest-palindromic-substring/description/?envType=study-plan-v2&envId=top-100-liked](https://leetcode.cn/problems/longest-palindromic-substring/description/?envType=study-plan-v2&envId=top-100-liked)

## Solution 1: 遍历+中心扩展

时间复杂度：$O(n^2)$

顺序遍历，每次通过$O(n)$时间复杂度找到以当前字符为中心的最长回文子串，所有结果中取最长。

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



## Solution 4: Manacher算法

时间复杂度：$O(n)$

<!-- TODO：添加讲解思路和代码 -->
[https://oi-wiki.org/string/manacher/](https://oi-wiki.org/string/manacher/)