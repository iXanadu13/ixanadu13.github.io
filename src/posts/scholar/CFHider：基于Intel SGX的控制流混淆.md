---
icon: pen-to-square
date: 2025-04-14
tag:
  - Obfuscate
---

# CFHider: Control Flow Obfuscation with Intel SGX

论文来自 IEEE Conference on Computer Communications（INFOCOM 2019）的《[CFHider: Control Flow Obfuscation with Intel SGX](https://ieeexplore.ieee.org/document/8737444)》。

![](/assets/images/scholar/CFHider：基于Intel%20SGX的控制流混淆/title.png)

## 摘要

当程序在不受信任的云上执行时，需要保护程序逻辑的机密性，控制流混淆是实现这一目标的直接方法。然而，在这个方向上的现有方法不能同时实现高保密性和低开销。本文提出了CFHider，这是一种硬件辅助的保护控制流机密性的方法。通过结合程序转换和英特尔软件保护扩展（SGX）技术，CFHider将分支语句条件移动到不透明和可信的内存空间（enclave），从而提供有保证的控制流机密性。

基于CFHider的设计，我们开发了一个针对Java应用程序的原型系统。我们的分析和实验结果表明，CFHider在保护控制流机密性方面是有效的，并且与现有的基于软件的解决方案相比，性能开销大大降低（降低了8.8倍）。

## 1. Introduction

云计算使用户能够按需租用计算资源并远程执行其程序。然而，当远程环境不可信时，保护程序逻辑的机密性就成为一个重要的安全需求，尤其是当程序的算法是知识产权时。控制流混淆（Control Flow Obfuscation）是一种将程序转换为难以理解的形式而不改变其功能的方法，是保护程序逻辑机密性的一种直接方式。现有研究主要集中在基于软件的转换方法上。然而，这些方法存在安全性低、表达能力差或开销高等问题。例如，Wang 等人[1]提出结合控制流扁平化和指针别名构造技术，并证明静态分析所提出的混淆控制流是一个 NP 完全问题，但这种方法无法抵御动态分析[2]。Sharif 等人[3]将分支语句条件转换为加密格式，仅能保护“等于”和“不等于”谓词的机密性，从而失去通用性。Lan 等人[4]提出使用 lambda 演算模拟来转换条件指令，以抵御基于符号执行的逆向工程攻击。但其实验结果表明，当仅保护 30% 的条件时，其执行时间为原始程序的 68.5 到 248.1 倍，开销极高。

为了解决上述限制，本文提出了一种通用的控制流混淆方案 CFHider，它大大降低了性能开销。CFHider 结合程序转换与 Intel 的软件防护扩展（SGX），将每个分支语句条件转换为一个 CFQ 函数调用，并将其执行移入被视为不透明和可信执行环境的 enclave。为了进一步混淆控制流，CFHider 在程序中插入不可区分的伪分支语句。为抵御基于动态分析的攻击，CFHider 为分支语句识别并引入混淆不变量以抵御被动攻击（详见 IV-B3 节），并在 CF Enclave 中引入数据流检测以抵御主动攻击（详见 IV-C3 节）。我们的分析表明，CFHider 能够抵御静态和动态、被动和主动攻击。

为了评估其适用性与性能，我们开发了一个面向 Java 应用程序的原型系统。实验结果表明，CFHider 可以保护我们测试的所有 Java（Hadoop）应用程序，并相比以往的软件方法具有更低的性能开销。例如，在保护 100% 分支条件的情况下，执行 Hadoop 应用程序时 CFHider 的平均性能开销为 20.75%，而在执行计算密集型应用程序时引入了 2.9 到 3.7 倍的开销。我们的分析显示，CFHider 中执行一个受保护分支条件所需的时间为 4.31 微秒。相比之下，Lambda混淆[4] 中执行一个受保护分支需 38.19 微秒，我们的方法将性能开销降低了 8.8 倍。这种降低的开销主要归功于 SGX 的 ecall 机制与我们 LRU 缓存（详见 IV-C2 节）的结合，比基于软件的模拟方法开销更小[4][5]。

通过聚焦于控制流，CFHider 提供了更高的安全性保证和更广的通用性，相较于将全部或部分二进制代码移入 SGX enclave 的其他方法，例如 Haven[6]、Graphene-SGX[7]、SCONE[8] 与 Glamdring[9]。直接将二进制文件移入 enclave 会引入较大的可信计算基（TCB）。尽管缺乏形式化分析，已有研究表明其中的漏洞仍可被利用破坏防御机制。另一方面，如 VC3[10] 等方法针对特定系统解决方案（如 MapReduce 的 C++ 版本），因此缺乏通用性。相比之下，CFHider 只将控制流部分移入 enclave 并以安全验证格式执行（详见 V 节），从而实现高度的机密性保障。尽管原型系统基于 Java 应用开发，CFHider 的设计理念可应用于大多数编程语言编写的应用程序。

我们的贡献总结如下：

- 我们提出了一种基于硬件辅助的解决方案 CFHider，用于保护远程执行程序的控制流机密性。我们证明了 CFHider 能有效抵御针对还原原始控制流的静态与动态分析攻击。
- 我们开发了一个面向 Java 程序的原型系统。实验结果显示 CFHider 适用于我们测试的所有 Java（Hadoop）程序，并相较以往软件方法具有显著降低的性能开销。

## 2. 预备知识：Intel SGX

SGX[11][12] 是一组 x86-64 指令集架构扩展，能够启用受保护的执行环境（称为 enclave），无需信任除处理器及置于 enclave 中的代码之外的任何实体。Enclave 由处理器进行保护：处理器控制对 enclave 内存的访问。试图从 enclave 外部读取或写入正在运行的 enclave 内存的指令将会失败。Enclave 代码可通过类似 callgate 的机制从不可信代码中调用，该机制将控制权转移到 enclave 内定义的用户入口点，即 `ecall`。SGX 支持**远程认证（remote attestation）**，这使得远程系统可以通过密码学方式验证某个特定软件是否已被加载到 enclave 中，并建立共享密钥，从而能够引导一个与 enclave 之间的端到端加密通道。

## 3. 安全模型

我们假设攻击者的目标是获取用户上传程序的控制流信息，即破坏程序控制流的机密性。然而，攻击者并不关心破坏计算结果的完整性，例如篡改计算结果。

在环境设定方面，我们假设用户的本地环境是安全的，不受攻击。但公共云环境是不可信的。在公共云上，我们假设处理器支持 SGX。然而，公共云主机上的软件栈（例如虚拟机管理器和操作系统）是不可信的。为便于描述，我们将 enclave 称为**可信区域（trusted area）**，而将公共云上的软件栈称为**不可信区域（untrusted area）**。攻击者可以是外部攻击者、恶意云厂商员工，或是与正常用户共处同一宿主的恶意用户。我们假设攻击者能够在不可信区域内执行静态分析和动态追踪。

我们对被保护程序本身没有特别限制。只要程序本身不会主动泄露其控制流信息（例如显式地打印出控制流路径），CFHider 都能良好地工作。

旁道攻击（side-channel attack）不在本文的讨论范围内。尽管近期的一些旁道攻击（如 Foreshadow[13]）确实可以提取当前 SGX 实现中的加密密钥，并最终获得控制流矩阵的解密密钥，如文献[13]所讨论的那样，**“Foreshadow 利用的是微架构实现中的漏洞，而并不从根本上破坏 Intel SGX 和通用 TEE 的架构设计。”**

## 4. 系统设计

### A. 架构

CFHider 的架构如图 1 所示，由两部分组成：可信用户环境和不可信的公共云。对于需要在公共云上执行的原始程序 $P$，CFHider 首先将其转换为**变换程序** $P'$ 和**控制流矩阵** $M$，该过程在用户本地环境中完成。$P'$ 与 $P$ 不同之处在于插入了更多的分支语句以混淆控制流，并将每个条件的逻辑转移到 $M$ 中。完成转换后，$P'$ 和加密后的 $M$，即 $E(M)$，将被发送到公共云：其中 $P'$ 被发送至云主机并在不可信区域执行，$E(M)$ 被发送到 **CF Enclave**（一个 SGX Enclave）。

<div style="width: 100%; margin: auto; text-align: center;">
  <img src="/assets/images/scholar/CFHider：基于Intel SGX的控制流混淆/figure1.png" style="width: 50%;" />
  <p style="font-size: 0.95em;"><strong>
    Fig. 1: The architecture of CFHider
  </strong></p>
</div>

CF Enclave 首先通过 SGX 远程认证机制进行验证。一旦认证通过，则该 CF Enclave 被认为是可信的。随后它将获取 $E(M)$ 的解密密钥以还原 $M$。在 $P'$ 执行过程中，每个分支语句的条件都将在 CF Enclave 中，根据 $M$ 的内容进行评估。

频繁访问 CF Enclave 会带来显著的性能开销。为减少此类开销，CF Enclave 引入了 **LRU 缓存**。每次查询都会先经过 LRU 缓存，仅当发生缓存未命中时，才会真正查询 CF Enclave。

在整个执行过程中，$M$ 仅存在于用户环境和已认证的 CF Enclave 中，因此不会直接泄露条件信息给攻击者。接下来，我们将介绍程序变换细节以及 CF Enclave 的设计。

### B. 程序转换

我们首先介绍基本方案，该方案将原始程序中的每个条件进行转换。在此基础上，我们提出了**伪分支插入（fake branch insertion）**，进一步混淆控制流。

最后，我们引入**混淆不变量（obfuscation invariants）**，用于抵御动态的被动攻击。

#### (1) 基本方案：

控制流转换基于**三地址码（3-address code）**[14]，这是程序的一种中间表示形式。每条三地址码指令最多有三个操作数，通常是赋值和二元运算符的组合。广义上，一条分支语句的三地址码形式如下：

$$
\text{if } (x \ \text{op} \ y) \ \text{then} \ \{\text{goto } L\} \tag{1}
$$

其中 $x$ 和 $y$ 是程序中的两个变量，$op$ 是以下六种操作符之一：

$$
\text{op} ::= >  |  <  |  ==  |  !=  |  >=  |  <= \tag{2}
$$

表达式 $x \ \text{op} \ y$ 是该分支语句的**条件**，$L$ 是**目标语句地址**，表示当该条件为真时，控制流将跳转至 $L$。


该转换方案的基本流程如下：

对于每条形如公式 (1) 的分支语句 $s$，定义集合：

$$
U(s) = \{x, y\}
$$

表示出现在原始条件中的变量。定义集合 $V(s)$ 为所有能访问到 $s$ 的变量集合，并排除掉 $U(s)$ 中的变量。

基于 $U(s)$ 和 $V(s)$，我们构造新的条件如下：

1. 随机从 $V(s)$ 中选取 $N - 2$ 个变量，构成集合 $\tilde{V}(s)$；
2. 构造列表 $L(s)$，由 $\tilde{V}(s) \cup U(s)$ 中的元素组成；
3. 对 $L(s)$ 中的变量顺序进行打乱以引入随机性；
4. 在 $L(s)$ 中定位 $x$ 和 $y$ 的索引，分别记为 $i_x(s)$ 和 $i_y(s)$；
5. 为 $s$ 分支分配一个唯一的条件编号，记作 $i(s)$。

基于以上构造，我们将条件 $(x \ \text{op} \ y)$ 转换为一个 **控制流查询（CFQ）** 函数调用 `cfQuery`，如下所示：

$$
\text{if } \left( \text{cfQuery}(L(s), i(s)) \right) \ \text{then} \ \{\text{goto } L\} \tag{3}
$$

在调用 `cfQuery` 函数时，参数列表 $L(s)$ 中：

- 从 $\tilde{V}(s)$ 选取的元素称为**干扰参数（confusing parameters）**；
- 从 $U(s)$ 中选取的 $x$ 和 $y$ 称为**实际参数（actual parameters）**；
- 参数总数 $N$ 称为**参数长度（parameter length）**。

控制流矩阵 $M$ 包含所有条件的逻辑信息。对于每个分支语句 $s$，在 $M$ 中创建一个元组，记录：

$$
\langle i(s), i_x(s), i_y(s), \text{op} \rangle \tag{4}
$$

在执行过程中，`cfQuery` 函数将在 CF Enclave 中执行。根据接收到的 $i(s)$，`cfQuery` 将定位 $M$ 中对应的元组，并根据其中的 $i_x(s)$ 和 $i_y(s)$ 从 $L(s)$ 中选取变量 $x$ 和 $y$，结合 $\text{op}$ 还原原始条件，最后返回条件的求值结果。

在表达式 (1) 的条件中，如果只涉及一个变量（例如 $x$），另一个是带有类型 $t$ 的字面量 $l$，我们将生成如下形式的元组：

$$
\langle i(s), i_x(s), \text{string}(l), \text{op}, \text{string}(t) \rangle
$$

其中 $\text{string}()$ 表示某个类型或字面量的字符串表示形式。在运行时，`cfQuery` 将根据类型 $t$ 恢复字面量 $l$ 的值，并重新组装条件进行判断。

#### (2) 假分支语句插入（Fake Branch Statements Insertion）

为了进一步混淆控制流，我们在基本方案的基础上提出了一种变体，称为**假分支语句插入（fake branch statements insertion）**。其基本思想是在原始分支语句前插入一些伪造分支语句。在程序执行过程中，插入的分支语句会选择跳转至正确的原始语句，从而不会破坏运行时控制流。

为了区分插入的伪造语句和通过基本方案转换的语句，我们将前者称为**假分支语句（fake branch statements）**，后者称为**非假分支语句（non-fake branch statements）**。

伪造分支语句的插入过程如下：

对于一个原始语句 $s$，我们首先收集所有能访问到 $s$ 的变量，记作 $V(s)$。然后我们从 $V(s)$ 中随机选取 $N$ 个变量，并生成一个乱序列表 $L(s)$。基于 $L(s)$，我们构造一个分支语句 $\hat{s}$，并为其分配一个唯一的条件编号 $i(\hat{s})$。最后，我们将 $\hat{s}$ 插入到 $s$ 之前。$\hat{s}$ 的格式与基本方案相似，如下所示：

$$
\text{if } \left( \text{cfQuery}(L(s), \ i(\hat{s})) \right) \ \text{then} \ \{\text{goto } L\} \tag{5}
$$

其中 $\hat{s}$ 中的条件将返回一个固定的布尔值 $b$。若 $b$ 为真，则 $L$ 是语句 $s$ 的标签；若 $b$ 为假，则 $L$ 是某个非 $s$ 的其他语句的标签。

控制流矩阵 $M$ 中与 $\hat{s}$ 对应的元组如下，仅包含条件 ID 和固定返回值：

$$
\langle i(\hat{s}), b \rangle \tag{6}
$$

`cfQuery` 函数与伪造语句兼容。当其接收到 $i(\hat{s})$ 后，会在 $M$ 中找到元组 $\langle i(\hat{s}), b \rangle$，并返回 $b$。

为了在混淆效果与性能之间进行权衡，我们为每个原始语句以一定的概率插入假分支语句，该概率称为**混淆度（confusion degree）**，记作 $d$。

<div style="width: 100%; margin: auto; text-align: center;">
  <img src="/assets/images/scholar/CFHider：基于Intel SGX的控制流混淆/figure2.png" style="width: 50%;" />
  <p style="font-size: 0.95em;"><strong>
    Fig. 2: An example of the program transformation
  </strong></p>
</div>

图 2 展示了一个具体的程序转换示例。转换过程如图左侧所示：

对于原始语句 `if (x > y) goto L2`，其条件被替换为函数调用：

$$
\text{cfQuery}((a, y, b, x), \ B1)
$$

其中 $y$ 和 $x$ 是实际参数，$a$ 和 $b$ 是干扰参数，$B1$ 是条件编号。对于程序中其他语句（如标签为 $L2$ 的语句），转换过程会在其前插入假分支语句。

控制流矩阵中的元组和 `cfQuery` 函数的样例实现展示在图的右侧。

#### (3) 抵御被动攻击（Defeating Passive Attacks）

通过观察 CFQ 函数调用中的参数值，攻击者可能能够还原原始条件或识别假分支语句。我们将此类攻击称为**被动攻击（passive attack）**。本节首先给出这种攻击的具体示例，然后描述可以避免此类攻击的场景，最后讨论相关防御方案。

对于一个**非假分支语句** $s$，被动攻击可能在如下情况下成功：

假设 $s$ 中 CFQ 表达式为 $f$，我们记其参数列表为：

$$
L(s) = \{p_1, \cdots, p_{i-1}, p_i, p_{i+1}, \cdots, p_N\}
$$

如果攻击者观察到，在某次 $f$ 调用中返回值为 $\text{true}$，且参数满足：

$$
p_1 < \cdots < p_{i-1} < p_i < p_{i+1} < \cdots < p_N
$$

而在另一次调用中返回 $\text{false}$，参数值满足：

$$
p_1 < \cdots < p_{i-1} < p_{i+1} < p_i < p_{i+2} < \cdots < p_N
$$

即只有 $p_i$ 和 $p_{i+1}$ 的相对关系发生了改变，其他变量顺序保持不变，则攻击者可推断出 $p_i$ 和 $p_{i+1}$ 是实际参数。

为防止这种情况发生，我们提出了**混淆不变量（obfuscation invariant）**，通过设计使得攻击者无法识别出实际参数。

#### 定理 1

设非假分支语句的 CFQ 调用表达式为 $f$，其参数列表为：

$$
L(s) = \{p_1, \cdots, p_N\}
$$

其中 $p_i$ 和 $p_j \ (1 \leq i, j \leq N)$ 是两个实际参数，其余为干扰参数。若 $L(s)$ 中的值满足如下的**混淆不变量**，攻击者则无法识别 $p_i$ 和 $p_j$ 为实际参数。

**混淆不变量定义：** 存在某个干扰参数 $p_c$，使得对于每次 $f$ 的调用，始终满足：

$$
p_i \leq p_c \leq p_j \quad \text{或} \quad p_j \leq p_c \leq p_i
$$

#### 证明：

我们的证明策略是列举所有 $f$ 调用的两种返回不同（即一个返回 $\text{true}$，一个返回 $\text{false}$）的场景。在每种场景中，若实际参数的相对关系发生改变，混淆不变量会导致其他参数的关系也发生改变，从而使攻击者无法确定实际参数。

设函数返回 $\text{true}$ 时 $p_k$ 的值为 $p_k^T$，返回 $\text{false}$ 时为 $p_k^F$。

我们仅列出代表性的场景，其它对称场景略去。例如 case 1 的对称情况为：

$$
p_i^T < p_c^T < p_j^T, \quad p_i^F > p_j^F
$$

所有场景包括：

1. $p_i^T > p_c^T > p_j^T$, 且 $p_i^F < p_j^F$；

2. $p_i^T > p_c^T > p_j^T$, 且 $p_i^F = p_j^F$；

3. $p_i^T = p_c^T = p_j^T$, 且 $p_i^F > p_j^F$；

4. $p_i^T = p_c^T = p_j^T$, 且 $p_i^F < p_j^F$；

5. $p_i^T = p_c^T > p_j^T$, 且 $p_i^F < p_j^F$；

6. $p_i^T > p_c^T = p_j^T$, 且 $p_i^F = p_j^F$；

7. $p_i^T = p_c^T > p_j^T$, 且 $p_i^F = p_j^F$。

上述情形及其对称形式组成满足混淆不变量的完整场景集。我们仅对 case 1 进行证明，其它类似。

**证明（反证法）：**

在 case 1 中，设：

$$
p_i^T > p_c^T > p_j^T, \quad \text{且} \quad p_i^F < p_j^F
$$

假设仅 $p_i$ 与 $p_j$ 的关系发生变化，即 $p_i > p_j$ 变为 $p_i < p_j$，其余变量关系不变：

$$
p_i^F > p_c^F, \quad p_c^F > p_j^F
$$

由此推出：

$$
p_c^F < p_i^F < p_j^F < p_c^F
$$

产生矛盾。因此，实际参数的变化将导致多个变量关系发生改变，从而破坏攻击者的识别能力。

**证毕。**

我们给出了一个关于**混淆不变量（obfuscation invariant）**的具体示例。设：

$$
L(s) = \{x, y, a\}
$$

其中 $x$ 和 $y$ 是实际参数，$a$ 是一个干扰参数。如果 $a$ 的值在 $x$ 和 $y$ 之间，那么在一次返回 $\text{false}$ 的调用中，参数满足关系：

$$
x < a < y
$$

而在返回 $\text{true}$ 的调用中，满足：

$$
x > a > y
$$

由于 $f$ 的返回从 $\text{false}$ 变为 $\text{true}$，涉及了三组关系变化：

$$
(x, y), (x, a), (y, a)
$$

因此，攻击者无法准确识别哪一组是实际参数。

**被动攻击在假分支语句上的成功条件：**

设语句 $s$ 中的 CFQ 表达式为 $f$，其参数为：

$$
L(s) = \{p_1, \cdots, p_N\}
$$

若攻击者能枚举 $p_i, p_j \in L(s)$ 的所有组合，并发现每种组合下 $f$ 都返回相同布尔值，则可推断 $s$ 为假分支语句。

我们提出的混淆不变量可以防止这种攻击。

#### 定理 2

设假分支语句 $s$ 中的 CFQ 表达式为 $f$，其参数为：

$$
L(s) = \{p_1, \cdots, p_N\}
$$

若 $L(s)$ 中的值满足以下定义的**混淆不变量（obfuscation invariant）**，攻击者将无法识别 $s$ 为假分支语句。

**混淆不变量定义：** 存在两个参数 $p_i, p_j \in L(s)$，在每次 $f$ 的调用中，$p_i$ 和 $p_j$ 的数学关系保持不变。

#### 证明：

若两个参数 $p_i$ 和 $p_j$ 的关系始终不变，攻击者就无法验证所有六种可能关系（$>, <, ==, >=, <=, !=$）是否都返回相同的布尔值。因此，攻击者无法确认 $s$ 是假分支语句。

**证毕。**

根据定理 1 和定理 2，我们提出的抵御被动攻击的策略是：确保**每一个分支语句都满足混淆不变量（obfuscation invariants）**。具体而言，我们为每次 CFQ 调用的参数列表中加入一个或多个**合成变量（synthetic variables）**。

对于非假分支语句，这些合成变量的值应处于两个实际参数之间。对于假分支语句，这些合成变量的值始终大于（或始终小于）参数列表中的某一个特定参数。

为达成上述目标，我们会插入额外语句，通过现有变量计算合成变量的值，并将结果赋值给该合成变量。生成合成变量的方式有很多，我们为用户留出了自由空间，以便其实现个性化方法。

<div style="width: 100%; margin: auto; text-align: center;">
  <img src="/assets/images/scholar/CFHider：基于Intel SGX的控制流混淆/figure3.png" style="width: 50%;" />
  <p style="font-size: 0.95em;"><strong>
    Fig. 3: An example of adding synthetic variables to Fig. 2
  </strong></p>
</div>

图 3 展示了在图 2 转换后的程序中添加合成变量的示例。如图所示，我们将合成变量 $c$ 和 $d$ 分别添加至两个 CFQ 调用中。

- 由于变量 $c$ 的值介于 $x$ 与 $y$ 之间，根据定理 1，被动攻击者无法从 $x$、$y$ 和 $c$ 中识别出两个实际参数；
- 又由于变量 $d$ 的值始终大于 $x$，根据定理 2，攻击者无法观察到 $x$ 与 $d$ 之间的所有关系。

因此，攻击者无法识别第二个分支语句是一个假分支语句。

### C. CF Enclave 设计

在本节中，我们将介绍 CF Enclave 的设计细节，包括 enclave 的初始化、LRU 缓存机制，以及用于抵御主动攻击的数据流检查机制。

#### 1）CF Enclave 初始化（Set Up）

CF Enclave 的初始化流程如下：

一旦 CF Enclave 启动，就会执行一次标准的 SGX 远程认证流程 [15]。在远程认证过程中，CF Enclave 的度量值（measurement）会被计算并发送给认证服务器。认证服务器通过将度量值与预期哈希值进行比对，从而验证 CF Enclave 的完整性。

一旦认证通过，认证服务器将会把控制流矩阵的解密密钥 $k_M$ 安全地发送至 CF Enclave。该密钥会通过远程认证过程中生成的安全信道传输。

CF Enclave 接收到 $k_M$ 后，会加载加密的控制流矩阵 $E(M)$，并使用 $k_M$ 进行解密，最终在 enclave 内存中加载明文控制流矩阵 $M$。CFQ 函数由此可以访问该矩阵获取条件信息，并提供控制流查询服务。

#### 2）LRU 缓存（The LRU Cache）

每次 CFQ 函数的调用本质上是一次 SGX `ecall`，相比普通系统调用耗时更长（约为 CPU 指令周期的 54 倍 [16]）。

为了减少频繁的 CFQ 调用，我们在 CF Enclave 外部实现了一个基于软件的缓存机制，称为 **LRU 缓存（Least Recently Used Cache）**。

LRU 缓存是一个哈希表，缓存了每次 CFQ 调用的参数值和返回值。在程序执行过程中，每次 CFQ 调用会根据参数值先查询 LRU 缓存：

- 如果命中，返回缓存的结果；
- 如果未命中，则进入实际的 CF Enclave 执行 CFQ 函数，并将该次函数调用的参数与返回值存入缓存。

如其名称所示，LRU 缓存采用**最近最少使用**策略进行替换。

#### 3）抵御主动攻击（Defeat the Active Attack）

攻击者可能通过多次使用不同参数重复调用 CFQ 函数，并观察返回值与参数之间的关系，从而推断程序的条件信息。我们将这种攻击称为**主动攻击（active attack）**。

为抵御该类攻击，CF Enclave 内引入 **数据流检查（data flow check）** 机制。

##### 思路：

静态分析原始程序，推导每个分支语句中各参数之间的数学约束关系。在运行时，当 CF Enclave 收到 CFQ 请求后，会将参数值与这些约束进行比对，若存在不一致，则认为数据流完整性遭到破坏。

##### 数学约束推导方法：

我们使用标准的过程内前向数据流分析（intra-procedure forward data flow analysis）来推导约束关系，算法定义如下：

- $In(s)$ 和 $Out(s)$ 分别表示执行语句 $s$ 之前和之后的变量约束；
- $\text{Gen}(In(s), s)$ 表示执行 $s$ 后新生成的约束；
- $\text{Kill}(In(s), s)$ 表示执行 $s$ 后需移除的旧约束。

算法初始化：

$$
In(s) = \emptyset, \quad Out(s) = \emptyset
$$

每次迭代中：

1. 根据所有前驱语句的 $Out(s)$ 更新 $In(s)$；
2. 基于 $In(s)$ 和 $s$ 的语义，更新 $Out(s)$；
3. 如果 $Out(s)$ 不再发生变化，循环终止。

最终，每个语句的 $In(s)$ 即为其静态约束集。

![](/assets/images/scholar/CFHider：基于Intel%20SGX的控制流混淆/table1.png)

函数 $\text{Gen}(In(s), s)$ 和 $\text{Kill}(In(s), s)$ 的定义如表 I 所示。在表中，符号 $\diamond$ 表示一个二元操作符，其定义如下：

$$
\diamond ::= +  |  -  |  *  |  /  |  XOR  |  AND  |  OR  |  \cdots \tag{7}
$$

当我们写作 $a \prec r$ 时，表示变量 $a$ 存在于约束 $r$ 中。

- 若执行语句的格式为 $a := b \diamond c$（case 1），则生成的新约束为 $a = b \diamond c$，而原约束中包含 $a$ 的所有项将被删除；
- 若执行语句格式为 $a := a \diamond b$（case 2），我们将现有约束中出现的旧变量 $a$ 替换为 $\diamond^{-1}(a, b)$，即将等式右边的新表达式作为旧 $a$ 的替代。

例如，若语句为 $a = a + b$，且已有约束为 $a > 5$，则有：

$$
\diamond^{-1}(a, b) = a - b
$$

约束将更新为 $a - b > 5$。这是因为已有约束代表的是旧的 $a$，而执行语句后旧的 $a$ 将不再存在。为了保持约束，需要将其替换为关于新 $a$ 的表达式。

- 对于**分支语句**（case 3 和 4），我们直接将其条件作为新的约束添加；
- 对于**函数调用语句**（case 5），我们会移除 $In(s)$ 中所有包含变量 $a$ 的约束，因为 $a$ 在函数调用中可能被更新；
- 对于**其他情况**（case 6），既不添加也不删除任何约束。

当算法终止时，每个语句 $s$ 的 $In(s)$ 包含变量之间的一组数学约束。

在程序运行期间，CF Enclave 每次收到针对分支语句 $s$ 的 CFQ 调用时，会将传入的参数值与 $In(s)$ 中的约束进行比对。如果发现任何不一致，则视为违反了数据流完整性。

一旦检测到违规，CF Enclave 将退出执行，整个程序也会被终止。

<div style="width: 100%; margin: auto; text-align: center;">
  <img src="/assets/images/scholar/CFHider：基于Intel SGX的控制流混淆/algo1.png" style="width: 50%;" />
</div>

## 5. 安全性分析（Security Analysis）

在本节中，我们分析 CFHider 提供的安全性保障。我们将展示 CFHider 如何抵御静态攻击、动态攻击、被动攻击与主动攻击。

### A. 抵御静态分析攻击（On Defeating the Static Analysis）

由于 **控制流矩阵（control flow matrix）** 存储在可信区域中，攻击者无法访问，因此每个条件在变换程序中在攻击者看来都是独立的。

对于一个 CFQ 调用语句，其参数列表长度为 $N$，攻击者最多只能得知哪些变量**可能**参与了原始条件。在攻击者尝试基于“可能性”随机猜测实际参数时，我们分析其成功还原原始条件的概率。

该条件可能是**假分支条件**或**非假分支条件**：

- 若是**假分支**，返回值仅有 $\text{true}$ 或 $\text{false}$ 两种可能；
- 若是**非假分支**，$N$ 个参数中恰有两个为实际参数，且需匹配一个操作符（共六种），总可能性为：

$$
6 \cdot \binom{N}{2}
$$

因此，总体可能性为：

$$
6 \cdot \binom{N}{2} + 2 = 3N^2 - 3N + 2
$$

攻击者成功猜中的概率为：

$$
R_{branch}(N) = \frac{1}{3N^2 - 3N + 2}
$$

图 4 模拟了不同 $N$ 值下的恢复概率。随着参数列表长度 $N$ 的增加，该概率迅速下降。当 $N > 10$ 时，该值接近于 0。

<div style="width: 100%; margin: auto; text-align: center;">
  <img src="/assets/images/scholar/CFHider：基于Intel SGX的控制流混淆/figure4.png" style="width: 50%;" />
</div>

### B. 抵御被动攻击（On Defeating the Passive Attack）

若攻击者试图执行第 IV-B3 节中描述的**被动攻击**，根据定理 1 和定理 2，混淆不变量（obfuscation invariants）可以阻止攻击者识别出实际参数或检测出假分支语句。

由于合成变量会作为参数传入 CFQ 函数，攻击者无法确定其是否真的参与了分支条件的计算，也就无法确认它是否是合成变量。虽然混淆不变量是合成变量的特征，但我们强调：**普通变量也可能满足混淆不变量的条件**。

因此，攻击者难以通过变量关系推断出哪些变量是实际参数。

### C. 抵御主动攻击（On Defeating the Active Attack）

由于控制流矩阵无法被攻击者访问，其也就无法推导出有效的变量取值范围。

若攻击者尝试通过不断调用 CFQ 函数、传入不同参数以发起主动攻击，则很可能违反变量之间的约束关系。这些约束将在数据流检查器中被检测出。

CF Enclave 一旦检测到**任意一次**数据流完整性的违反，就会立即退出执行，整个程序也将终止。因此，攻击者能获取的信息极其有限，难以推导出所有变量之间的关系。

## 6. 实现与实验（Implementation and Experiments）

### A. 实现（Implementation）

我们实现了一个原型系统，目标是保护 Java 程序的控制流机密性。我们使用了 **Soot** —— 一个开源 Java 编译器框架 —— 进行程序分析与转换。

该系统可以直接作用于字节码（即 `.class` 文件），因此不需要源代码。程序的 `.class` 文件会被解析并转换为 **Jimple code**，这是一种带类型的、三地址语句风格的中间表示。

为了实现数据流检查，我们首先使用 Soot 和 Java 代数系统 **Symja** 实现了变量关系提取算法。Symja 可将语句翻译为数学约束，并支持求解逆操作 $\diamond^{-1}$（用于 case 2 的语句，如表 I 所示）。在 CF Enclave 内部，我们实现了一个轻量级计算代数系统，用于校验传入参数是否满足这些约束。

CF Enclave 的实现基于 **Intel SGX SDK 1.7**，CFQ 函数被实现为一个 `ecall` 函数。Enclave 内部组件使用 C++ 编写，非可信部分使用 Java 编写。

两部分通过 **JNI（Java Native Interface）** 连接。在 JNI 中，我们将某些 Java 类型转换为 C++ 类型，例如将 `byte`, `short`, `boolean`, `object` 等统一转换为 `int` 类型。对于 `object` 类型，我们在 C++ 端使用其哈希值（整数）表示，以支持对象操作（如 `==`, `!=`）等。

### B. 实验（Experiments）

基于原型系统，我们在支持 SGX 的计算环境下进行了系列实验，用以评估性能开销。实验分为两类：

- 第一组测试了 CFHider 在 **Hadoop 应用** 上的表现；
- 第二组测试了其在 **CPU 密集型应用** 下的开销。

实验结果表明：CFHider 可适用于我们测试的所有 Java（Hadoop）程序，并带来可接受甚至更低的性能开销。

#### 1）Hadoop 应用测试

该实验中，我们搭建了一个包含 4 台 **Lenovo ThinkPad T460** 的集群环境：

- 每台笔记本运行 Ubuntu 14.04；
- 搭载 i7-6500U Intel CPU；
- 支持 SGX Version 1；
- 配置为 8GB 内存和 500GB 硬盘。

所有测试均在 SGX 的 hardware release 模式下运行，以更贴近实际部署环境。其中一台机器担任 master，其余三台为 worker。若程序运行在多主机的集群上，则每台物理机部署一个独立的 CF Enclave。

实验中使用了 Hadoop 1.0.4，测试程序见表 II，其中前三个应用来自 Hadoop 1.0.4 官方发布包，最后一个应用来自 **HiBench 3.0.0 benchmark suite** [17]。

![](/assets/images/scholar/CFHider：基于Intel%20SGX的控制流混淆/table2.png)

---

控制流矩阵在转换后生成，其统计数据如表 III 所示。表明矩阵大小随混淆度 $d$ 增加而增大。平均而言，每个生成的 CFQ 函数约占用 **10 字节** 空间。

对每个应用，我们对其 `.jar` 包中的所有 `.class` 文件进行转换。统一参数设置如下：

- CFQ 参数长度 $N = 10$；
- LRU 缓存大小 $W = 10,000$；
- 混淆度 $d = 0\%$, $30\%$, $50\%$。

原始 Hadoop 应用作为 baseline 进行对比。实验结果表明：CFHider 是一个通用系统，适用于我们所选的所有程序。

<div style="width: 100%; margin: auto; text-align: center;">
  <img src="/assets/images/scholar/CFHider：基于Intel SGX的控制流混淆/table3.png" style="width: 50%;" />
</div>

---

性能评估结果如图 5 所示：

- 当 $d = 0\%$ 时，平均性能开销为 **20.75%**；
- 当 $d = 30\%$ 时，平均开销上升为 **34.06%**；
- 当 $d = 50\%$ 时，平均开销为 **57.99%**。

实验表明，**引入更多假分支语句（即提升混淆度 $d$）会导致更高的性能开销**。

<div style="width: 100%; margin: auto; text-align: center;">
  <img src="/assets/images/scholar/CFHider：基于Intel SGX的控制流混淆/figure5.png" style="width: 50%;" />
  <p style="font-size: 0.95em;"><strong>
    Fig. 5: The execution time of Hadoop applications
  </strong></p>
</div>

#### 2）可扩展性测试（Scalability Tests）

我们选择了三个应用进行可扩展性测试，用于观察在输入数据规模不断增长时，程序执行时间的增长趋势。

在本轮测试中，我们仍设置以下参数：

- 参数个数 $N = 10$；
- 缓存大小 $W = 10,\!000$；
- 混淆度 $d = 0\%$, $30\%$, $50\%$。

对于 **Word Count** 与 **Tera Sort** 应用，我们将输入数据量从 1GB 逐渐增加至 6GB。对于 **PageRank**，我们将需要处理的网页数从 50,000 逐渐增长到 300,000。

我们以原始应用在相同输入下的执行时间作为基准，对比每组设置下的执行耗时，结果如图 6 所示。

<div style="width: 100%; margin: auto; text-align: center;">
  <img src="/assets/images/scholar/CFHider：基于Intel SGX的控制流混淆/figure6.png" style="width: 100%;" />
</div>

根据图示：

- 在多数情况下（除 PageRank 在 $d = 50\%$ 的情况外），执行时间几乎随着输入线性增长；
- 增长速率与基准程序相当；
- 但在 $d = 50\%$ 情况下，PageRank 的执行时间增长速率**快于基准程序**。

进一步分析表明：频繁调用的循环块中插入了大量假分支语句，导致 CFQ 调用次数增加，从而产生额外开销。

综上，CFHider 展现了良好的可扩展性。

#### 3）CPU 密集型应用测试（CPU Intensive Applications）

由于 Hadoop 应用的负载主要集中在客户程序部分（而 Hadoop 框架和通信部分未受到 CFHider 影响），因此其开销被摊薄。为了更准确评估 CFHider 的原始开销，我们选择在单台 **Lenovo T460 笔记本**上运行三个 CPU 密集型 Java 应用：

- 二分查找（Binary Search）  
- 冒泡排序（Bubble Sort）  
- 快速排序（Quick Sort）  

（测试详情见表 IV）

每个测试用例的数据集为随机生成的 100 个整数。运行时参数配置如下：

- $N = 10$；
- $W = 0$（即禁用 LRU 缓存）；
- $d = 0\%$（不插入假分支语句）。

<div style="width: 100%; margin: auto; text-align: center;">
  <img src="/assets/images/scholar/CFHider：基于Intel SGX的控制流混淆/table4.png" style="width: 50%;" />
</div>

根据表 IV，不同程序产生的性能开销为原始程序的 2.9 到 3.7 倍之间。

进一步分析表明：开销主要来自 CFQ 函数的调用次数。调用越多，开销越大。

每次 CFQ 调用的平均耗时为：$4.31 \mu s$

相比之下，文献 [4] 中基于软件的方法每次受保护条件执行耗时为：$38.19 \mu s$

我们的方法在性能开销上降低了 **8.8 倍**。

## 7. 相关工作（Related Work）

### A. 程序机密性保护（Program Confidentiality Protection）

控制流混淆（Control flow obfuscation）在过去几十年中已被广泛研究 [18]。正如第一节所述，现有的软件层方法 [1][3][4] 无法同时满足安全性、性能与通用性三者。

例如，Wang 等人 [19] 在分支条件中引入了未解的数学猜想，以增加符号执行逆向分析的难度。然而，这种方法容易被模式匹配击败，因为可用于构造猜想的数学形式数量有限。

Lan 等人 [4] 与 Wang 等人 [5] 提出了将条件语句替换为 lambda 演算与图灵机仿真的方法，确实可以抵御基于符号执行的逆向工程攻击。但他们的方法带来了非常高的性能开销。

Wang 等人 [20] 还研究了混合云架构，提出将条件语句放入私有云中执行，其余计算仍在公有云中完成。借助其提出的**持续缓存（continuous cache）**机制，该方法能在一定程度上降低开销（14.9%-33.2%），但无法提供严格的安全保证。

### B. SGX 应用研究（SGX Applications）

**Intel Software Guard Extension (SGX)** [15] 近年来受到广泛关注。已有大量系统尝试基于 SGX 提供安全计算服务，适用于不同应用场景。

- **Haven** [6]：支持在 SGX 硬件与通用操作系统上运行遗留的 Windows 应用，从而提高计算的完整性与机密性。但它需将一个库操作系统加载进 enclave 中，导致 TCB（Trusted Computing Base）体积巨大，难以提供安全保障，仅能提高攻击门槛。

- **Graphene-SGX** [7]：将 Graphene 库操作系统移植进 SGX，使一批 Linux 应用能在 SGX 中运行（如 Lighttpd、Apache、NGINX）。其仅缩小了 TCB 规模，**仍未提供安全保证**。

- **Glamdring** [9] 与 **Ryoan** [21]：侧重于保护**数据机密性**，而无法保护**程序控制流的机密性**。

部分工作使用 SGX 来保护特定应用的执行安全，例如：

- EnclaveDB [22]：数据库系统  
- VC3 [10]：MapReduce 的 C++ 版本  
- Apache ZooKeeper [23] 等

## 8. Conclusion

本文提出并实现了一种基于硬件辅助的解决方案 —— **CFHider**，用于在公有云环境中保护程序的控制流机密性。

通过理论分析与实验验证，我们表明 CFHider 能有效保护控制流的机密性，满足安全性、表达能力与性能三方面的需求。


## References

[1] C. Wang, J. Davidson, J. Hill, and J. Knight, “Protection of softwarebased survivability mechanisms,” in Dependable Systems and Networks, 2001. DSN 2001. International Conference on. IEEE, 2001, pp. 193– 202.

[2] S. K. Udupa, S. K. Debray, and M. Madou, “Deobfuscation: Reverse engineering obfuscated code,” in Reverse Engineering, 12th Working Conference on. IEEE, 2005, pp. 10–pp.

[3] M. I. Sharif, A. Lanzi, J. T. Giffin, and W. Lee, “Impeding malware analysis using conditional code obfuscation.” in NDSS, 2008.

[4] P. Lan, P. Wang, S. Wang, and D. Wu, “Lambda obfuscation,” in International Conference on Security and Privacy in Communication Systems. Springer, 2017, pp. 206–224.

[5] Y. Wang, S. Wang, P. Wang, and D. Wu, “Turing obfuscation,” in International Conference on Security and Privacy in Communication Systems. Springer, 2017, pp. 225–244.

[6] A. Baumann, M. Peinado, and G. Hunt, “Shielding applications from an untrusted cloud with haven,” in Proceedings of the 11th USENIX Conference on Operating Systems Design and Implementation, ser. OSDI’14. Berkeley, CA, USA: USENIX Association, 2014, pp. 267– 283.

[7] C.-C. Tsai, D. E. Porter, and M. Vij, “Graphene-SGX: A practical library OS for unmodified applications on SGX,” in 2017 USENIX Annual Technical Conference (USENIX ATC), 2017.

[8] S. Arnautov, B. Trach, F. Gregor, T. Knauth, A. Martin, C. Priebe, J. Lind, D. Muthukumaran, D. O’keeffe, M. Stillwell et al, “SCONE: Secure linux containers with Intel SGX,” in OSDI, vol. 16, 2016, pp. 689–703.

[9] J. Lind, C. Priebe, D. Muthukumaran, D. O’Keeffe, P.-L. Aublin, F. Kelbert, T. Reiher, D. Goltzsche, D. Eyers, R. Kapitza et al, “Glamdring: Automatic application partitioning for Intel SGX,” in 2017 USENIX Annual Technical Conference (USENIX ATC 17), 2017, pp. 285–298.

[10] F. Schuster, M. Costa, C. Fournet, C. Gkantsidis, M. Peinado, G. MainarRuiz, and M. Russinovich, “VC3: Trustworthy data analytics in the cloud using SGX,” in Security and Privacy (SP), 2015 IEEE Symposium on. IEEE, 2015, pp. 38–54.

[11] I. Anati, S. Gueron, S. Johnson, and V. Scarlata, “Innovative technology for cpu based attestation and sealing,” in Proceedings of the 2nd international workshop on hardware and architectural support for security and privacy, vol. 13, 2013.

[12] F. McKeen, I. Alexandrovich, A. Berenzon, C. V. Rozas, H. Shafi, V. Shanbhogue, and U. R. Savagaonkar, “Innovative instructions and software model for isolated execution.” in HASP@ ISCA, 2013, p. 10.

[13] J. Van Bulck, M. Minkin, O. Weisse, D. Genkin, B. Kasikci, F. Piessens, M. Silberstein, T. F. Wenisch, Y. Yarom, and R. Strackx, “Foreshadow: Extracting the keys to the Intel SGX kingdom with transient out-of-order execution,” in 27th USENIX Security Symposium (USENIX Security 18), 2018, pp. 991–1008.

[14] V. Aho Alfred, S. Ravi, and D. Ullman Jeffrey, “Compilers: principles, techniques, and tools,” Reading: Addison Wesley Publishing Company, p. 466, 1986.

[15] V. Costan and S. Devadas, “Intel SGX explained.” IACR Cryptology ePrint Archive, vol. 2016, p. 86, 2016.

[16] O. Weisse, V. Bertacco, and T. Austin, “Regaining lost cycles with HotCalls: A fast interface for SGX secure enclaves,” in Proceedings of the 44th Annual International Symposium on Computer Architecture, ser. ISCA ’17. New York, NY, USA: ACM, 2017, pp. 81–93.

[17] S. Huang, J. Huang, J. Dai, T. Xie, and B. Huang, “The HiBench benchmark suite: Characterization of the MapReduce-based data analysis,” in Data Engineering Workshops (ICDEW), 2010 IEEE 26th International Conference on, March 2010, pp. 41–51.

[18] C. Collberg, C. Thomborson, and D. Low, “Manufacturing cheap, resilient, and stealthy opaque constructs,” in Proceedings of the 25th ACM SIGPLAN-SIGACT symposium on Principles of programming languages. ACM, 1998, pp. 184–196.

[19] Z. Wang, J. Ming, C. Jia, and D. Gao, “Linear obfuscation to combat symbolic execution,” in European Symposium on Research in Computer Security. Springer, 2011, pp. 210–226.

[20] Y. Wang and J. Wei, “Toward protecting control flow confidentiality in cloud-based computation,” Computers & Security, vol. 52, pp. 106–127, 2015.

[21] T. Hunt, Z. Zhu, Y. Xu, S. Peter, and E. Witchel, “Ryoan: a distributed sandbox for untrusted computation on secret data,” in 12th USENIX Symposium on Operating Systems Design and Implementation (OSDI 16). USENIX Association, 2016, pp. 533–549.

[22] C. Priebe, K. Vaswani, and M. Costa, “EnclaveDB: A secure database using SGX,” in 2018 IEEE Symposium on Security and Privacy (SP), pp. 405–419.

[23] S. Brenner, C. Wulf, D. Goltzsche, N. Weichbrodt, M. Lorenz, C. Fetzer, P. Pietzuch, and R. Kapitza, “SecureKeeper: Confidential ZooKeeper using Intel SGX,” in Proceedings of the 16th Annual Middleware Conference (Middleware), 2016.
