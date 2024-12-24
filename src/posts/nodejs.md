---
icon: pen-to-square
date: 2024-12-24
category:
  - Nodejs
---

# Nodejs中报错“Error: spawn EINVAL”

这是由于执行子进程存在安全漏洞，因此在18.x, 20.x, 21.x版本中直接禁止了。

详见：https://nodejs.org/en/blog/vulnerability/april-2024-security-releases-2

需要在报错的包对应的`scripts/install.js`文件中加上`shell: true`：

```js {12} title="node_modules/.../scripts/install.js"
'use strict'

const os = require('os');
const path = require('path');
const spawn = require('child_process').spawn;

const gypArgs = ['rebuild'];
if (process.env.NODE_PTY_DEBUG) {
  gypArgs.push('--debug');
}
const gypProcess = spawn(os.platform() === 'win32' ? 'node-gyp.cmd' : 'node-gyp', gypArgs, {
  shell: true,
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit'
});

gypProcess.on('exit', function (code) {
  process.exit(code);
});
```