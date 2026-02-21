---
icon: pen-to-square
date: 2024-12-26
category:
  - VSCode
  - ts
---

# TS开发笔记

## 解决vscode报错：找不到“cookie”的类型定义文件。程序包含该文件是因为: 隐式类型库 "cookie" 的入口点ts

第一步：清理yarn缓存

```bash
yarn cache clean
```

第二步：删除node_modules文件夹和yarn.lock

第三步：重新下载依赖

```bash
yarn install
```

然后你就会发现报错已经消失辣~

## VSCode TS报错：找不到div

照着StackoverFlow上的[帖子](https://stackoverflow.com/questions/64974648/problem-with-visual-studio-code-using-react-jsx-as-jsx-value-with-create-react/64976666#64976666)，暂时解决了这个问题。

解决方法：[https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript)

## React + TS 异步函数竞态条件

### useEffect中使用异步函数

下面这段代码是经典的useEffect中使用异步函数初始化的坑：

```ts
useEffect(() => {
  let unregister: (() => void) | undefined

  console.log("register")
  const setup = async () => {
    unregister = await TaskEventManager.register(
      "init_workspace",
      (payload) => {
        switch (payload.stage) {
          case "progress": {
            updateToast(
              payload.progress,
              payload.message
            )
            break
          }
          case "increase_progress": {
            console.log("increase_progress", payload.progress, payload.message)
            console.log("current: ", progressRef.current + payload.progress!)
            updateToast(
              progressRef.current + (payload.progress ?? 0),
              payload.message
            )
            break
          }
          case "done": {
            break
          }
          case "error": {
            break
          }
        }
      }
    )
  }

  setup()

  return () => {
    console.log("unregister: ", unregister)
    unregister?.()
  }
}, [])
```

如果开启React.StrictMode，在控制台看到的打印大概率如下：

```
register
unregister: undefined
register
```

应修改为：

```ts
useEffect(() => {
  let unregister: (() => void) | undefined
  let cancelled = false　// [!code ++]

  console.log("register")
  const setup = async () => {
    unregister = await TaskEventManager.register(　// [!code --]
    const fn = await TaskEventManager.register( // [!code ++]
      "init_workspace",
      (payload) => {
        switch (payload.stage) {
          case "progress": {
            updateToast(
              payload.progress,
              payload.message
            )
            break
          }
          case "increase_progress": {
            console.log("increase_progress", payload.progress, payload.message)
            console.log("current: ", progressRef.current + payload.progress!)
            updateToast(
              progressRef.current + (payload.progress ?? 0),
              payload.message
            )
            break
          }
          case "done": {
            break
          }
          case "error": {
            break
          }
        }
      }
    )

    if (cancelled) { // [!code ++]
      // StrictMode 第一次 cleanup 之后才 resolve // [!code ++]
      fn() // [!code ++]
      console.log("unregister: ", fn) // [!code ++]
    } else { // [!code ++]
      unregister = fn // [!code ++]
    } // [!code ++]
  }

  setup()

  return () => {
    cancelled = true // [!code ++]
    console.log("unregister: ", unregister)
    unregister?.()
  }
}, [])
```

### 初始化中的竞态条件

这里的initialized未能正确地锁住两个线程的并发访问，会造成重复监听的问题：

```ts
type TaskHandler = (payload: TaskEventPayload) => void

class TaskEventManager {
  private static unlistenFn: UnlistenFn | null = null
  private static handlers: Map<string, Set<TaskHandler>> = new Map()
  private static initialized = false

  /**
   * 初始化监听（只执行一次）
   */
  static async init() {
    if (this.initialized) return

    this.unlistenFn = await listen<TaskEventPayload>(
      "task-event",
      (event) => {
        const payload = event.payload
        const taskHandlers = this.handlers.get(payload.task)

        if (!taskHandlers) return

        taskHandlers.forEach((handler) => {
          handler(payload)
        })
      }
    )

    this.initialized = true
  }

  /**
   * 注册任务监听
   */
  static async register(task: string, handler: TaskHandler) {
    await this.init()

    if (!this.handlers.has(task)) {
      this.handlers.set(task, new Set())
    }

    this.handlers.get(task)!.add(handler)

    return () => {
      this.handlers.get(task)?.delete(handler)
    }
  }

  /**
   * 移除所有监听
   */
  static disposeAll() {
    this.unlistenFn?.()
    this.handlers.clear()
    this.unlistenFn = null
    this.initialized = false
  }
}

export default TaskEventManager
```

修改为：

```ts
type TaskHandler = (payload: TaskEventPayload) => void

class TaskEventManager {
  private static unlistenFn: UnlistenFn | null = null
  private static handlers: Map<string, Set<TaskHandler>> = new Map()

  private static initialized = false // [!code --]
  // [!code ++]
  // 🔥 关键：用 Promise 作为初始化锁 // [!code ++]
  private static initPromise: Promise<void> | null = null // [!code ++]

  /**
   * 初始化监听（只执行一次）
   */
  static async init() {
    if (this.initialized) return // [!code --]
    if (this.initPromise) { // [!code ++]
      return this.initPromise // [!code ++]
    } // [!code ++]

    this.initPromise = (async () => { // [!code ++]
      this.unlistenFn = await listen<TaskEventPayload>(
        "task-event",
        (event) => {
          const payload = event.payload
          const taskHandlers = this.handlers.get(payload.task)
  
          if (!taskHandlers) return
  
          taskHandlers.forEach((handler) => {
            handler(payload)
          })
        }
      )
    })() // [!code ++]

    this.initialized = true // [!code --]
    return this.initPromise // [!code ++]
  }

  /**
   * 注册任务监听
   */
  static async register(task: string, handler: TaskHandler) {
    await this.init()

    if (!this.handlers.has(task)) {
      this.handlers.set(task, new Set())
    }

    this.handlers.get(task)!.add(handler)

    return () => {
      this.handlers.get(task)?.delete(handler)
    }
  }

  /**
   * 移除所有监听
   */
  static disposeAll() {
    this.unlistenFn?.()
    this.handlers.clear()
    this.unlistenFn = null
    this.initialized = false // [!code --]
    this.initPromise = null // [!code ++]
  }
}

export default TaskEventManager
```