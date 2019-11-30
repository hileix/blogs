## 用 nodejs 写一个命令行工具：创建 react 组件的命令行工具

### 前言

上周，同事抱怨说 react 怎么不能像 angular 那样，使用命令行工具来生成一个组件。对呀，平时工作时，想要创建一个 react 的组件，都是直接 copy 一个组件，然后做一些修改。为什么不能将这个过程交给程序去做呢？当天晚上，我就仿照 [angular-cli](https://www.npmjs.com/package/@angular/cli) 的 api，写了一个生成 react 组件的命令行工具 [rcli](https://github.com/hileix/rcli)。在这里记录一下实现的过程。

### api 设计

#### 0.1.0 版本的 rcli 参照 angular-cli 的设计，有两个功能：

1. 使用 `rcli new PROJECT-NAME` 命令，创建一个 react 项目，其中生成项目的脚手架当然是 [create-react-app](https://github.com/facebook/create-react-app) 啦
2. 使用 `rcli g component MyComponent` 命令，创建一个 `MyComponent` 组件，这个组件是一个文件夹，在文件夹中包含 `index.js`、`MyComponent.js`、`MyComponent.css` 三个文件

后来发现 `rcli g component MyComponent` 命令在  平时开发过程中是不够用的，因为这个命令只是创建了一个类组件，且继承自 `React.Component`。

在平时开发过程中，我们会用到这三类组件：

1. 继承自 `React.Component` 的类组件
2. 继承自 `React.PureComponent` 的类组件
3. 函数组件（无状态组件）

注：将来可以使用 [Hooks](https://reactjs.org/docs/hooks-intro.html) 来代替之前的类组件

于是就有了 0.2.0 版本的 `rcli`

#### 0.2.0 版本的 rcli

#### 用法

```
Usage: rcli [command] [options]

Commands:
  new <appName>
  g <componentName>

`new` command options:
  -n, --use-npm                    Whether to use npm to download dependencies

`g` command options:
  -c, --component <componentName>  The name of the component
  --no-folder                      Whether the component have not it's own folder
  -p, --pure-component             Whether the component is a extend from PureComponent
  -s, --stateless                  Whether the component is a stateless component
```

##### 使用 [`create-react-app`](https://github.com/facebook/create-react-app) 来创建一个应用

```shell
rcli new PROJECT-NAME
cd PROJECT-NAME
yarn start
```

或者你可以使用 `npm` 安装依赖

```shell
rcli new PROJECT-NAME --use-npm
cd PROJECT-NAME
npm start
```

##### 生成纯组件（继承自 PureComponent，以提高性能）

```shell
rcli g -c MyNewComponent -p
```

##### 生成类组件（有状态组件）

```shell
rcli g -c MyNewComponent
```

等于：

```shell
rcli g -c ./MyNewComponent
```

##### 生成函数组件（无状态组件）

```shell
rcli g -c MyNewComponent -s
```

##### 生成组件不在文件夹内（也不包含 css 文件和 index.js 文件）

```shell
# 默认生成的组件都会都包含在文件夹中的，若不想生成的组件被文件夹包含，则加上 --no-folder 选项
rcli g -c MyNewComponent --no-folder
```

### 实现过程

#### 1. 创建项目

- 创建名为 `hileix-rcli` 的项目
- 在项目根目录使用 `npm init -y` 初始化一个 npm package 的基本信息（即生成 package.json 文件）
- 在项目根创建 `index.js` 文件，用来写用户输入命令后的主要逻辑代码
- 编辑 `package.json` 文件，添加 `bin` 字段：

```json
{
  "name": "hileix-rcli",
  "version": "0.2.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "rcli": "./index.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/hileix/rcli.git"
  },
  "keywords": [],
  "author": "hileix <304192604@qq.com> (https://github.com/hileix)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/hileix/rcli/issues"
  },
  "homepage": "https://github.com/hileix/rcli#readme",
  "dependencies": {
    "chalk": "^2.4.1",
    "commander": "^2.19.0",
    "cross-spawn": "^6.0.5",
    "fs-extra": "^7.0.1"
  }
}
```

- 在项目根目录下，使用 `npm link` 命令，创建软链接指向到本项目的 `index.js` 文件。这样，就能再开发的时候，直接使用 `rcli` 命令直接进行测试 ~

#### 2. `rcli` 会依赖一些包：

- commander：tj 大神写的一款专门处理命令行的工具。主要用来解析用户输入的命令、选项
- cross-spawn：nodejs spawn 的跨平台的版本。主要用来创建子进程执行一些命令
- chalk：给命令行中的文字添加样式。
- path：nodejs path 模块
- fs-extra：提供对文件操作的方法

#### 3.实现 `rcli new PROJECT-NAME`

```javascript
#!/usr/bin/env node

'use strict';

const program = require('commander');
const log = console.log;

// new command
program
  // 定义 new 命令，且后面跟一个必选的 projectName 参数
  .command('new <projectName>')
  // 对 new 命令的描述
  .description('use create-react-app create a app')
  // 定义使用 new 命令之后可以使用的选项 -n（使用 npm 来安装依赖）
  // 在使用 create-react-app 中，我们可以可以添加 --use-npm 选项，来使用 npm 安装依赖（默认使用 yarn 安装依赖）
  // 所以，我将这个选项添加到了 rcli 中
  .option('-n, --use-npm', 'Whether to use npm to download dependencies')
  // 定义执行 new 命令后调用的回调函数
  // 第一个参数便是在定义 new 命令时的必选参数 projectName
  // cmd 中包含了命令中选项的值，当我们在 new 命令中使用了 --use-npm 选项时，cmd 中的 useNpm 属性就会为 true，否则为 undefined
  .action(function(projectName, cmd) {
    const isUseNpm = cmd.useNpm ? true : false;
    // 创建 react app
    createReactApp(projectName, isUseNpm);
  });

program.parse(process.argv);

/**
 * 使用 create-react-app 创建项目
 * @param {string} projectName 项目名称
 * @param {boolean} isUseNpm 是否使用 npm 安装依赖
 */
function createReactApp(projectName, isUseNpm) {
  let args = ['create-react-app', projectName];
  if (isUseNpm) {
    args.push('--use-npm');
  }
  // 创建子进程，执行 npx create-react-app PROJECT-NAME [--use-npm] 命令
  spawn.sync('npx', args, { stdio: 'inherit' });
}
```

上面的代码边实现了 `rcli new PROJECT-NAME` 的功能：

- `#!/usr/bin/env node` 表示使用 node 执行本脚本

#### 4.实现 `rcli g [options]`

```javascript
#!/usr/bin/env node

'use strict';
const program = require('commander');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

const log = console.log;

program
  // 定义 g 命令
  .command('g')
  // 命令 g 的描述
  .description('Generate a component')
  // 定义 -c 选项，接受一个必选参数 componentName：组件名称
  .option('-c, --component-name <componentName>', 'The name of the component')
  // 定义 --no-folder 选项：表示当使用该选项时，组件不会被文件夹包裹
  .option('--no-folder', 'Whether the component have not it is own folder')
  // 定义 -p 选项：表示当使用该选项时，组件为继承自 React.PureComponent 的类组件
  .option(
    '-p, --pure-component',
    'Whether the component is a extend from PureComponent'
  )
  // 定义 -s 选项：表示当使用该选项时，组件为无状态的函数组件
  .option(
    '-s, --stateless',
    'Whether the component is a extend from PureComponent'
  )
  // 定义执行 g 命令后调用的回调函数
  .action(function(cmd) {
    // 当 -c 选项没有传参数进来时，报错、退出
    if (!cmd.componentName) {
      log(chalk.red('error: missing required argument `componentName`'));
      process.exit(1);
    }
    // 创建组件
    createComponent(
      cmd.componentName,
      cmd.folder,
      cmd.stateless,
      cmd.pureComponent
    );
  });

program.parse(process.argv);

/**
 * 创建组件
 * @param {string} componentName 组件名称
 * @param {boolean} hasFolder 是否含有文件夹
 * @param {boolean} isStateless 是否是无状态组件
 * @param {boolean} isPureComponent 是否是纯组件
 */
function createComponent(
  componentName,
  hasFolder,
  isStateless = false,
  isPureComponent = false
) {
  let dirPath = path.join(process.cwd());
  // 组件在文件夹中
  if (hasFolder) {
    dirPath = path.join(dirPath, componentName);

    const result = fs.ensureDirSync(dirPath);
    // 目录已存在
    if (!result) {
      log(chalk.red(`${dirPath} already exists`));
      process.exit(1);
    }
    const indexJs = getIndexJs(componentName);
    const css = '';
    fs.writeFileSync(path.join(dirPath, `index.js`), indexJs);
    fs.writeFileSync(path.join(dirPath, `${componentName}.css`), css);
  }
  let component;
  // 无状态组件
  if (isStateless) {
    component = getStatelessComponent(componentName, hasFolder);
  } else {
    // 有状态组件
    component = getClassComponent(
      componentName,
      isPureComponent ? 'React.PureComponent' : 'React.Component',
      hasFolder
    );
  }

  fs.writeFileSync(path.join(dirPath, `${componentName}.js`), component);
  log(
    chalk.green(`The ${componentName} component was successfully generated!`)
  );
  process.exit(1);
}

/**
 * 获取类组件字符串
 * @param {string} componentName 组件名称
 * @param {string} extendFrom 继承自：'React.Component' | 'React.PureComponent'
 * @param {boolean} hasFolder 组件是否在文件夹中（在文件夹中的话，就会自动加载 css 文件）
 */
function getClassComponent(componentName, extendFrom, hasFolder) {
  return '省略...';
}

/**
 * 获取无状态组件字符串
 * @param {string} componentName 组件名称
 * @param {boolean} hasFolder 组件是否在文件夹中（在文件夹中的话，就会自动加载 css 文件）
 */
function getStatelessComponent(componentName, hasFolder) {
  return '省略...';
}

/**
 * 获取 index.js 文件内容
 * @param {string} componentName 组件名称
 */
function getIndexJs(componentName) {
  return `import ${componentName} from './${componentName}';
export default ${componentName};
`;
}
```

- 这样就实现了 `rcli g [options]` 命令的功能

### 总结

- api 设计是很重要的：好的 api 设计能让使用者更加方便地使用，且变动少
- 当自己想不到该怎么设计 api 时，可以参考别人的 api，看看别人是怎么设计的好用的
