# css3 动画（二）贝塞尔曲线

## 前言

上一篇 [css3 动画（一） transition][1] 中，介绍了 transition 的用法。其中 transition 包含四个可设置的属性：

1. 有过渡效果的属性
2. 过渡时长
3. 过渡函数？
4. 过渡时延

其中，1、2 以及 4 都挺好理解的，但是 `3` 是个什么东西？其实 `3` 是 css3 中的 [timing-function][2]，其中 `3` 有两种类型的值：

- [cubic-bezier(x1, y1, x2, y2)：立方贝塞尔曲线][3]
- [steps(number_of_steps, direction)][4]

**本篇就总结一下 cubic-bezier(x1, y1, x2, y2)：立方贝塞尔曲线**

## 贝塞尔曲线简介

贝塞尔曲线（Bezier curve）是计算机图形学中重要的参数曲线，它通过一个方程来描述一条曲线。根据方程的最高阶数，可以分为线性贝塞尔曲线、二次贝塞尔曲线、三次贝塞尔曲线以及更高次的贝塞尔曲线。
[贝塞尔曲线扫盲][5]

在 `css3` 中使用的 cubic-bezier() 函数，是一个 `三次贝塞尔曲线函数`。

三次贝塞尔曲线中四个点，在 cubic-bezier() 中：

- `第一个点 p0(0, 0)`和`最后一个点 p3(1, 1)`是固定坐标的
- `p1(x1, y1)` 和 `p2(x2, y2)` 是传入 cubic-bezier() 函数中的参数的。其中 `x∈[0, 1]`，y 可以不在 [0, 1] 区间内，但最大值最好不要大于 `1.5`，最小值不要小于 `-0.5`
- `0 和 1` 分别表示 `0% 和 100%`
  cubic-bezier(x1, y1, x2, y2) 接受的参数便是 p1(x1, h1) 和 p2(x2, y2) 的坐标。

那我们怎么获取我们想要的贝塞尔曲线呢？进这个 [网站][6]

## css3 贝塞尔曲线代表的含义

在上面那个 [网站][7] 中，我们可以通过拖拽 p1 和 p2 点，来改变两点的坐标，从而产生一条曲线。

![clipboard.png](/img/bVbduVA)

那么这条曲线代表什么含义呢？

- 横坐标：时间。时间是匀速增加的
- 纵坐标：进度。随着时间的增加，进度也会增加
- 斜率：速度
  由于 `时间是匀速增加的`，进度增加的快慢是受斜率（速度）影响的。所以这是一条表示进度变化快慢的`速度曲线`

这个 `进度` 在 css 中，实际指的就是`样式变化前后的值`。如：

- `width` 从 100px 变为 200px，纵坐标的起点就为 `100px`，终点为 `200px`
- `opacity` 从 0 变为 1，纵坐标的起点就为 `0`，终点为 `1`
- ...

## transition + cubic-bezier() 实现平抛动画

最终效果如下：
https://codepen.io/reai3041/pen/RBbwzo

### 分析

我们知道，平抛运动可以分解为两个方向的运动：

- 水平方向：匀速运动
- 垂直方向：加速度不变的匀加速运动

这样，我们就可以分解为水平和垂直方向上的 `过渡效果`：

```html
<div class="ball"></div>
```

```css
.ball {
  width: 10px;
  height: 10px;
  border: 1px solid #000;
  border-radius: 50%;
  position: absolute;
  left: 80px;
  top: 30px;
}
/* 终点 */
.ball.end {
  left: 180px;
  top: 230px;
  transition: left 0.2s linear, top 0.2s cubic-bezier(0.48, 0, 0.94, 0.28);
}
```

通过改变 left 和 top 值：

- left 应用 linear 速度曲线（匀速）
- top 应用 cubic-bezier(.48,0,.94,.28) 速度曲线（加速度不变的加速运动）
  来获得平抛运动的动画效果

其中，cubic-bezier() 函数的参数，可以在 [网站][8] 里自定义点的位置，然后得到自己想要的速度变化曲线。

在平抛运动垂直方向的速度曲线大概是这样子的：

![clipboard.png](/img/bVbdvkd)

这样，我们就知道了 cubic-bezier() 函数的参数（图片中的这条曲线，其实就可以看做是实际的平抛的曲线）

代码及效果：
https://codepen.io/reai3041/pen/RBbwzo

## 总结

css3 中的贝塞尔曲线其实很简单：一条以 `时间为横坐标`，以 `进度为纵坐标` 的 `和速度相关` 的曲线，它表示了 `过渡/动画` 中间状态的 `变化快慢`。

下一篇：[css3 动画（三）animation 简介][9]

[1]: https://segmentfault.com/a/1190000015567752
[2]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/timing-function
[3]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/timing-function
[4]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/timing-function
[5]: http://www.html-js.com/article/1628
[6]: http://cubic-bezier.com/
[7]: http://cubic-bezier.com/
[8]: http://cubic-bezier.com/#.48,0,.94,.28
[9]: https://segmentfault.com/a/1190000015724999
