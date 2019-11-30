# css3 动画（四）animation.css 源码分析

## 前言

上一篇 [css3 动画（三）animation 简介][1] 中只是简单的介绍了一下 animation 的子属性，并没有真正的使用。在本篇中，通过阅读 [animate.css][2]这个 css 的动画库，来加深对
css3 的 animation 属性的理解。

## animate.css

[animate.css][3] 是一个具有非常多的动画效果的 css 动画库。[动画效果演示][4]

### 用法

```css
<h1 class="animated flash">Example</h1>
```

- 加上基础类 animated 以及动画类 flash，就会有 “闪烁” 的动画效果。

### 动画分类

通过查看 [演示][5]，可以看到该动画库的动画类型分为 14 类：

- Attention Seekers
- Bouncing Entrances
- Bouncing Exits
- Fading Entrances
- Fading Exits
- Flippers
- Lightspeed
- Rotating Entrances
- Rotating Exits
- Sliding Entrances
- Sliding Exits
- Specials
- Zooming Entrances
- Zooming Exits

在 animate.css 的源码目录中，也根据其分类分为了 14 个文件夹：

![clipboard.png](https://www.github.com/hileix/blogs/raw/master/src/assets/animate-css.png)

### \_base.css 基础类

首先看 \_base.css 中的基础类：

```css
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.animated.infinite {
  animation-iteration-count: infinite;
}

.animated.delay-1s {
  animation-delay: 1s;
}

.animated.delay-2s {
  animation-delay: 2s;
}

.animated.delay-3s {
  animation-delay: 3s;
}

.animated.delay-4s {
  animation-delay: 4s;
}

.animated.delay-5s {
  animation-delay: 5s;
}
```

可以看到：
.animate 基础类设置了动画的两个子属性：animation-duration 和 animation-fill-mode。其值分别为 1s 和 both。[animation-fill-mode 详解][6]

.animate.infinite 基础类设置了动画的播放次数为无限次

.animated.delay-ns 基础类设置了动画的延时

### 示例：flash 动画源码

然后，我们来看一个动画例子的源码：flash.css

```css
@keyframes flash {
  from,
  50%,
  to {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
}

.flash {
  animation-name: flash;
}
```

在 flash.css 中，首先定义了名为 flash 的关键帧的序列：

```css
@keyframes flash {
  from,
  50%,
  to {
    opacity: 1;
  }

  25%,
  75% {
    opacity: 0;
  }
}
```

在 0%、50%、100% 关键帧中，其样式 opacity 为 0
在 25%、75% 关键帧中，其样式 opacity 为 1

然后，下面有 .flash 类，使用了 flash 作为 animation-name 属性的值，flash 即为上面定义关键帧的名称

所以，通过添加 flash 类，就可以使元素具有 “闪烁” 的动画效果！

## 总结

通过上面实例的一个 flash 动画源码的阅读，加深了对 css3 animation 属性的使用。

[1]: https://segmentfault.com/a/1190000015724999
[2]: https://github.com/daneden/animate.css
[3]: https://github.com/daneden/animate.css
[4]: https://daneden.github.io/animate.css/
[5]: https://daneden.github.io/animate.css/
[6]: https://segmentfault.com/q/1010000003867335
