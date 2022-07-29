Set和Map 是es6新增的两种数据结构
> Set类似于集合，Map是键值对
## Set
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成 Set 数据结构。

Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。

向 Set 实例添加了两次NaN，但是只会加入一个。这表明，在 Set 内部，两个NaN是相等的。

另外，两个对象总是不相等的。由于两个空对象不相等，所以它们被视为两个值。

### Set实例的属性和方法

> Set 结构的实例有以下属性:

Set.prototype.constructor：构造函数，默认就是Set函数。
Set.prototype.size：返回Set实例的成员总数。

> Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。
#### 下面先介绍四个操作方法。

Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
Set.prototype.clear()：清除所有成员，没有返回值。

Array.from方法可以将 Set 结构转为数组。

#### 遍历操作

> Set 结构的实例有四个遍历方法，可以用于遍历成员。

Set.prototype.keys()：返回键名的遍历器
Set.prototype.values()：返回键值的遍历器
Set.prototype.entries()：返回键值对的遍历器
Set.prototype.forEach()：使用回调函数遍历每个成员

> 需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

（1）keys()，values()，entries():
keys方法、values方法、entries方法返回的都是遍历器对象（详见《Iterator 对象》一章）。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

entries方法返回的遍历器，同时包括键名和键值，所以每次输出一个数组，它的两个成员完全相等。

Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。

（2）forEach()
Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
forEach方法的参数就是一个处理函数。该函数的参数与数组的forEach一致，依次为键值、键名、集合本身（上例省略了该参数）。这里需要注意，Set 结构的键名就是键值（两者是同一个值），因此第一个参数与第二个参数的值永远都是一样的。
另外，forEach方法还可以有第二个参数，表示绑定处理函数内部的this对象。

扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。

扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。


数组的map和filter方法可以间接用于 Set 。

因此使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）。

```
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

如果想在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但有两种变通方法。一种是利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构；另一种是利用Array.from方法。

### WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
WeakSet 只能放置对象。

其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

这是因为垃圾回收机制根据对象的可达性（reachability）来判断回收，如果对象还能被访问到，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。

由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

这些特点同样适用于 WeakMap 结构。

WeakSet 是一个构造函数，可以使用new命令，创建 WeakSet 数据结构。
```
const ws = new WeakSet();
```

作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。

> WeakSet 结构有以下三个方法:
WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

WeakSet 没有size属性，没有办法遍历它的成员。

试图获取size和forEach属性，结果都不能成功。

WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。


## Map

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

由于对象只接受字符串作为键名,为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构,都可以当作Map构造函数的参数。这就是说，Set和Map都可以用来生成新的 Map。

如果对同一个键多次赋值，后面的值将覆盖前面的值。
如果读取一个未知的键，则返回undefined。
> 注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

set和get方法，表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get方法无法读取该键，返回undefined。
同理，同样的值的两个实例，在 Map 结构中被视为两个键。

Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。另外，undefined和null也是两个不同的键。虽然NaN不严格相等于自身，但 Map 将其视为同一个键。


### 实例的属性和操作方法
Map 结构的实例有以下属性和操作方法。

（1）size 属性
size属性返回 Map 结构的成员总数。

（2）Map.prototype.set(key, value)
set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。
> set方法返回的是当前的Map对象，因此可以采用链式写法。

（3）Map.prototype.get(key)
get方法读取key对应的键值，如果找不到key，返回undefined。

4）Map.prototype.has(key)
has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

（5）Map.prototype.delete(key)
delete方法删除某个键，返回true。如果删除失败，返回false。

（6）Map.prototype.clear()
clear方法清除所有成员，没有返回值。

### 遍历方法

> Map 结构原生提供三个遍历器生成函数和一个遍历方法:

Map.prototype.keys()：返回键名的遍历器。
Map.prototype.values()：返回键值的遍历器。
Map.prototype.entries()：返回所有成员的遍历器。
Map.prototype.forEach()：遍历 Map 的所有成员。

> 需要特别注意的是，Map 的遍历顺序就是插入顺序。

Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。

Map 结构转为数组结构，比较快速的方法是使用扩展运算符（...）。
结合数组的map方法、filter方法，可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）。


Map 还有一个forEach方法，与数组的forEach方法类似，也可以实现遍历。
forEach方法还可以接受第二个参数，用来绑定this。

（4）对象转为 Map
对象转为 Map 可以通过Object.entries()。

（5）Map 转为 JSON
Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

（6）JSON 转为 Map
JSON 转为 Map，正常情况下，所有键名都是字符串。
但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

