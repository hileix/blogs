## 使用 git alias 提高 git 的使用效率

### 前言

git 作为一个版本控制工具，是我们程序员平时工作中不可缺少的一部分。但有一个问题，我们开发完一个小功能或修改了一个 bug，都需要 add 然后 commit 一下，每次都要敲这么多的字符。作为经常使用 git 的我们来说，这是不能忍受的！

这个时候，可以使用 [git alias](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)！

### 定义自己的 git alias

#### 通过命令设置 alias

根据 [git 官方文档](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)说明，我们可以通过以下命令定义 git alias：

```shell
git config --global alias.a add
git config --global alias.c commit
git config --global alias.o checkout
```

#### 通过 git 配置文件设置 alias

上面那种用命令定义 alias 的方式，需要敲这么多前置的命令，太麻烦了。这个时候，我们可以通过 git 的配置文件来配置 alias

1. 在 `~/` 目录下找到 `.gitconfig` 文件
2. 在 `.gitconfig` 文件末尾添加：

```
[alias]
a = add
c = commit
o = checkout
# ...
```

3. 完成！

这样，我们就可以直接使用 `git a`、`git c`、`git o` 来代替 `git add`、`git commit`、`git o` 啦！

#### [git alias](https://github.com/GitAlias/gitalias)

之前的都是我们自己配置的一些 git alias，当然有别人给我们配好了的：[git alias](https://github.com/GitAlias/gitalias)。里面包含了非常非常非常多的 git alias，具体的 alias 所对应的真正的 git 命令，可以查看该项目的 `gitalias.txt` 文件。

```
# 如：
# gitalias.txt 文件中一个单词的 alias
  a = add
  b = branch
  c = commit
  d = diff
  f = fetch
  g = grep
  l = log
  m = merge
  o = checkout
  p = pull
  r = remote
  s = status
  w = whatchanged
```

##### 安装使用

1. 首先将该开源项目中的 `gitalias.txt` 文件下载下来
2. 然后在刚刚我们编辑的 `.gitconfig` 文件里面加入：

```
[include]
path = gitalias.txt
```

3. 这样，`gitalias.txt` 中的所有 alias，都已被引入，就可以直接使用了！

##### 将 `git` 命令用 `g` 命令替代

1. 打开 `~/.bash_profile` 文件
2. 在文件末尾添加：

```
alias g=git
```

3. 使用 `source ~/.bash_profile` 命令
4. 完成

这样，`git` 也可以使用 `g` 命令来替代了！

#### 更多 git alias 工具

根据 [git alias more ideas](https://github.com/GitAlias/gitalias#more-ideas) 介绍，我们可以使用其他工具来使用 git alias，如：

- 如果有 node 环境（作为前端开发，必须有！），可以使用 [git-alias](https://www.npmjs.com/package/git-alias)

### 总结

完~
