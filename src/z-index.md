# z-index 详解

z-index 属性用来控制元素在 z 轴上的顺序

## 1. 适用范围

z-index 仅适用于定位元素。即 `postition` 值为 `relative`, `absolute` 和 `fixed` 属性

## 2. 作用

- 指定当前元素的 `堆叠顺序`
- 创建新的 `堆叠上下文`

### 2.1 什么是堆叠顺序

- 堆叠顺序是当前元素位于 `z` 轴上的值。值越大表示元素越靠近屏幕，反之元素越远离屏幕
- 在同一个堆叠上下文中， `z-index` 值越大，越靠近屏幕。除了 `z-index` 控制着元素的 `堆叠顺序`，还有其他因素控制着元素的 `堆叠顺序`，如下：
  <img src="https://www.github.com/hileix/blogs/raw/master/src/assets/堆叠顺序.png">

### 2.1 什么是堆叠上下文？

[层叠上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)

- `堆叠上下文` 是一个在该元素内的堆叠顺序不会影响到其他堆叠上下文堆叠顺序的一个 `环境`
- HTML 文档默认的堆叠上下文： html 元素

## 3. 其他

- 元素的堆叠顺序不会高于（或低于）父元素的堆叠顺序
