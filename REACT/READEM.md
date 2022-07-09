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

2022.7.5
有state（状态）的是复杂组件，没有的就是简单组件
数据放在状态(state)里，数据的改变就会驱动页面的展示
state 驱动（影响）页面数据驱动页面展示

P14 react 中事件绑定：[对应06]
1.onClick 中 C 要大写 
2.onClick = {demo} 不要写demo() react 底层会帮忙调用 不然 就是赋值为undefined

### 对于 state的理解 总结
  - 1.state是组件对象最重要的属性, 值是对象(可以包含多个key-value的组合)
  - 2.组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)
   - 2.2.3. 强烈注意
     1.组件中render方法中的this为组件实例对象
     2.组件自定义的方法中this为undefined，如何解决？
      a)强制绑定this: 通过函数对象的bind()
       b)箭头函数
     3.状态数据，不能直接修改或更新 必须借助setState

数组reduce方法如何使用，...扩展运算符，解构赋值

展开运算符不能展开对象

props 是只读的

props 里面存的是 属性名和属性值
refs 相当于封装好的id 不用在使用document.getElementById 来获取
