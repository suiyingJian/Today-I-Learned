// 1.push()
// 在尾部追加，类似于压栈，原数组会变
const arr = [1, 2, 3]
arr.push(7)
console.log(arr);

// 2.pop()
//在尾部弹出，类似于出栈，原数组会变，数组的push && pop 可以模拟常见数据结构之一：栈
const arr2 = [1, 2, 3]
const popVal = arr.pop()
console.log(popVal);
console.log(arr2);

// 模拟常见数据结构之一：栈
const stack = [0, 1]
stack.push(2)
console.log(stack);
const popValue = stack.pop()
console.log(popValue)
console.log(stack);
