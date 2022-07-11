// 1.push()
// 在尾部追加，类似于压栈，原数组会变
const arr = [1, 2, 3]
arr.push(7)
console.log(arr);   //[1,2,3,7]


// 2.pop()
//在尾部弹出，类似于出栈，原数组会变，数组的push && pop 可以模拟常见数据结构之一：栈
const arr2 = [1, 2, 3]
const popVal = arr.pop()
console.log(popVal);  //3
console.log(arr2);  //[1,2]

// 模拟常见数据结构之一：栈
const stack = [0, 1]
stack.push(2)   //压栈
console.log(stack); //[0,1,2]
const popValue = stack.pop()    //出栈
console.log(popValue)   //2
console.log(stack);     //[0,1]


// 3.unshift()
// 在头部压入数据，类似于入队，原数组会变
const arr3 = [1, 2, 3]
arr3.unshift(0) 
console.log(arr); //[0,1,2,3]


// 4.shift
// 在头部弹出数据，原数组会变，数组的 push (入队) && shift (出队) 可以模拟常见数据结构之一：队列
const arr4 = [1, 2, 3]
const shiftVal = arr4.shift()
console.log(shiftVal); //1
console.log(arr) //[2,3]

// 数组模拟常见数据结构之一：队列
const queue = [0, 1]
queue.push(2) //入队
console.log(queue); //[0,1,2]

const shiftValue = queue.shift()    //出队
console.log(shiftValue);    //0
console.log(queue); //[1,2]


//5.concat()
// concat 会在当前数组尾拼接传入的数组，然后返回一个新数组，原数组不变
const arr5 = [1,2,3]
const arr0 = arr.concat([7, 8, 9])
console.log(arr);   //[1,2,3]
console.log(arr0); //[1,2,3,7,8,9]


// 6.indexOf()
// 在数组中寻找该值，找到则返回其下标，找不到则返回-1
const arr6 = [1, 2, 3]
console.log(arr.indexOf(2));    //1
console.log(arr.indexOf(0));    //-1


// 7.includes()
// 在数组中寻找该值，找到则返回true,找不到则返回false
const arr7 = [1, 2, 3]
console.log(arr7.includes(2));  //ture
console.log(arr.includes(4));   //false


//8.join()
// 将数组转化成字符串，并返回字符串，不传值则默认逗号隔开，原数组不变。
const arr8 = [1, 2, 3]
console.log(arr.join());    //'1,2,3'
console.log(arr);       //[1,2,3]


// 9.reverse()
// 翻转原数组，并返回已完成翻转的数组，原数组改变
const arr9 = [1, 2, 3]
console.log(arr.reverse());     //[3,2,1]
console.log(arr);           //[3,2,1]

// 10.slice(start,end)
// 从start开始截取到end，但是不包括end
const arr10 = [1, 2, 3, 4, 5]
console.log(arr.slice(1, 4));    //[2,3,4]
console.log(arr);   //[1, 2, 3, 4, 5]

// 11.splice(start,deleteCount,ite,1mite,2.......)
/**
 * start参数  开始的位置
 * deleteCount  要截取的个数
 * 后面的items 为要添加的元素
 * 如果deleteCount 为0，则表示不删除元素，从start位置开始添加后面的几个元素到原始的数组里面
 * 返回值为由被删除的元素组成的一个数组，如果只删除了一个元素，则返回只包含一个元素的数组，如果没有删除元素，则返回空数组。
 * 这个方法会改变原始数组，数组长度会发生变化
 */

const arr11 = [1, 2, 3, 4, 5, 6, 7, "f1", "f2"]
const arr111 = arr11.splice(2, 3)    //删除第三个元素以后的三个数组元素（包含第三个元素）
console.log(arr111);    //[3,4,5]
console.log(arr11); //[1,2,6,7,"f1","f2"]   原始数组被改变

const arr112 = arr11.splice(2, 0, "wu", "leon")
// 从第2位开始删除0个元素，插入"wu","leon"
console.log(arr112);    //[]    返回空数组
console.log(arr11);     //[1, 2, 'wu','leon', 6,7, "f1", "f2"]  原始数组被改变

const arr113 = arr11.splice(2, 3, 'xiao', 'long')
// 从第2位开始删除3个元素，插入'xiao', 'long'
console.log(arr113);    //['wu','leon', 6]
console.log(arr11);     //[1, 2, 'xiao', 'long',7, "f1", "f2"]

const arr114 = arr11.splice(2)  //从第三个元素开始删除所有的元素
console.log(arr7);  //['xiao', 'long',7, "f1", "f2"]
console.log(arr3);  //[1,2]


// 12.sort()
/**
 * 对数组的元素进行排序，并返回数组。
 * 默认排序顺序是在将元素转换成为字符串，然后比较他们的UTF-16代码单元值序列时构建的
 * 由于它取决于具体实现，因此无法保证排序的时间和空间复杂性
 */
const arr12 = [1, 2, 3]
arr.sort((a, b) => b - a)
console.log(arr12);     //[3,2,1]

//13.toString()
//将数组转换成为字符串，并返回该字符串，逗号隔开，原数组不变
const arr13 = [1, 2, 3, 4, 5]
console.log(arr13.toString());      //'1,2,3,4,5'
// console.log(arr);   [1, 2, 3, 4, 5]
