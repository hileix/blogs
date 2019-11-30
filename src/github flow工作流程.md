## github flow 工作流程

### 前言

如何参加一个 github 开源项目来贡献自己的代码呢？下面来介绍一下 github flow 工作流程。

### 一、流程

#### 1. fork github 开源项目

在开源项目首页中，可以在右上角找个 fork 按钮。点击 fork 按钮，将该开源项目 fork 到自己的项目列表中。

#### 2. git clone fork 好的项目

将 fork 完之后的代码 clone 到本地。

#### 3. 在本地进行 feature 开发或 bug fix

#### 4. 开发完成之后，将代码推到 github

#### 5. 在 fork 好的项目首页，有一个 pull request 按钮，点击。点击之后，按照页面的提示，一步一步走下去即可

### 二、如何同步 fork 好的开源项目

有时候，我们需要将开源项目原仓库的代码同步到 fork 的仓库，该怎么做？

1. 在本地项目中，给 fork 的项目添加上游仓库：

```shell
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```

- 可通过 `git remote -v` 查看远程仓库地址和上游仓库地址

2. fetch 上游仓库 master 分支

```shell
git fetch upstream master
```

3. 合并上游 master 分支到本地 master 分支

```shell
git merge upstream/master
```

- 若不在主分支，则 `git checkout master` 切换到主分支

4. 将 merge 好的 master 分支代码 push 到远程仓库

```shell
git push origin master
```

5. 完成同步！！！
