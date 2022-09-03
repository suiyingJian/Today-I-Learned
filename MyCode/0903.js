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

