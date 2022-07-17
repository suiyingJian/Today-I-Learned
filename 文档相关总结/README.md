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

> Vue的本质，就是一个JavaScript的库：刚开始我们不需要把它想象的非常复杂；我们就把它理解成一个已经帮助我们封装好的库；在项目中可以引入并且使用它即可.

> 安装和使用Vue这个JavaScript库有哪些方式呢

方式一：在页面中通过CDN的方式来引入；
方式二：下载Vue的JavaScript文件，并且自己手动引入；
方式三：通过npm包管理工具安装使用它（webpack再讲）；
方式四：直接通过Vue CLI创建项目，并且使用它；

#### 方式一：CDN引入
什么是CDN呢？CDN称之为内容分发网络（Content Delivery Network或Content Distribution Network，缩 写：CDN） 
它是指通过 相互连接的网络系统，利用最靠近每个用户的服务器；更快、更可靠地将音乐、图片、视频、应用程序及其他文件发送给用户；
提供高性能、可扩展性及低成本的网络内容传递给用户；

常用的CDN服务器可以大致分为两种： 1)自己的CDN服务器：需要购买自己的CDN服务器，目前阿里、
腾讯、亚马逊、Google等都可以购买CDN服务器； 2)开源的CDN服务器：国际上使用比较多的是unpkg、 JSDelivr、cdnjs；
> <script src="https://unpkg.com/vue@next"></script>

#### 方式二：下载和引入

下载Vue的源码，可以直接打开CDN的链接： 
打开链接，复制其中所有的代码； 
创建一个新的文件，比如vue.js，将代码复制到其中；
通过script标签，引入刚才的文件： 

> <script src="../js/vue.js"></script>

### 声明式和命令式
原生开发和Vue开发的模式和特点，我们会发现是完全不同的，这里其实涉及到两种不同的编程范式： 
    - 命令式编程和声明式编程； 
    - 命令式编程关注的是 “how to do”，声明式编程关注的是 “what to do”，由框架(机器)完成 “how”的过程；
在原生的实现过程中，我们是如何操作的呢？
    我们每完成一个操作，都需要通过JavaScript编写一条代码，来给浏览器一个指令；
    这样的编写代码的过程，我们称之为命令式编程； 
    在早期的原生JavaScript和jQuery开发的过程中，我们都是通过这种命令式的方式在编写代码的；
在Vue的实现过程中，我们是如何操作的呢？
    我们会在createApp传入的对象中声明需要的内容，模板template、数据data、方法methods； 
    这样的编写代码的过程，我们称之为是声明式编程； 
    目前Vue、React、Angular的编程模式，我们称之为声明式编程；

## MVVM模型
MVC和MVVM都是一种软件的体系结构
    - MVC是Model – View –Controller的简称，是在前期被使用非常框架的架构模式，比如iOS、前端；
    - MVVM是Model-View-ViewModel的简称，是目前非常流行的架构模式；
通常情况下，我们也经常称Vue是一个MVVM的框架。
    Vue官方其实有说明，Vue虽然并没有完全遵守MVVM的模型，但是整个设计是受到它的启发的
    pVue官方其实有说明，Vue虽然并没有完全遵守MVVM的模型，但是整个设计是受到它的启发的

#### template属性
在使用createApp的时候，我们传入了一个对象，接下来我们详细解析一下之前传入的属性分别代表什么含义。 
template属性：表示的是Vue需要帮助我们渲染的模板信息： 
    目前我们看到它里面有很多的HTML标签，这些标签会替换掉我们挂载到的元素（比如id为app的div）的innerHTML； 
    模板中有一些奇怪的语法，比如 {{}}，比如 @click，这些都是模板特有的语法
但是这个模板的写法有点过于别扭了，并且IDE很有可能没有任何提示，阻碍我们编程的效率。 

Vue提供了两种方式：
    方式一：使用script标签，并且标记它的类型为 x-template； 
    方式二：使用任意标签（通常使用template标签，因为不会被浏览器渲染），设置id； template元素是一种用于保存客户端内容的机制，该内容再加载页面时不会被呈现，但随后可以在运行时使用JavaScript实例化；

#### data属性
data属性是传入一个函数，并且该函数需要返回一个对象：
    在Vue2.x的时候，也可以传入一个对象（虽然官方推荐是一个函数）；
    在Vue3.x的时候，必须传入一个函数，否则就会直接在浏览器中报错；
data中返回的对象会被Vue的响应式系统劫持，之后对该对象的修改或者访问都会在劫持中被处理：
    所以我们在template中通过 {{counter}} 访问counter，可以从对象中获取到数据；
    所以我们修改counter的值时，template中的 {{counter}}也会发生改变；

#### methods 属性
methods属性是一个对象，通常我们会在这个对象中定义很多的方法：
    这些方法可以被绑定到 template 模板中
    在该方法中，我们可以使用this关键字来直接访问到data中返回的对象的属性；
    