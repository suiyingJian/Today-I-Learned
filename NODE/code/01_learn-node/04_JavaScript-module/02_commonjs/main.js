/**
 * Node中实现CommonJS的本质就是对象的引用赋值
 * exports {name, age, sayHello}
 */

// bar = {name, age, sayHello}
const bar = require('./bar');

console.log(bar.name);
console.log(bar.age);
bar.sayHello("kobe");

setTimeout(() => {
  console.log(bar.info.name); // 111111
}, 2000);

// setTimeout(() => {
//   bar.name = "哈哈哈";
// }, 1000);


// console.log(name);
// console.log(age);
// sayHello("james");






const obj = {
  name: "why",
  age: 18
}

const info = obj;

const info = {
  name: "why",
  age: 18
}

const obj = info;

// obj.name = "kobe";

// console.log(info.name); // kobe











