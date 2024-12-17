---
icon: pen-to-square
date: 2024-12-17
category:
  - C++
tag:
  - C++
  - Metaprogramming
  - string obfuscation
---

# C++中原生编译时字符串混淆实现

C++中具有强大的模板元编程，可以不依赖任何外部库，仅使用C++ std实现编译时的字符串混淆。

## Version 1

在我的[另一篇文章]中提到过一个C++中字符串混淆的简易版本：

但其中0x55是硬编码的，我们需要引入编译时随机数来消除这一硬编码。

一个可行的编译期间随机数实例：

```cpp
#include <iostream>

namespace
{
    constexpr char time[] = __TIME__;

    constexpr int DigitToInt(char c) { return c - '0'; }
    const int seed = DigitToInt(time[7])
                   + DigitToInt(time[6]) * 10
                   + DigitToInt(time[4]) * 60
                   + DigitToInt(time[3]) * 600
                   + DigitToInt(time[1]) * 3600
                   + DigitToInt(time[0]) * 36000;
}

// 根据 N，生成随机数 value
template<int N>
struct MetaRandomGenerator
{
private:
    static constexpr unsigned a = 16807;        // 7^5
    static constexpr unsigned m = 2147483647;   // 2^31 - 1

    static constexpr unsigned s = MetaRandomGenerator<N - 1>::value;
    static constexpr unsigned lo = a * (s & 0xFFFF); // 低 16 位乘以 16807
    static constexpr unsigned hi = a * (s >> 16);    // 高 16 位乘以 16807
    static constexpr unsigned result = lo + hi + ((hi & 0x7FFF) << 16);

public:
    static constexpr unsigned max = m;
    static constexpr unsigned value = result > m ? result - m : result;
};

template<>
struct MetaRandomGenerator<0>
{
    static constexpr unsigned value = seed;
};

template<int N, int M>
struct MetaRandom
{
    static const int value = MetaRandomGenerator<N + 1>::value % M;
};

int main() {
    int x = MetaRandom<__COUNTER__, 20>::value;
    int y = MetaRandom<__COUNTER__, 114514>::value;
    return 0;
}
```

但由于MetaRandom定义的模板`template<int N, int M>`中的`N`基于递归实现，在`N`较大时会生成大量递归嵌套。在gcc.godbolt.org上实测，若不额外指定参数，N无法超过225（使用编译参数`-std=c++20 -O0`）。



## Ref
- https://sunocean.life/blog/blog/2022/01/28/C++-metastr


[另一篇文章]: meta-program.html#简易的c-编译时字符串混淆
