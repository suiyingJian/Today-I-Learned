// 去除数组的重复成员
[...new Set(array)]

// 去除字符串里面的重复字符。
const a = [...new Set('ababbc')].join('')
// "abc"


// Array.from方法可以将 Set 结构转为数组。
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);

// 这就提供了去除数组重复成员的另一种方法。

function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]


// 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构。

let set = new Set(['red', 'green', 'blue']);
let arr1 = [...set];
// ['red', 'green', 'blue']
// 扩展运算符和 Set 结构相结合，就可以去除数组的重复成员。

let arr2 = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr2)];
// [3, 5, 2]
