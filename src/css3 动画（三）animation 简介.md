# css3 动画（三）animation 简介

## 前言

上一篇中，总结了一下 transition 以及 cubic-bezier()。本篇中，将介绍 css3 动画中的更为灵活的动画属性：animation。

## animation

css3 中的 [animation][1] 属性是一系列配置的简写形式，其子属性有：

- [animation-delay][2]：动画开始时的延迟时间。默认 0s，无延时
- [animation-direction][3]：动画是否反向播放。默认 normal，表示动画结束之后，回到起点状态
- [animation-duration][4]：动画时长。默认 0s，无动画
- [animation-iteration-count][5]：动画重复次数。默认 1，只执行一次动画
- [animation-name][6]：动画名称，该名称为动画关键帧的名称。默认 none
- [animation-play-state][7]：动画状态，即是处于播放还是暂停状态。默认 running，为播放状态
- [animation-timing-function][8]：动画速度。默认 ease
- [animation-fill-mode][9]：指定在动画执行之前和之后如何给动画的目标应用样式。默认 none [如何理解？][10]

## animation-name

animation-name 表示的是关键帧的名称，那么如何定义关键帧呢？使用 [@keyframes。][11]

## @keyframes

@keyframes 是定义 css3 animation 动画的关键所在。通过定义每一帧的样式状态，比 transition 能更好地控制中间过程。假如说 transition 只能定义 “两帧” 的状态，则 animation 可以定义 “n 帧（n >= 2）” 的状态。

### 语法

“@keyframes + 名称 { // 关键帧样式... }”

```css
@keyframes move {
  from {
    width: 100px;
  }
  to {
    width: 200px;
  }
}
/* 或 */
@keyframes move {
  0% {
    width: 100px;
  }
  100% {
    width: 200px;
  }
}
```

## 总结

其实 animation 也并不复杂，其有 8 个子属性。

下一篇：[css3 动画（三）animation.css 源码解析][12]（通过阅读 animation.css 动画库的源码，来提高对 css3 中 animation 属性的认识）

[1]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations/Using_CSS_animations
[2]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-delay
[3]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-direction
[4]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-duration
[5]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-iteration-count
[6]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-name
[7]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-play-state
[8]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-timing-function
[9]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-fill-mode
[10]: https://segmentfault.com/q/1010000003867335
[11]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes
[12]: https://segmentfault.com/a/1190000015725274
