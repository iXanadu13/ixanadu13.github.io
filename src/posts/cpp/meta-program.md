---
icon: pen-to-square
date: 2024-12-17
category:
  - C++
tag:
  - Metaprogramming
---

# C++高级特性实例

## constexpr初探——阶乘

```cpp
#include <iostream>
using namespace std;

constexpr int fac(int n)
{
    return n <= 1 ? 1 : (n * fac(n-1));
}

int main() {
    constexpr auto x = fac(5);
}
```

注意这里的x是在编译期间求值的，生成的汇编代码大致如下：

```s
main:
        push    rbp
        mov     rbp, rsp
        mov     DWORD PTR [rbp-4], 120
        mov     eax, 0
        pop     rbp
        ret
```

## 模板元编程——斐波那契数列

模板元编程是一种广泛应用于C++库开发的编程范式。在巧妙的模板的帮助下，程序员可以在编译时执行算法。C++模板元程序被证明是图灵完备的，因此可以在编译时间内执行大规模的算法。

```cpp
#include <iostream>
using namespace std;

template <int N>
struct Fibonacci
{
    static constexpr int value = Fibonacci<N - 1>::value +
                                 Fibonacci<N - 2>::value;
};
template <>
struct Fibonacci<1>
{
    static constexpr int value = 1;
};
template <>
struct Fibonacci<0>
{
    static constexpr int value = 0;
};

int main()
{
    constexpr auto x = Fibonacci<20>::value;
}
```

## 自定义后缀

```cpp
#include <iostream>
using namespace std;

long double operator ""_km(long double);

int main()
{
    auto dis = 1.2_km;
}
```

## 简易的C++编译时字符串混淆

```cpp
#include <iostream>
using namespace std;

template <size_t... I>
struct MetaString1
{
    constexpr __attribute((always_inline)) MetaString1(const char *str)
        : buffer_{encrypt(str[I])...}{}

    const char *decrypt()
    {
        for (size_t i = 0; i < sizeof...(I); ++i)
            buffer_[i] = decrypt(buffer_[i]);
        buffer_[sizeof...(I)] = 0;
        return const_cast<const char*>(buffer_);
    }

private:
    constexpr char encrypt(char c) const { return c ^ 0x55; }
    constexpr char decrypt(char c) const { return encrypt(c); }

private:
    volatile char buffer_[sizeof...(I) + 1];  // 避免编译器过度优化
};

template <std::size_t... I>
constexpr __attribute((always_inline)) auto index_seq_helper(const char *str, std::index_sequence<I...>)
{
    return MetaString1<I...>(str).decrypt();
}

// 注意，sizeof("123") == 4，但是auto str "123"; sizeof(str) == 8 (返回了const char*长度)
// 因此在这里只能使用宏，不能使用自定义后缀
#define OBFUSCATED1(str) (index_seq_helper(str, make_index_sequence<sizeof(str) - 1>{}))

int main()
{
    cout << OBFUSCATED1("Hello, world") << '\n';
    return 0;
}
```

使用-O1编译参数即可在编译结果中消除字符串常量`"Hello, world"`。

此外，这里采用了固定的xor加密算法`c ^ 0x55`，可以使用随机xor值、随机使用多种加密算法等方式进一步提升加密强度。



## Ref
- https://github.com/andrivet/ADVobfuscator
- https://www.researchgate.net/publication/259005783_Random_number_generator_for_C_template_metaprograms
- https://www.zhihu.com/question/378525362/answer/1072878269
- https://gist.github.com/KoneLinx/d3601597248bed423daf1a7cf7bd9533
