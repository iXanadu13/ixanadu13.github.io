---
icon: pen-to-square
date: 2025-01-26
category:
  - Java
tag:
  - Log
---
# Java中的日志库

## 主要日志系统

### JUL 
Java标准库`java.util.logging`，但不常用。

### Log4j 
Log4j 的短板在于性能，在Logback 和 Log4j2 出来之后，Log4j的使用也减少了。

### Logback
同样由Log4j的作者开发，提供了性能更好的实现，异步 logger，Filter等更多的特性。

### Log4j2
由Log4j维护者开发，诞生晚于logback，因此吸收了slf4j和logback的一些优点（比如日志模板），性能也比较好。在设计上分离Facade和Implementation，即`log4j-api`和 `log4j-core`。

log4j2实现了“无垃圾”和“低垃圾”模式。简单地说，log4j2在记录日志时，能够重用对象（如String等），尽可能避免实例化新的临时对象，减少因日志记录产生的垃圾对象，减少垃圾回收带来的性能下降


## 日志Facade（抽象框架）

### common-logging

common-logging 是 apache 的一个开源项目。也称Jakarta Commons Logging，缩写 JCL，支持多种具体日志实现（如 Log4j、JUL）。
但它在编译时会进行静态绑定，将代码和日志实现绑定在一起。如果需要切换日志框架，就必须重新引入特定的 JAR 包，这样的机制显得麻烦且不够灵活。

### slf4j

全称为 Simple Logging Facade for Java，采用运行时动态绑定，开发者只需依赖 SLF4J 接口，具体的日志实现可以通过运行时选择（如 Logback、Log4j 等），无需修改代码或重新编译，极大提高了灵活性。

同样由Log4j、logback的作者Ceki Gulcu开发。

在 Common-Logging 或其他传统日志框架中，为了避免无意义的字符串拼接开销，通常需要手动检查日志级别是否启用，例如：

```java
if (logger.isDebugEnabled()) {
    logger.debug("id: " + id + ", name: " + name);
}
```

而slf4j提供了更便捷的方式：

```java
logger.debug("id: {}, name: {}", id, name);
```

无需手动检查日志级别，SLF4J 会在底层自动优化，避免不必要的字符串拼接。且代码更简洁，提升开发效率。


## 注意事项

以下写法中存在问题，即使日志级别高于debug，不需输出日志，也会执行字符串拼接、调用toJson方法：

```java
// 即使不输出，也会执行字符串拼接
logger.debug("start process request, url: " + url);
// 即使不输出，也会调用toJson方法
logger.debug("receive request: {}", toJson(request));
```

正确写法：

```java
// 没有多余计算开销
logger.debug("start process request, url: {}", url); // slf4j/log4j2
// 采用懒求值
logger.debug("receive request: {}", () -> toJson(request)); // log4j2
logger.debug(() -> "receive request: " + toJson(request)); // log4j2
// 回归原始，做额外判断
if (logger.isDebugEnabled()) { // slf4j/log4j2
    logger.debug("receive request: " + toJson(request)); 
}
```

此外，不应在程序中滥用获取当前caller、行号、函数名等等属性，因为基本上这些实现都基于堆栈信息stacktrace，而获取堆栈信息的代价是昂贵的。

