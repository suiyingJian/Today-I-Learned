/**
 * 知识点：如果A沿着原型链能找到B.prototype , 那么A instanceof B 为TRUE
 * 解法：
 * 遍历A 原型链，如果找到B.prototype ，返回true 否则返回FALSE
 */

const instanceOf = (A, B) => {
    let p = A
    while (p) {
        if (p === B.prototype) {
            return true
        } 
        p = p.__proto__;
    }

    return false;
}
