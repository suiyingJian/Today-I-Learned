> 2022.7.1 开始学习react

1.用于动态构建用户界面的 JavaScript 库(只关注于视图)
2.由Facebook开源
### React的特点
> 采用组件化模式、声明式编码，提高组件开发效率以及组件复用率
1.使用虚拟(virtual)DOM, 不总是直接操作页面真实DOM。
2.DOM Diffing算法, 最小化页面重绘。

1.声明式编码
2.组件化编码
3.React Native 编写原生应用
4.高效（优秀的Diffing算法）虚拟Dom+优秀的Diffing算法

JSX【JavaScript XML】:创建虚拟DOM太繁琐了，为了让编码人员更加方便创建虚拟DOM  【语法糖】
JSON
    - parse
    - stringfy


1、标签必须闭合
2、函数名首字母必须大写    【若写的是组件，则首字母需要大写】
3、是 react 帮忙调用的函数  而非自己调用Mycompoent()


有state（状态）的是复杂组件，没有的就是简单组件
数据放在状态(state)里，数据的改变就会驱动页面的展示
state 驱动（影响）页面数据驱动页面展示