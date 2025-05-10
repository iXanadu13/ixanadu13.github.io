---
icon: pen-to-square
date: 2024-12-11
category:
  - Rust
tag:
  - data structure
---

# Rust 学习笔记

Rust具有一些让人眼前一亮的特点：无GC也不需手动管理内存、高性能、安全性强等等。但其诸多优点背后的代价，就是学习曲线相当陡峭。

Rust的困难，不在于语言特性，而在于：

- 具体实践中如何运用学到的技巧
- 遇到了坑时（生命周期、借用错误，自引用等）如何迅速、正确的解决
- 大量的标准库API的熟练使用，这是保证开发效率的关键

## 使用原生指针和unsafe实现自引用

algo.course.rs上的实现，在此记录一下

```rust
pub struct Tree {
    count: usize,
    root: *mut Node,
}

#[derive(Debug)]
struct Node {
    data: i32,

    // Null指针这里代表"None`; right.is_null() ==> 没有right child
    left: *mut Node,
    right: *mut Node,
    parent: *mut Node,
}

impl Tree {
    pub fn new() -> Self {
        Self {
            count: 0,
            root: std::ptr::null_mut(),
        }
    }

    // 返回tree的节点数量
    pub fn node_count(&self) -> usize {
        assert!(self.count != 0 || self.root.is_null());
        self.count
    }


    // 在tree中新增一项，插入成功则返回true,若给定的数据在tree上已经存在，则返回false
    pub fn insert(&mut self, data: i32) -> bool {
        if self.root.is_null() {
            self.root = Node::new(data);
        } else {
            if !insert_node(self.root, data) {
                return false;
            }
        }

        self.count += 1;
        true
    }

    // 找到tree上的指定项，若找到，返回true
    pub fn find(&self, data: i32) -> bool {
        !find_node(self.root, data).is_null()
    }

    // 返回tree的字符串形式，用于Debug
    pub fn display(&self) -> String {
        display_node(self.root, 0)
    }

    // 使用中序遍历来返回tree中的所有数据
    pub fn inorder(&self) -> Vec<i32> {
        let mut v = vec![];
        if !self.root.is_null() {
            let mut node = leftmost_child(self.root);
            loop {
                if node.is_null() {
                    break;
                }
                unsafe {
                    v.push((*node).data);
                }
                node = successor_of_node(node);
            }
        }
        v
    }

    // 从tree上移除指定项, 若该项存在且被成功移除，则返回true，否则都返回false
    pub fn remove(&mut self, data: i32) -> bool {
        let node = find_node(self.root, data);
        if node.is_null() {
            false
        } else {
            self.remove_node(node);
            self.count -= 1;
            true
        }
    }

    // 在tree上找到指定项的继任者
    pub fn successor(&self, data: i32) -> Option<i32> {
        unsafe {
            let node = find_node(self.root, data);
            if !node.is_null() {
                let nodesucc = successor_of_node(node);
                if !nodesucc.is_null() {
                    return Some((*nodesucc).data);
                }
            }
            None
        }
    }

    // 从tree上移除指定的节点
    fn remove_node(&mut self, node: *mut Node) {
        unsafe {
            let lchild = (*node).left;
            let rchild = (*node).right;
            if lchild.is_null() && rchild.is_null() {
                // 节点没有子节点，所以可以安全移除
                self.replace_node(node, std::ptr::null_mut());
            } else if !lchild.is_null() && !rchild.is_null() {
                // 节点的左右子节点都在，我们需要找到该节点的继任者，然后将继任者的数据赋给当前节点，然后再递归删除继任者
                let succ = successor_of_node(node);
                assert!(!succ.is_null());
                (*node).data = (*succ).data;
                self.remove_node(succ);
            } else if !lchild.is_null() {
                // 节点只有左子节点，所以使用后者替代前者
                self.replace_node(node, lchild);
            } else if !rchild.is_null() {
                // 节点只有右子节点，所以使用后者替代前者
                self.replace_node(node, rchild);
            } else {
                panic!("unreachable");
            }
        }
    }

    // 使用`r`节点来替换目标`node`节点
    fn replace_node(&mut self, node: *mut Node, r: *mut Node) {
        unsafe {
            let parent = (*node).parent;
            if parent.is_null() {
                // Removing the root node.
                self.root = r;
                if !r.is_null() {
                    (*r).parent = std::ptr::null_mut();
                }
            } else {
                if !r.is_null() {
                    (*r).parent = parent;
                }
                if (*parent).left == node {
                    (*parent).left = r;
                } else if (*parent).right == node {
                    (*parent).right = r;
                }
            }

            // 被替换的节点不再被使用，因此可以回收它：通过`Box`拿走它的所有权，然后它会被自动drop
            Box::from_raw(node);
        }
    }
}

impl Drop for Tree {
    fn drop(&mut self) {
        // 也许不是性能最高的实现，但是简单，而且有用
        while !self.root.is_null() {
            self.remove_node(self.root);
        }
    }
}

impl Node {
    fn new(data: i32) -> *mut Self {
        Box::into_raw(Box::new(Self {
            data,
            left: std::ptr::null_mut(),
            right: std::ptr::null_mut(),
            parent: std::ptr::null_mut(),
        }))
    }

    fn new_with_parent(data: i32, parent: *mut Node) -> *mut Self {
        Box::into_raw(Box::new(Self {
            data,
            left: std::ptr::null_mut(),
            right: std::ptr::null_mut(),
            parent,
        }))
    }
}

// 在节点子树上创建新的节点
fn insert_node(node: *mut Node, data: i32) -> bool {
    unsafe {
        if (*node).data == data {
            false
        } else if data < (*node).data {
            if (*node).left.is_null() {
                (*node).left = Node::new_with_parent(data, node);
                true
            } else {
                insert_node((*node).left, data)
            }
        } else {
            if (*node).right.is_null() {
                (*node).right = Node::new_with_parent(data, node);
                true
            } else {
                insert_node((*node).right, data)
            }
        }
    }
}

// 在`fromnode`的子树上寻找目标数据，如果没找到则返回`null`
fn find_node(fromnode: *mut Node, data: i32) -> *mut Node {
    unsafe {
        if fromnode.is_null() || (*fromnode).data == data {
            fromnode
        } else if data < (*fromnode).data {
            find_node((*fromnode).left, data)
        } else {
            find_node((*fromnode).right, data)
        }
    }
}


// 返回`node`子树的字符串形式，同时指定缩进字符数
fn display_node(node: *const Node, indent: usize) -> String {
    let indent_str = " ".repeat(indent);
    if node.is_null() {
        indent_str + ".\n"
    } else {
        unsafe {
            let mut s = format!("{}{}\n", indent_str, (*node).data);
            s.push_str(&display_node((*node).left, indent + 2));
            s.push_str(&display_node((*node).right, indent + 2));
            s
        }
    }
}

// 找到`node`最左边的子节点，如果没有，就返回`node`自身, `node`不能为null
fn leftmost_child(node: *mut Node) -> *mut Node {
    unsafe {
        if (*node).left.is_null() {
            node
        } else {
            leftmost_child((*node).left)
        }
    }
}


// 在tree上找到`node`的继任者
fn successor_of_node(node: *mut Node) -> *mut Node {
    unsafe {
        if !(*node).right.is_null() {
            // 若node有一个右子节点，则继任者是该右子节点的最左子节点，若该右子节点没有子节点，则继任者就是右子节点
            leftmost_child((*node).right)
        } else {
            // 没有右子节点，则找到一个父节点，当前node是该父节点的左子节点, 若在root之前都没找到，说明node没有继任者
            parent_with_left(node)
        }
    }
}

// 在`node`的祖先中找到它的父节点,且`node`必须是该父节点的左子节点
fn parent_with_left(node: *mut Node) -> *mut Node {
    unsafe {
        // 若`node`有父节点，且该父节点拥有左子节点，同时`node`就是这个左子节点，那么该父节点就是我们的目标
        let parent = (*node).parent;
        if !parent.is_null() {
            if std::ptr::eq((*parent).left, node) {
                return parent;
            }
            return parent_with_left(parent);
        }

        // `node`没有父节点
        std::ptr::null_mut()
    }
}

fn main() {
    
}
```

## 将局部变量生命周期变为'static

### Problem

![](/assets/images/rust/make-variable-static1.png)

### Solution

使用`leak`、`Box::leak`等方法：

![](/assets/images/rust/make-variable-static2.png)


## 错误处理相关

### 将Option类型转换为Result类型

使用`ok_or`方法：

```rust
fn foo(abs_path: &str) -> Result<String, String> {
    let path = PathBuf::from(abs_path);
    let relative = path.file_name()
        .ok_or(format!("Failed to get relative_name for `{}`", abs_path))?;
    let res = relative.to_str().unwrap();
    Ok(res.to_owned())
}
```

### 将Result类型转换为Option类型

使用`ok`方法：

```rust
fn divide(dividend: f64, divisor: f64) -> Result<f64, String> {
    if divisor == 0.0 {
        Err(String::from("除数不能为零"))
    } else {
        Ok(dividend / divisor)
    }
}
#[test]
fn test_divide() {
    let result_ok: Result<f64, String> = divide(10.0, 2.0);
    let option_some: Option<f64> = result_ok.ok();
    assert_eq!(option_some, Some(5.0));

    let result_err: Result<f64, String> = divide(10.0, 0.0);
    let option_none: Option<f64> = result_err.ok();
    assert_eq!(option_none, None);
}
```

### Option#transpose()

将`Option<Result<T, E>>`转换为`Result<Option<T>, E>`：

```rust
#[derive(Debug, Eq, PartialEq)]
struct SomeErr;

let x: Result<Option<i32>, SomeErr> = Ok(Some(5));
let y: Option<Result<i32, SomeErr>> = Some(Ok(5));
assert_eq!(x, y.transpose());
```


## 全局变量

在Rust中，出于安全性的考量，全局变量的使用并不像C++那样简单。这样很容易理解，如果定义一个不受保护的全局变量，在多个线程同时修改、写的同时有线程读等情况下，很容易出现脏数据。

当然也不是完全禁止全局字段，以下记录几种常用的解决方式：

### 启动时初始化，后续只读

使用强大的社区库`lazy_static`：

```toml
[dependencies]
lazy_static = "1.5.0"
```

```rust
use lazy_static::lazy_static;
use std::collections::HashMap;

lazy_static! {
    static ref HASHMAP: HashMap<u32, &'static str> = {
        let mut m = HashMap::new();
        m.insert(0, "foo");
        m.insert(1, "bar");
        m.insert(2, "baz");
        m
    };
}

fn main() {
    // First access to `HASHMAP` initializes it
    println!("The entry for `0` is \"{}\".", HASHMAP.get(&0).unwrap());

    // Any further access to `HASHMAP` just returns the computed value
    println!("The entry for `1` is \"{}\".", HASHMAP.get(&1).unwrap());
}
```

在rust 1.70之后，也可以直接使用标准库中的`OnceLock`：

```rust
use std::collections::HashMap;
use std::sync::OnceLock;

fn hashmap() -> &'static HashMap<u32, &'static str> {
    static HASHMAP: OnceLock<HashMap<u32, &str>> = OnceLock::new();
    HASHMAP.get_or_init(|| {
        let mut m = HashMap::new();
        m.insert(0, "foo");
        m.insert(1, "bar");
        m.insert(2, "baz");
        m
    })
}

fn main() {
    // First access to `HASHMAP` initializes it
    println!("The entry for `0` is \"{}\".", hashmap().get(&0).unwrap());

    // Any further access to `HASHMAP` just returns the computed value
    println!("The entry for `1` is \"{}\".", hashmap().get(&1).unwrap());
}
```

使用unsafe裸指针：
https://stackoverflow.com/questions/63433547/more-efficient-alternative-to-thread-local-and-lazy-static


最优实践是使用[phf](https://crates.io/crates/phf)库，在编译期生成「完美哈希表」，零运行时不存在锁开销：

```rs
static KEYWORDS: phf::Map<&'static str, Tok> = phf::phf_map! {
    ".version" => Tok::Version,
    ".class" => Tok::Class,
    ".super" => Tok::Super,
    ".implements" => Tok::Implements,
    ".sourcefile" => Tok::SourceFile,
    ".field" => Tok::Field,
    ".method" => Tok::Method,
    ".code" => Tok::Code,
    ".line" => Tok::LineNumber(0),
    ".local" => Tok::Local,
    ".stack" => Tok::Stack,
    ".end" => Tok::End,
};
```

### 运行时需要修改

```rust
use std::sync::Mutex;
use lazy_static::lazy_static;
lazy_static! {
    static ref NAMES: Mutex<String> = Mutex::new(String::from("Sunface, Jack, Allen"));
}

fn main() {
    let mut v = NAMES.lock().unwrap();
    v.push_str(", Myth");
    println!("{}",v);
}
```

当然，每次访问时会有轻微的性能损失，为了支持多线程这是不可避免的。

## 遍历集合时需要移除某些元素

### 移除确定范围的元素

```rust
let mut v = vec![1, 2, 3];
let u: Vec<_> = v.drain(1..).collect();
assert_eq!(v, &[1]);
assert_eq!(u, &[2, 3]);
```

### Vec::drain_filter

无法在stable下使用：[https://rustwiki.org/zh-CN/src/alloc/vec/drain_filter.rs.html](https://rustwiki.org/zh-CN/src/alloc/vec/drain_filter.rs.html)

### Vec::retain

适用于**不需要关心哪些元素被删除**的情况

```rust
let mut vecc = vec![1, 2, 3, 4];
vecc.retain(|&x| x != 1);
assert_eq!(vecc, [2, 3, 4]);
```

### 使用swap换出元素

```rust
let mut vecc = vec![1, 2, 3, 4];

let mut idx_wr = 0usize; // 写指针
for idx_rd in 0..vecc.len() {
    // 读指针
    if !(vecc[idx_rd] == 1) {
        vecc.swap(idx_wr, idx_rd);
        idx_wr += 1;
    }
}
// 在truncate之前可以操作即将被删除的元素
vecc.truncate(idx_wr);
assert_eq!(vecc, [2, 3, 4]);
```

或者用swap_remove，缺点是容易写错：

```rust
// 正确写法
let mut idx = 0;
while idx < bank.len() {
    let nxt = &bank[idx];
    if Solution::ok(&str, nxt) {
        let nxt = bank.swap_remove(idx);
        q.push_back((nxt, step + 1));
    } else {
        idx += 1;
    }
}
```

**错误写法1：已读取的`bank.len()`在循环中不会更新**

```rust
for idx in 0..bank.len() {
    ...
}
```

**错误写法2：如果删除了元素，不应该右移idx指针**

```rust
let mut idx = 0;
while idx < bank.len() {
    let nxt = &bank[idx];
    if Solution::ok(&str, nxt) {
        let nxt = bank.swap_remove(idx);
        q.push_back((nxt, step + 1));
    }
    idx += 1;
}
```


### 顺便贴一个cpp的写法

```cpp
for (auto it = bank.begin(); it != bank.end(); ) {
    if(ok(*it)) {
        it = bank.erase(it);
    } else{
        ++it;
    }
}

```


## Ref
- https://github.com/rustcn-org/rust-algos/blob/fbcdccf3e8178a9039329562c0de0fd01a3372fb/src/unsafe/self-ref.md
- https://crates.io/crates/lazy_static
- https://course.rs/advance/global-variable.html
