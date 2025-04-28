---
icon: pen-to-square
date: 2025-04-28
category:
  - Java
tag:
  - 多线程
---

# Java线程同步方法对比

|       |Thread#sleep|Object#wait|LockSupport#park|
|:---:|:---:|:---:|:---:|
|调用方式|抛出中断异常|必须在synchronized块中、抛出中断异常。如果当前线程不是对象锁的拥有者，调用wait/notify会抛出 IllegalMonitorStateException 异常|无限制，无抛出|
|阻塞时是否释放当前线程占有的锁|**不释放**|**释放**|**不释放**|
|传入参数|必须传入时间|可选传入超时时间|可选传入超时时间、阻塞原因blocker|
|唤醒方式|无法从外部唤醒|Object#notify，还需抢锁成功。**wait前调用notify无效**|LockSupport#unpark，唤醒传入的执行线程。**park前调用unpark有效**|
|中断响应|抛出中断异常，清除中断标志位|抛出中断异常，清除中断标志位|park方法返回，不抛异常，中断响应位依然为true|
|底层实现|native方法Thread#sleep0|native方法Object#wait0|调用Unsafe#park。类似只有一个许可证的Semaphore，且重复执行最多获得一个许可证|
