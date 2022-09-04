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

function myInstanceOf(left, right) {
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

//数组去重
function uniqueArr(arr) {
    return [...new Set(arr)];
}

function uniqueArr(arr) {
    return [...new Set(arr)]
}

const MyArr = (arr) => {
    return [...new Set(arr)]
}

//call 函数实现
Function.prototype.myCall = function (context, ...args) {
    if (!context || context === null) {
        context = window;
    }

    let fn = Symbol();
    context[fn] = this;

    return context[fn](...args);
}

/**
 * 
 * 1. 判断调用对象是否为函数，即使我们是定义在函数原型上的，但可能出现使用call等方式调用情况。
 * 2.判断传入上下文对象是否存在，若不存在，则设置为window
 * 3. 处理传入的参数，截取第一个参数有后的所有参数
 * 4. 将函数作为上下文对象的一个属性
 * 5. 使用上下文对象来调用这个方法，并保存返回结果
 * 6. 删除刚才新增的属性
 * 7. 返回结果
 */

//call 函数实现
Function.prototype.myCall = function (context) {
    // 判断调用对象是否为函数
    if (typeof this !== 'function') {
        console.error('type error')
    }
    // 获取参数
    let args = [...arguments].slice(1),
        result = null;
    // 判断context是否传入，若未传 则设置为window
    context = context || window
    // 将调用函数设为对象的方法
    context.fn = this
    // 调用函数
    result = context.fn(...args)
    // 将属性删除
    delete context.fn
    return result;
}

/**
 * 
 *apply 函数的实现步骤：

判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
判断传入上下文对象是否存在，如果不存在，则设置为 window 。
将函数作为上下文对象的一个属性。
判断参数值是否传入
使用上下文对象来调用这个方法，并保存返回结果。
删除刚才新增的属性
返回结果
 */
// apply函数的实现
Function.prototype.myApply = function (context) {
    // 判断调用对象是否为函数
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    let result = null;

    //判断context 是否存在，若未传入则为window 
    context = context || window
    // 将函数设为对象的方法
    context.fn = this
    // 调用方法
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    // 将属性删除
    delete context.fn;
    return result;

}

Function.prototype.myApply = function (context, args) {
    if (!context || context === null) {
        context = window;
    }

    let fn = Symbol();
    contest[fn] = this;

    return context[fn](...args)
}