// 本来想些node代码 但是无从下手的感觉，那就写函数柯里化叭
// 柯里化的使用
function add(x, y, z) {
    return x + y + z
}

var result = add(10, 20, 30)
console.log(result);

function sum1(x) {
    return function (y) {
        return function (z) {
            return x + y +z
        }
    }
}

var result1 = sum1(10)(20)(30)
console.log(resilt1);

var sum2 = x => y => z => {
    return  x + y + z;
}

console.log(sum2(10)(20)(30));

var sum3 = x => y => z => x + y + z
console.log(sum3(10)(20)(30));