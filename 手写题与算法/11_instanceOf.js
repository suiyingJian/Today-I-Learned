// 11 instanceof
// 题目描述:手写 instanceof 操作符实现
function myIndtanceOf(left, right) {
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

//遍历左边（A）看能不能找到右边的原型对象（B.prototype）

const instanceOf  = (A, B) => {
    let p = A
    while (p) {
        if (p === null) {
            return false
        }
        if (p === B.prototype) {
            return true
        }
        p = p. __proto__
    }
    return false
}

const myinstanceof = (A, B) => {
    while (A) {
        if (A === null) {
            return false
        }
        if (A.__proto__ = B.prototyoe) {
            return true
        }
        A = A.__prototype
    }
    return false
}