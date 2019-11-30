# React Native 屏幕适配（炒鸡简单的方法）

## 前言

React Native 可以开发 ios 和 android 的 app，在开发过程中，势必会遇上屏幕适配（ios 好几种尺寸的屏幕以及 android 各种尺寸的屏幕）的问题，下面介绍一种几行代码搞定 RN 适配的方法！

## 屏幕适配的前置知识

- RN 中的尺寸单位为 dp，而设计稿中的单位为 px

## 原理

虽然单位不同，但是元素所占屏幕宽度的比例是相同的
利用元素所占屏幕比例不变的特性，来将 px 转为 dp（这样实现屏幕适配的话，在不同尺寸的屏幕下，元素会等比放大或缩小）

公式如下：

设计稿元素宽度（px） / 设计稿总宽度（px） = **元素的宽度（dp）** / 屏幕的总宽度（dp）

我们要求的就是 **元素的宽度（dp）**

可以得出：

**元素的宽度（dp）** = 设计稿元素宽度（px）\* 屏幕的总宽度（dp） / 设计稿总宽度（px）

## 代码实现

```javascript
// util.js
import { Dimensions } from 'react-native';

// 设备宽度，单位 dp
const deviceWidthDp = Dimensions.get('window').width;

// 设计稿宽度（这里为640px），单位 px
const uiWidthPx = 640;

// px 转 dp（设计稿中的 px 转 rn 中的 dp）
export const pTd = uiElePx => {
  return (uiElePx * deviceWidthDp) / uiWidthPx;
};
```

## 使用

每次给元素设置尺寸样式时，使用 **pTd()** 函数即可（传入设计稿中元素的实际 px）。
