//手写 instanceof 操作符
//遍历左边看能否找到右边的原型对象（right.prototype）
function myInstanceof(left, right) {
    while (true) {
        if (left === null) {
            return false;
        }
        if (left.__proto__ === right.prototype) {
            return true
        }
        left = left.__proto__
    }
}

const instanceOf = (l, r) => {
    while (l) {
        if (l === null) {
            return false
        }
        if (l === r.prototype) {
            return true
        }
        p = p.__proto__
    }
    return false
}

/**
 * 
 * 首先创建一个新的空对象
 * 设置原型，将对象的原型设置为函数的Prototype对象
 * 让函数的this指向这个对象，执行构造函数代码，为这个新对象添加属性
 * 判断函数的返回值类型，如果是值类型，返回创建的对象，如果是引用类型返回这个引用类型的对象
 */
function myNew(fn, ...args) {
    let obj = Object.create(fn.prototype);
    let res = fn.call(obj, ...args);
    if (res && (typeof res === 'object' || typeof res === 'function')) {
        return res;
    }
    return obj;
}
/**
 * apply 和 call 区别       传入的第一个参数都是this的指向
 * apply第二个参数是数组，或者类数组
 * call后面的其余参数是传入函数执行的参数【必须逐个列举出来】
 */

function New(foo, args) {
    let obj = Object.create(foo.prototype)
    let result = foo.apply(obj, args)
    
    return Object.prototype.toString.call(result) === '[object Object]' ? result : obj
}