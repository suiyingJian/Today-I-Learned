Vue 是一套用于构建用户界面的渐进式框架
> 渐进式框架：表示我们可以在项目中一点点来引入和使用vue，而不一定需要全部使用Vue来开发整个项目

目前前端最流行的三大框架：Vue，React，Angular
Angular：入门门槛较高，并且国内市场占率较低
React：React在国内国外的市场占有率都是非常高的，作为前端工程师也是必须学习的一个框架
Vue：Vue在国内市场占有率是最高的，几乎所有的前端岗位都会对Vue有要求

## Vue3优点：
带来了很多新特性，更好的性能，更小的包体积，更好的TypeScript集成，更优秀的API设计
目前社区也经过一定时间的沉淀，更加的完善了，包括AntDesignVue,Element-Plus都对Vue3 提供了支持，

### Vue2 带来的变化（源码）
- 源码通过monorepo的形式来管理源代码：   
    - Mono：单个 
    - Repo：repository仓库
    - 主要是将许多项目的代码存储在同一个repository中；
    - 这样做的目的是多个包本身相互独立，可以有自己的功能逻辑、单元测试等，同时又在同一个仓库下方便管理；
    - 而且模块划分的更加清晰，可维护性、可扩展性更强； 
- 源码使用TypeScript来进行重写： 
    - 在Vue2.x的时候，Vue使用Flow来进行类型检测； 
    - 在Vue3.x的时候，Vue的源码全部使用TypeScript来进行重构，并且Vue本身对TypeScript支持也更好了；

### Vue3带来的变化（性能）
- 使用Proxy进行数据劫持
    - 在Vue2.x的时候，Vue2是使用Object.defineProperty来劫持数据的getter和setter方法的；
    - 这种方式一致存在一个缺陷就是当给对象添加或者删除属性时，是无法劫持和监听的；
    - 所以在Vue2.x的时候，不得不提供一些特殊的API，比如$set或$delete，事实上都是一些hack方法，也增加了
开发者学习新的API的成本； 
    - 而在Vue3.x开始，Vue使用Proxy来实现数据的劫持，这个API的用法和相关的原理我也会在后续讲到；
- 删除了一些不必要的API： 
    - 移除了实例上的$on, $off 和 $once；
    - 移除了一些特性：如filter、内联模板等；
-  包括编译方面的优化： 
    - 生成Block Tree、Slot编译优化、diff算法优化；

### Vue3带来的变化（新的API）
- 由Options API 到 Composition API： 
    - 在Vue2.x的时候，我们会通过Options API来描述组件对象； 
    - Options API包括data、props、methods、computed、生命周期等等这些选项；
    - 存在比较大的问题是多个逻辑可能是在不同的地方：
    - 比如created中会使用某一个method来修改data的数据，代码的内聚性非常差； 
    - Composition API可以将 相关联的代码 放到同一处 进行处理，而不需要在多个Options之间寻找； 
- Hooks函数增加代码的复用性： 
    - 在Vue2.x的时候，我们通常通过mixins在多个组件之间共享逻辑； 
    - 但是有一个很大的缺陷就是 mixins也是由一大堆的Options组成的，并且多个mixins会存在命名冲突的问题；
    - 在Vue3.x中，我们可以通过Hook函数，来将一部分独立的逻辑抽取出去，并且它们还可以做到是响应式的；
    - 具体的好处，会在后续的课程中演练和讲解（包括原理）