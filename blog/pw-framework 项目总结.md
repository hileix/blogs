## pw-framework 项目总结

### 1. 前言

大概从去年（2018）六月份开始，公司开始了一个名为 power-works 的项目。

power-works 项目是一个后台管理系统，针对企业应用。

`power-works 最终要实现的目标是让无代码开发经验的人员或经验不足的开发人员能够结合公司目前现有的后端，通过配置，配置出一个完整的后台管理系统，即降低开发企业应用的门槛、节省开发成本。`

开发 power-works 也已经有半年多时间，其中尝到过这种开发模式的甜头，也碰到过阻碍。在这里总结一下 power-works 项目。

### 2. 项目目录结构

```
|-- pw-framework
    |-- public
    |   |-- app.config.js                 # 应用配置文件
    |   |-- functions.config.js           # 功能模块配置文件
    |-- src                               # 源码
    |   |-- components                    # 组件
    |       |-- common                    # 通用组件
    |           |-- data                  # 与后端数据相关的组件
    |           |-- hoc                   # 高阶组件
    |           |-- ui                    # ui 组件
    |           |-- loadableCommon.js     # 通用组件按需加载
    |       |-- custom                    # 定制组件
    |           |-- loadableCustom.js     # 定制组件按需加载
    |   |-- export-center                 # 导出中心
    |       |-- index.js                  # 导出中心文件
    |   |-- lib                           # 10.x.x 版本通用组件
    |   |-- locales                       # 国际化
    |       |-- en-US.js                  # 英文
    |       |-- zh-CN.js                  # 中文
    |   |-- pages                         # 页面组件
    |   |-- redux                         # redux
    |   |-- style                         # 样式
    |   |-- util                          # 10.x.x 版本工具文件夹
    |   |-- util20                        # 20.x.x 工具文件夹
    |-- docs                              # 文档
    |-- README.md
```

### 3. 难点

在开发 power-works 的时候，我们遇到了一些难点：

#### 1. 如何进行项目的升级？

- 描述：

在一般的管理系统中，都是以 git 仓库为一个单位，来进行项目的版本控制。但那样就有一个局限，如果需要升级系统除具体业务功能之外的功能（如每个系统都需要用到的个人中心）以及通用组件，会很痛苦。

我们一开始，就是采用的这种方式，但逐渐发现这种方式不适合用来做一直需要升级迭代的系统（也有一部分原因是没有想到系统会需要一直升级）。

所以，我们采用 git 分支来管理项目升级。

- 使用 git 分支管理项目

power-works 采用了以 git 分支为单位，来进行每个项目的版本控制。每次新开一个项目，是新建一个分支，而不是新建一个 git 仓库。这样做，带来的好处就是可以直接使用 git 分支合并的特性，当某个项目需要升级的话，直接将 master 分支的代码（我们规定了 master 分支是模板）合并到项目分支即可。

新建项目步骤：

1. 切到主分支：git checkout master
2. 新建项目分支：git branch xxx
3. 切到项目分支：git checkout xxx
4. 更新远程仓库分支：git push origin xxx

更新项目：

1. 切换到项目分支：git checkout xxx
2. 合并主分支的代码到 xxx 分支：git merge master
