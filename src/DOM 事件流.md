## DOM
1. 什么是 DOM：https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Introduction

## 一、DOM 级别与 DOM 事件

1. DOM 级别：DOM 0 级、DOM 1 级、DOM 2 级、DOM 3 级，4 个DOM 级别
2. DOM 事件：DOM 0 级事件、DOM 2 级事件、DOM 3 级事件
> 因为 DOM 1 级中，没有定义事件相关的内容，所以不存在 DOM 1 级事件处理

3. 各级 DOM 对事件的处理
- DOM 0 级事件处理：
```javascript
var div = document.getElementById('div');
div.onclick = function() {
  console.log('div clicked');
}
```
- DOM 2 级事件处理：
```javascript
var div = document.getElementById('#div');
div.addEventListener('click', handleDivClick, false);
function handleDivClick() {
  console.log('div clicked');  
}
```
- DOM 3 级事件处理：
在 DOM 2 级事件的基础上添加了更多的事件，也允许使用自定义事件


## 二、事件流
1. 什么是事件流？
- 事件流，就是事件传播的方向。因为每个 dom 都可以绑定事件，所以事件的触发，需要一个顺序

2. 在 DOM 2 级事件中，规定了事件流会处于三个阶段：
- 捕获阶段：window -> document -> html -> body -> div
- 处于目标阶段：div
- 冒泡阶段：div -> body -> html -> documen -> window

> 通过 Element.addEventListener(type, callback, useCapture) 来监听一个元素的事件，通过改变第三个参数，即可改变事件流：

> 当 useCapture 为 true 时，表示事件会在捕获阶段执行事件的回调函数：window -> document -> html -> body -> div
> 否则事件会在冒泡阶段执行事件的回调函数：div -> body -> html -> document -> window

## 三、事件对象
1. 事件对象是事件回调函数的 event 对象

2. event 对象有一些比较重要的方法：
- event.stopPropagation():阻止事件冒泡，即阻止事件继续向上传播
- event.preventDefault():阻止事件的默认行为

## 四、事件委托
1. 事件委托就是利用事件冒泡，只指定一个事件处理程序，来管理某一类型的所有事件
2. 原理：事件冒泡
3. 优点：
- 可以实现动态绑定事件
- 可以节省内存

4. 缺点：
- 并不是所有的事件都 `支持` 事件委托（focus、blur 等不支持事件冒泡的事件）
- 并不是所有的事件都 `适合` 使用事件委托（mousemove、mouseout 需要大量的计算，不适合使用）
