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

## 原始版本

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

## 使用Hash替代递归

```cpp
#include <iostream>
#include <cstdint>
using namespace std;

namespace
{
    constexpr __attribute((always_inline)) uint32_t hash(uint32_t in)
    {
        constexpr uint32_t r[]{
            0xdf15236c, 0x16d16793, 0x3a697614, 0xe0fe08e4,
            0xa3a53275, 0xccc10ff9, 0xb92fae55, 0xecf491de,
            0x36e86773, 0x0ed24a6a, 0xd7153d80, 0x84adf386,
            0x17110e76, 0x6d411a6a, 0xcbd41fed, 0x4b1d6b30};
        uint32_t out{in ^ r[in & 0xF]};
        out ^= std::rotl(in, 020) ^ r[(in >> 010) & 0xF];
        out ^= std::rotl(in, 010) ^ r[(in >> 020) & 0xF];
        out ^= std::rotr(in, 010) ^ r[(in >> 030) & 0xF];
        return out;
    }

    template <size_t N>
    constexpr __attribute((always_inline)) uint32_t hash(char const (&str)[N])
    {
        uint32_t h{};
        for (uint32_t i{}; i < N; ++i)
            h ^= uint32_t(str[i]) << (i % 4 * 8);
        return hash(h);
    }

    template <size_t N>
    constexpr __attribute((always_inline)) uint32_t constexpr_rand_impl(char const (&file)[N], uint32_t line, uint32_t column = 0x8dc97987)
    {
        return hash(hash(__TIME__) ^ hash(file) ^ hash(line) ^ hash(column));
    }
}

#define RANDOM(seed_) (constexpr_rand_impl(__FILE__, seed_))

template <int K, size_t... I>
struct MetaString
{
    constexpr __attribute((always_inline)) MetaString(const char *str)
        :seed_(static_cast<char>(constexpr_rand_impl(__FILE__, K))), 
        buffer_{encrypt(str[I])...} {}

    const char *decrypt()
    {
        // ((cout << "I=" << I << "\n"), ...);
        for (size_t i = 0; i < sizeof...(I); ++i)
            buffer_[i] = decrypt(buffer_[i]);
        buffer_[sizeof...(I)] = 0;
        return const_cast<const char*>(buffer_);
    }

private:
    constexpr char encrypt(char c) const { return c ^ seed_; }
    constexpr char decrypt(char c) const { return encrypt(c); }

private:
    char seed_;
    volatile char buffer_[sizeof...(I) + 1]; // 避免编译器过度优化
};

template <int K, std::size_t... I>
constexpr __attribute((always_inline)) auto index_seq_helper(const char *str, std::index_sequence<I...>)
{
    return MetaString<K, I...>(str).decrypt();
}

// constexpr __attribute((always_inline)) const char* operator ""_obf(const char *str, size_t)
// {
//     constexpr auto seq = make_index_sequence<sizeof(str)-1>{};
//     return index_seq_helper(str, seq);
// }

// 注意，sizeof("123") == 4，但是auto str "123"; sizeof(str) == 8 (返回了const char*长度)
// 因此在这里只能使用宏，不能使用自定义后缀
#define STR_OBF(str) (index_seq_helper<__COUNTER__>(str, make_index_sequence<sizeof(str) - 1>{}))

int main()
{
    cout << STR_OBF("Hello, world") << '\n';
    return 0;
}
```

注意：以上算法的随机数的分布并不均匀，特别是在公差取x左移一个值的情况下，尽管在这一应用场景下我们并不关心这些问题。

## 随机选择多种加密算法

上述代码可以对每个字符串生成不同的xor种子，但加密方式都是异或一个随机值。我们可以利用模板偏特化来实现随机选择加密算法：

```cpp

```

## Ref
- https://sunocean.life/blog/blog/2022/01/28/C++-metastr
- https://gist.github.com/KoneLinx/d3601597248bed423daf1a7cf7bd9533


[另一篇文章]: meta-program.html#简易的c-编译时字符串混淆
