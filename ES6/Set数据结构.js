/**
 * Set 是ES6提供的一种新的数据结构，类似于数组，但成员值都是唯一的，没有重复值
 */
// Set本身是一个构造函数，用来生成Set数据结构

const s = new Set()

// [2, 3, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
    console.log(i);
}
// 2 3 5 4 
/**
 * 上面代码通过add()向Set结构加入成员，结果表明Set结构不会重复添加重复的值
 * Set函数可接受一个数组【具有iterable接口的其他数据结构】作为参数，用来初始化
 */
// 例一
const s1 = new Set([1, 2, 3, 4, 4]);
[...s1]    //[1,2,3,4]

// 例2
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5])
items.size
// console.log(items.size); 5

//例3
const set1 = new Set(document.querySelectorAll('div'))
console.log(set1.size);  //56

//类似于
// const set = new Set();
document.querySelectorAll('div').forEach(div => set.add(div));
set.size

/**
 * 例1、例2都是Set函数接受数组作为参数，例3 是接受类似数组的对象作为参数
 */
// 【数组去重】！！！！！！！！！！！
// [...new Set(array)]

// 去除字符串里面的重复字符
let aa = [...new Set('ababbc')].join('')
console.log(aa);

/**
 * Set里面加入值，不会发生类型转换，5和‘5’是两个不同的值，Set内部判断两个值是否相等，用的算法是'Same-value-zero-eqiality',类似于精确相等运算符（===）区别在于，Set中加入值时认为NaN等于自身，而三等运算符则认为NaN不等于自身
 */

// let set = new Set()
let a = NaN;
let b = NaN;
set.add(a)
set.add(b)
set
/**
 * 上面代码实例添加了两次NaN，但是只会加入一个，表明，在Set内部两个NaN是相等的
 */
// 两个对象总是不等
let set = new Set();
set.add({})
set.size

set.add({})
set.size

// 由于两个空对象不相等，所以被视为两个值

// ### Set 实例的属性和方法
/**
 * Set.protopype.constructor:构造函数，，默认就是Set函数
 * Set.prototype，size:返回Set实例的成员总数
 * 
 * Set实例的方法分为两类：操作方法（用于操作数据）和遍历方法（用于遍历成员）
 * 
 * - 操作方法：
 * Set.prototype.add(value):添加值，返回Set结构本身
 * Set.prototype.delete(value):删除值，返回一个布尔值，表示删除是否成功
 * Set.prototype.have(value):返回一个布尔值，表示改值是否为Set的成员
 * Set.prototype.clear();清除所有成员，没有返回值
 */

