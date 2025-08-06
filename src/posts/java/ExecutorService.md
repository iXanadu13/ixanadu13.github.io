---
icon: pen-to-square
date: 2025-08-06
category:
  - Java
tag:
  - 死锁
---

# ExecutorService 死锁

## 问题分析

今天偶然看到一道死锁分析的题，代码如下：

```java
package com.github.ixanadu13;

import org.junit.jupiter.api.Test;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ExecutorTest {
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    class LocalTFileTask implements Callable<String> {
        @Override
        public String call() throws Exception {
            return "";
        }
    }
    class RenderPageTask implements Callable<String> {
        @Override
        public String call() throws Exception {
            final Future<String> f1 = executor.submit(new LocalTFileTask());
            final Future<String> f2 = executor.submit(new LocalTFileTask());
            return f1.get() + f2.get();
        }
    }
    public void renderPage() throws Exception{
        Future<String> page = executor.submit(new RenderPageTask());
        page.get();
    }
    @Test
    public void test() throws Exception {
        var test = new ExecutorTest();
        test.renderPage();
    }
}
```

答案是以上代码确实存在死锁问题，因为我们把**单线程线程池**同时当成“父任务”和“子任务”的执行器。（不是发生在`f1.get() + f2.get()`，而是`page.get()`和`f1.get()`死锁）

非常合理，如果你把线程池换成`Executors.newCachedThreadPool()`，确实能顺利消除死锁。

但如果你用main函数替换JUnit的test函数，你会发现似乎还是死锁了：

![](/assets/images/java/Executor死锁.png)

但其实这并不是，而是`Executors.newCachedThreadPool()`创建了**非守护线程（non-daemon）**，即使任务都跑完了，这些工作线程也会**空闲存活一段时间（默认60s keepAlive）**后才退出。因此我们应该主动调用`test.executor.shutdown()`去关闭它。

加上之后运行，ok一切顺利。

```java
package com.github.ixanadu13;

import org.junit.jupiter.api.Test;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ExecutorTest {
    private final ExecutorService executor = Executors.newCachedThreadPool();
    class LocalTFileTask implements Callable<String> {
        @Override
        public String call() throws Exception {
            return "";
        }
    }
    class RenderPageTask implements Callable<String> {
        @Override
        public String call() throws Exception {
            final Future<String> f1 = executor.submit(new LocalTFileTask());
            final Future<String> f2 = executor.submit(new LocalTFileTask());
            return f1.get() + f2.get();
        }
    }
    public void renderPage() throws Exception{
        Future<String> page = executor.submit(new RenderPageTask());
        page.get();
    }
    public static void main(String[] args) throws Exception{
        var test = new ExecutorTest();
        test.renderPage();
        test.executor.shutdown();
    }
//    @Test
//    public void test() throws Exception {
//        var test = new ExecutorTest();
//        test.renderPage();
//    }
}
```

## 非守护线程（user thread）和 守护线程（daemon thread）的区别

### 核心概念
- **非守护线程**：默认类型。**只要还有任意一个非守护线程在运行，JVM 就不会退出**。

- **守护线程**：后台服务性质。**当只剩守护线程时，JVM 会直接退出**；退出时不保证这些线程还能把工作做完。

### JVM 退出规则
- 进程退出条件：**所有非守护线程都结束**（或调用`System.exit`）。

- 只剩守护线程 → JVM 立刻开始关机流程：运行 shutdown hooks（如果有），然后**不等待守护线程**正常收尾；守护线程的 finally、落盘、网络发送等都**不一定来得及完成**。

### 适用场景
- **非守护线程**：与业务正确性直接相关的工作（处理请求、计算任务、写文件、数据库操作等）。

- **守护线程**：缓存清理、心跳/监控上报、定时清扫这类最好做但可被中断的后台工作。

### 常见风险与误区
- **用守护线程做关键任务**：主程序结束时任务会被“硬切”，可能丢数据。

- **用非守护线程却不关闭**：即使任务早就做完，线程还在空闲期内存活（如线程池 keepAlive 60s），**会让进程迟迟不退出**——这就是你在 `main()` 里看到的现象。

- `setDaemon(true)` 必须在 `start()` 之前调用；启动后再改会抛异常。

- Executors 默认创建的是**非守护线程**（所以要记得 shutdown()）。

因此在Java中，`new Thread`创建的线程开始运行后，即使没有调用`join()`，主线程也会等待其运行完毕，因为默认创建的就是非守护线程。