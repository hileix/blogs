# css3 动画（一） transition

## 前言

最近在研究 css3 的动画属性 transition 和 animation，发现自己之前对这两个 css3 的动画属性并没有太多深入的理解。本篇将介绍 css3 的 transition 以及自己的一些理解。

## transition

首先，transition 意为 “过渡，转场”，即从一种状态变为另外一种状态的中间过程。css3 的 transition 属性，就是用来配置这个中间状态的。

css3 中的 transition 属性是 css3 过渡的四个属性的简写形式，其四个 css3 的属性分别为：

- [transition-property][1]：需要过渡的 css 属性，如 width
- [transition-duration][2]：过渡的时长，如 1s
- [transition-timing-function][3]：指定一个函数，该函数反应了属性值的变化快慢（速度）。可以是[缓动函数的名称][4]，也可以是 css3 中的[贝塞尔曲线函数][5]
- [transition-delay][6]：延迟开始过渡的时间，如 0.5s

例子：

```html
<div>transition</div>
```

```css
div {
  background: #fff;
  color: #000;
  transition: all 1s linear 0.5s;
}
div:hover {
  background: #000;
  color: #fff;
}
```

效果如下：
https://codepen.io/reai3041/pen/Vdoqvm?editors=1100

在代码中，可以看到，我们需要`预先`使用 transition 属性，`配置`选择器样式的`变化过程`。这个过程包含了`四个属性`：`需要有过渡效果的属性`、`过渡时间`、`过渡速度变化函数`以及`延迟多久开始过渡`。

然后，配置完 transition 属性之后，在`用户产生某个行为时`（如鼠标 hover 到该元素上时），重新设置需要有过渡效果的属性的`新值`。

在上面的例子中：

- div `没 hover 时的状态（开始状态）`为：背景颜色为`白色`，字体颜色为`黑色`。
- div `被 hover 时的状态（结束状态）`为：背景颜色为`黑色`，字体颜色为`白色`。
  倘若不使用 css3 的 transition 过渡属性的话，则当 div 被 hover 时，div 的背景和字体样式会`瞬间`从`没 hover 时的状态` 变为 `被 hover 时的状态`，没有过渡的效果。

上面的例子中，使用了 transition 属性：

- 指定了 `all`，即 div 的所有可以变化的样式变化时都有过渡效果
- 指定了过渡时长为 `1s`
- 指定了过渡函数为 `linear（线性）`，即变化速度为匀速
- 指定了延时为 `0.5s`，即 hover 0.5s 之后，才开始过渡

## `注意`

**只有当过渡状态过程中，transition 属性存在（transition 被选择器应用时）时，才会有过渡的效果，否则没有过渡效果。**

什么意思呢？

我们可以看到上面的例子中：

- 鼠标移入 div 时，是有过渡效果的
- 鼠标移开 div 时，也是有过渡效果的
  因为此时 transition 属性是设置在 div 选择器上的，不管移入和移出 div，transition 属性都在过渡的过程中被 div 应用上了。

我们改一下代码（将 transition 属性应用在 div 被 hover 时的选择器上）

```css
div {
  background: #fff;
  color: #000;
}
div:hover {
  background: #000;
  color: #fff;
  transition: all 1s linear 0.5s;
}
```

效果如下：
https://codepen.io/reai3041/pen/zagybK

此时可以看到：

- 鼠标移入 div 时，有过渡效果
- 鼠标移出 div 时，没有过渡效果
  移入时，transition 在 div:hover 选择器上将 transition 属性应用在了 div 上，即在过渡的过程中，div 是有 transition 属性应用的

移出时，div 上没有了 transition 属性，此时便没有了`过渡效果`，而是`瞬间效果`。

## 总结

**1. 其实 transition 很简单，就四个属性：**

- 有过渡效果的属性
- 过渡时长
- 过渡函数（下一篇讲）
- 过渡时延

**2. 注意只有当选择器在过渡的过程中，被应用了 transition 属性，才会有过渡效果，否则是没有`过渡效果`的，只有`瞬间效果`**

下一篇：[css3 动画（二）贝塞尔曲线以及利用 transition 和 贝塞尔曲线函数写出一个加入购物车的动态效果（平抛运动效果）][7]

[1]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-property
[2]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-duration
[3]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-timing-function
[4]: https://easings.net/zh-cn
[5]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/timing-function
[6]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-delay
[7]: https://github.com/hileix/blogs/issues/11
