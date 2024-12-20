---
icon: pen-to-square
date: 2024-12-11
category:
  - Rust
---

# 记录一些Rust中的小技巧

## 使用指定的Rust版本

对于管理多版本，直接使用Rustup即可。在cmd中输入

```bash
rustup show
```

即可查看已安装的工具链版本，以及现在使用的默认版本。使用

```bash
rustup default 1.72.0-x86_64-pc-windows-gnu
```

即可切换到对应版本。

但如果不想切换默认Rust版本，只想为某一项目使用指定版本，可以在项目所在目录新建`rust-toolchain`文件，在第一行写上版本限制，例如：
- `1.76.0`
- `1.76.0-x86_64-pc-windows-gnu`

如果需要更详细地指定工具链版本，可以新建一个`rust-toolchain.toml`文件，例如：

```toml
[toolchain]
channel = "nightly-2024-11-07"
components = [ "rustfmt", "rust-analyzer", "miri", "rust-docs", "clippy", "rust-src"]
profile = "default"
```

以上配置将在此项目中启用nightly特性。

## pub关键字

`pub`关键字能控制字段、方法的可访问性，且能限定到在特定模块。

```rust
/// 在本项目内public
pub(crate) fn hello() {

}

/// 仅在mod `ir`内public
pub struct Graph {
    pub(in crate::ir) globals: GlobalValueMapCell,
    pub(in crate::ir) func_tys: FuncTypeMapCell,
    values: HashMap<Value, ValueData>,
    bbs: HashMap<BasicBlock, BasicBlockData>,
}
```

## Ref
- https://github.com/pku-minic/koopa/blob/master/src/ir/dfg.rs#L15