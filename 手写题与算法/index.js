/*第一周2022.5.18 - 2022.5.20
1.手写防抖
防抖是实际工作开发很常用的一个工具函数，它的作用是：在规定时间间隔内，如果函数被频繁触发，那么只会触发一次。
使用场景
● 搜索框实时搜索。只需要用户最后一次输入完，再请求接口。
● 窗口大小的resize。只需要等窗口大小调整完，再计算窗口大小，防止重复渲染。
简单点说，当一个动作连续触发，只执行最后一次。
关键思点：
比如我要给fn函数加防抖，现在连续两次触发fn
● 第二次执行之前要把第一次执行的取消掉，那就要记录上一次的执行，那就运用到闭包。
● clearTimeout可以把定时任务取消掉
*/
function debounce(fn, delay = 500) {
    let timer = null;
    return function (...args) {
        const context = this;
        if (timer) {
            clearTimeout(timer)
            timer = null;
        }
        timer = setTimeout(() => {
            fn.apply(context, args);
            timer = null;
        }, delay)
    }
}
// 测试

/*2.手写节流
节流的作用就是，当同一个函数频繁触发，每过一段时间就会触发一次。
使用场景
● 滚动加载，滚动时间的监听
● 高频表单提交
关键点：
比如我要给fn函数加节流，时间间隔是1s，现在持续并在很短的时间触发fn
● 如果两次时间间隔超过了1s，则执行回调函数
*/
function throttle(fn, delay = 500) {
    let last;
    return function (...args) {
        let now = Date.now();
        if (!last || now - last >= delay) {
            fn.apply(this, args);
            last = now;
        }
    }
}
// Demo:

/*3.手写Promise

再升级一下：*/
async function test1() {
    console.log(1);
    await test2();
    console.log(3);
}
async function test2() {
    await console.log(2);
}
test1();
new Promise((resolve) => {
    console.log(4);
    resolve(5);
}).then((res) => {
    console.log(res);
});

function test1() {
    console.log(1);
    Promise.resolve(
        test2()
    ).then(() => {
        console.log(3)
    })
}
function test2() {
    return Promise.resolve(Promise.resolve().then(() => {
        console.log(2)
    }))
}
test1();
new Promise((resolve) => {
    console.log(4);
    resolve(5);
}).then((res) => {
    console.log(res);
});
/* 
主要还是复习一下async/await的实现原理
一步一步来实现Promise。
Promise的三种状态
首先，promise有三种状态：pending，fullfilled，rejected；我们一般是通过new来获取一个promise实例，并传入一个函数参数，所以我们先写promise的构造函数：
*/const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'rejected';
function myPromise(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
}
/* 
resolve/reject
第二步，fn函数调用时，需要提供两个参数resolve，reject,这两个参数是函数，是用来改变promise的状态的，promise状态一旦改变，就被凝固了，所以我们的resolve，reject两个函数的实现： */
const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'rejected';
function myPromise(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    const self = this;

    function resolve(value) {
        if (self.status === PENDING) {
            self.status = FULLFILLED;
            self.value = value;
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reasoon = reason;
        }
    }
}
// 第三步，我们就要调用构造函数传进来的fn函数 
const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'rejected';
function myPromise(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    const self = this;

    try {
        fn(resolve, reject)
    } catch (error) {
        reject(error)
    }

    function resolve(value) {
        if (self.status === PENDING) {
            self.status = FULLFILLED;
            self.value = value;
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reasoon = reason;
        }
    }
}
/* 
then方法
第四步，实现then方法。先来看一下promiseA+规范下，then方法需要做什么？
then方法接受两个参数
promise.then(onFulfilled, onRejected)
1. onFullfilled和onRejected都是可选参数
  a. 如果onFullfilled不是函数，则忽略
  b. 如果onRejected不是函数，则忽略
2. 如果onFullfilled是一个函数：
  a. promise的状态变成fullfilled该函数必须被调用，并且第一个参数是promise的终值value（可能是resolve(value)或者returnValue）
  b. promise状态不是fullfilled时不能执行
  c. 其调用次数不能超过一次
3. 如果onRejected是一个函数
  a. promise状态变成rejected时该函数必须被调用，并且第一个参数是promise的异常reason
  b. promise状态不是rejected时不能执行
  c. 其调用次数不能超过一次
4. onFullfilled和onRejected只有在执行栈中仅包含平台代码才能被调用。也就是这两个函数是异步执行的。
5. onFullfilled和onRejected必须是函数直接调用的方式，也就是不能用call/apply/bind修改this的指向
6. 同一个promise可以多次调用then方法
  a. 如果promise是onFullfilled状态，则按添加顺序依次执行then方法
  b. 如果promise是onRejected状态，则按添加顺序依次执行catch方法
7. then方法必须返回一个promise
promise2 = promise1.then(onFullfilled,onRejected);
  a. 如果 onFullfilled 或者 onRejected成功执行，返回一个值 x，则运行下面的 Promise 解决过程：[[Resolve]](promise2,x)
  b. 如果onFullfilled或onRejected抛出一个异常e，那么promise2只能是onRejected状态，并且e就是promise2的reject拒绝原因。
  c. 如果onFullfilled不是一个函数，且promise1成功执行了，那么promise2必须成功执行并返回相同结果
  d. 如果onRejected不是一个函数，且promise1抛出一个异常了，那么promise2必须拒绝执行，并返回相同的异常
好，现在我们来实现then方法：
*/
const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'rejected';
//...省略前面的代码
myPromise.prototype.then = function (onFullfilled, onRejected) {
    // 如果传入的onFullfilled/onRejected 不是函数，但我们也要返回一个正常的函数,以便promise的结果继续传递下去
    let onFullfilledFunc = onFullfilled;
    if (typeof onFullfilled !== 'function') {
        onFullfilledFunc = function (value) {
            return value;
        };
    }

    let onRejectedFunc = onRejected;
    if (typeof onRejected !== 'function') {
        onRejectedFunc = function (reason) {
            throw reason;
        };
    }
    if (this.status === FULLFILLED) {
        onFullfilledFunc(this.value);
    }

    if (this.status === REJECTED) {
        onRejectedFunc(this.reason);
    }

    if (this.status === PENDING) {
        // ??? 这里要怎么办
    }
};
/** 
如果当前promise状态是pending，不能执行then的回调函数，所以我们需要用一个then函数外部的变量去保存回调函数，等这个promise resolved/rejected时再执行。又因为同一个promise可以被多次调用then，且执行顺序遵循添加顺序，因此我们需要用队列去存then的回调方法。*/
const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'rejected';
function myPromise(fn) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    this.thenCallbacks = [];
    this.catchCallbacks = [];
    const self = this;
    try {
        fn(resolve, reject)
    } catch (error) {
        reject(error)
    }

    function resolve(value) {
        // 因为resolve在外部被调用时有可能被修改this，所以这里用self
        if (self.status === PENDING) {
            self.status = FULLFILLED;
            self.value = value;
            // pending转成其他状态才会执行回调函数，因为也只有在pending时才会将回调函数放进这个数组
            self.thenCallbacks.forEach(cb => {
                cb(value)
            })
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
            self.catchCallbacks.forEach(cb => {
                cb(reason)
            })
        }

    }
}
myPromise.prototype.then = function (onFullfilled, onRejected) {
    // 如果传入的onFullfilled/onRejected 不是函数，但我们也要返回一个正常的函数,以便promise的结果继续传递下去
    let onFullfilledFunc = onFullfilled;
    if (typeof onFullfilled !== 'function') {
        onFullfilledFunc = function (value) {
            return value
        }
    }

    let onRejectedFunc = onRejected;
    if (typeof onRejected !== 'function') {
        onRejectedFunc = function (reason) {
            throw reason
        }
    }
    // 因为then是内部函数，所以不用self,直接用this
    if (this.status === FULLFILLED) {
        onFullfilledFunc(this.value)
    }

    if (this.status === REJECTED) {
        onRejectedFunc(this.reason)
    }

    if (this.status === PENDING) {
        this.thenCallbacks.push(onFullfilledFunc);
        this.catchCallbacks.push(onRejectedFunc);
    }
}
/** 
那么到目前为止，then方法的七个规范，还剩下第4点和第7点还没实现，即：
第4点：then的回调函数必须是异步执行
第7点：then必须返回一个新的promise
目前then方法还不能链式调用，链式调用的条件是：一是then挂载在promise的原型上，二是then方法要返回新的promise。
第七条规范里有个很重要的点是then返回的promise2状态和结果是依赖与上一个then的onFullfilled和onRejected。
*/
new Promise((resolve, reject) => {
    resolve(1);
})
    // 第一个then
    .then(
        res => {
            console.log(res);
            return 2;
        },
        error => {
            // 这里返回的error，是传给下一个then的onFullfilled函数
            return error;
        }
    )
    // 第二个then是依赖于第一个then的执行结果的
    .then(
        res => {
            console.log(res);
            return 3;
        },
        error => { }
    );
//1
//2
/**
那么有个问题：如何保证后then在前一个then方法的onFullfilled或onRejected执行结束后再执行呢？
答案就是：在返回的新promise同步代码中去执行onFullfilled和onRejected */
myPromise.prototype.then = function (onFullfilled, onRejected) {
    // 省略前面代码


    // 也就是把当前then的回调函数都放到下一个新promise的同步中执行，这样一旦回调函数执行有结果就可以用新promise的resolve/reject
    return new myPromise((resolve, reject) => {
        if (this.status === FULLFILLED) {
            try {
                let x = onFullfilledFunc(this.value);
                resolve(x);
            } catch (error) {
                reject(error);
            }
        }

        if (this.status === REJECTED) {
            try {
                let x = onRejectedFunc(this.reason);
                // 如果上一个then的rejected有返回值也要resolved
                resolve(x);
            } catch (error) {
                reject(error);
            }
        }
        // 如果是pending状态，那么也不能直接保存到队列，需要包一层捕获异常
        if (this.status === PENDING) {
            // 承前启后的作用，上一个promise resolve时才会调用这个thenCallbacks中的函数，而thenCallbacks中函数又调用了下一个promise resolve。就这样循环往复实现了链式调用
            this.thenCallbacks.push(function (value) {
                try {
                    let x = onFullfilledFunc(value);
                    resolve(x);
                } catch (error) {
                    reject(error);
                }
            });
            this.catchCallbacks.push(function (reason) {
                try {
                    let x = onRejectedFunc(reason);
                    // 如果上一个then的rejected有返回值也要resolved
                    resolve(x);
                } catch (error) {
                    reject(error);
                }
            });
        }
    });
};
/**
到这里还只是实现了第七个规范的第二三四点，还剩下第一点，第一点难点在于我们要处理onFullfilled或onRejected返回值是promise的情况。 */
myPromise.prototype.then = function (onFullfilled, onRejected) {
    // ... 省略前面代码

    // 也就是把当前then的回调函数都放到下一个新promise的同步中执行，这样一旦回调函数执行有结果就可以用新promise的resolve/reject
    return new myPromise((resolve, reject) => {
        const fullfilled = value => {
            try {
                let result = onFullfilledFunc(value);
                return result instanceof myPromise
                    ? result.then(resolve, reject)
                    : resolve(result);
            } catch (error) {
                reject(error);
            }
        };
        const rejected = reason => {
            try {
                let result = onRejectedFunc(reason);
                return result instanceof myPromise
                    ? result.then(resolve, reject)
                    : resolve(reason);// 注意这里是resolve，而不是reejct
            } catch (error) {
                reject(error);
            }
        };
        switch (this.status) {
            case FULLFILLED:
                fullfilled(this.value);
                break;
            case REJECTED:
                rejected(this.reason);
                break;
            case PENDING:
                this.thenCallbacks.push(fullfilled);
                this.catchCallbacks.push(rejected);
                break;
        }
    });
};
/** 
现在还剩最后一个，onFullfilled和onRejected的运行时机，如何异步执行？根据我所了解的，微任务和宏任务都是异步的，那么微任务和宏任务都有哪些呢？

宏任务有：
1. <script>
2. setTimeout
3. setInterval
4. setImmediate
5. DOM Event
6. requestAnimationFrame
7. I/O
8.MessageChannel
9. postMessage
微任务有：
1. Promise.then/Promise.catch/Promise.finally
2. queueMicrotask
3. process.nextTick
4. MutationObserver
拓展：https://www.zhihu.com/question/316514618
我们还是选择最常用的setTimeout方法让then回调函数异步执行。

*/
myPromise.prototype.then = function (onFullfilled, onRejected) {
    // 如果传入的onFullfilled/onRejected 不是函数，但我们也要返回一个正常的函数,以便promise的结果继续传递下去
    let onFullfilledFunc = onFullfilled;
    if (typeof onFullfilled !== 'function') {
        onFullfilledFunc = function (value) {
            return value;
        };
    }

    let onRejectedFunc = onRejected;
    if (typeof onRejected !== 'function') {
        onRejectedFunc = function (reason) {
            throw reason;
        };
    }
    // 也就是把当前then的回调函数都放到下一个新promise的同步中执行，这样一旦回调函数执行有结果就可以用新promise的resolve/reject
    return new myPromise((resolve, reject) => {
        const fullfilled = value => {
            setTimeout(() => {
                try {
                    let result = onFullfilled(reason);
                    return result instanceof myPromise
                        ? result.then(resolve, reject)
                        : resolve(value);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        };
        const rejected = reason => {
            setTimeout(() => {
                try {
                    let result = onRejectedFunc(reason);
                    // 即使rejected，也要resolved，而不是reject
                    return result instanceof myPromise
                        ? result.then(resolve, reject)
                        : resolve(reason);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        };
        switch (this.status) {
            case FULLFILLED:
                fullfilled(this.value);
                break;
            case REJECTED:
                rejected(this.reason);
                break;
            case PENDING:
                this.thenCallbacks.push(fullfilled);
                this.catchCallbacks.push(rejected);
                break;
        }
    });
};
/**
为什么是在then的回调函数加setTimeout，而不是直接在resolve和reject加，如果promise的状态一开始就是被凝固的，那就不会执行到resolve/reject函数，是直接执行的onFullfilled和onRejected函数，因此把onFullfilled和onRejected的执行放到setTimeout中。
测试
好，走到这里我感觉差不多了。

直接过promise A+的测试工具promises-aplus-tests。
新建了一个项目：

根据promises-aplus-tests工具的官网要求，我们需要在myPromise实现一个静态方法defferred

这个方法需要返回一个对象，其包含处于pending状态的promise实例、myPromsie的resolve和reject方法。
defferred方法的目的就是拿到我们实现的promise,resolve和reject函数的引用 

*/
myPromise.deferred = function () {
    let result = {};
    result.promise = new MyPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject
    })
    return result
}
module.exports = MyPromise
/** 
测试遇到的问题
跑case遇到的问题：
1. onFullfilled不是函数时要忽略，并返回和promise1相同的返回值

检查一下代码，发现fullfilled方法调用错了，应该是onFullfilledFunc

还有resolve时传错参数了。


2. 如果onFullfilled的返回结果x是promise2 ，要报TypeError错误。
*/
MyPromise.prototype.then = function (onFullfilled, onRejected) {
    // ... 省略前面的代码

    const promise2 = new MyPromise((resolve, reject) => {
        const fullfilled = () => {
            setTimeout(() => {
                try {
                    let result = onFullfilledFunc(this.value)
                    // If promise and x refer to the same object, reject promise with a TypeError as the reason.
                    if (result === promise2) reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
                    else {
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(result)
                        }
                    }
                } catch (error) {
                    reject(error)
                }
            }, 0)
        }
        const rejected = () => {
            setTimeout(() => {
                try {
                    let result = onRejectedFunc(this.reason)
                    //If promise and x refer to the same object, reject promise with a TypeError as the reason.
                    if (result === promise2) reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
                    else {
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(result)
                        }
                    }
                } catch (error) {
                    reject(error)
                }
            }, 0)
        }
        switch (this.status) {
            case FULLFILLED:
                fullfilled()
                break
            case REJECTED:
                rejected()
                break
            case PENDING:
                this.thenCallbacks.push(fullfilled)
                this.catchCallbacks.push(rejected)
                break
        }
    })
    return promise2
}
/** 
Go on！
3. 要处理x是thenable（即带有then方法的对象）的情况

我看这里的时候，百思不得其解，为啥要去兼容这种情况，难道我在onFullfilled函数里面就不能正常返回一个带有then属性的对象吗？
参考了这篇文章之后，才了解到，promise还有其他规范，而promiseA+规范要海纳百川，要去兼容其他人写的Promise规范。https://xie.infoq.cn/article/e2483968019dd14138daa9708
因此，2.3.3: Otherwise, if `x` is an object or function 这个case是测试你写的promise能不能兼容其他人写的then方法。
到现在我也才注意到promise A+规范 关于Promise resolution procedure的解释：

如果早看到这个解释，不就省了很多时间，直接按照这个规范实现就完事了，还自己一个人在那绞尽脑汁。
反思一下自己，总把英语当成仇人一样，一看到英语就烦，既然走上了程序员这条路，不可避免经常和英文打交道，如果自己的英文水平一直在原地踏步，那自己的实力也许也仅限于此。要从心态上转变，不要排斥外语，祖宗说得好，师夷长技以制夷。学好或重视外语，跟上时代，跟上潮流，才能不轻易被淘汰。
OK，那我们就需要实现一个resolvePromise方法，用来处理onFullfilled和onRejected的返回值。
*/
function resolvePromise(promise2, x, resolve, reject) {
    //  防止循环引用
    if (promise2 === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
        let called = false
        //  为什么要用try？因为有可能检索属性x.then时会报错，例如用Object.defineProperty进行劫持，然后抛出一个错误
        try {
            let then = x.then
            if (typeof then === 'function') {
                // 为什么用then.call而不是x.then? 因为可以减少二次检索的风险
                then.call(
                    x,
                    y => {
                        if (called) return
                        called = true
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    r => {
                        if (called) return
                        called = true
                        reject(r)
                    }
                )
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        resolve(x)
    }
}
/** 
还有个疑问：  我们在resolve和reject方法中，在then方法里面的this.status限制了只会执行一次回调函数，为什么resolvePromsie方法还要用called去防止多次调用呢？
其实这个resolvePromsie方法的本质就是为了兼容其他规范的promise，说白了就是霸道总裁，不要你觉得，只要我觉得。虽然我们的then方法有限制，但是别人自己定义的promsie规范，不一定有这个限制。比如别人实现的then方法，当promise状态从pending变成fullfilled时，onFullfilled和onRejected成功和失败回调函数都调用，这个called的作用就是防止这种规范。*/
// Promise终极版
/**
 * 手写promise A+规范
 */
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'
function MyPromise(fn) {
    this.status = PENDING
    this.value = null
    this.reason = null
    this.thenCallbacks = []
    this.catchCallbacks = []
    const self = this
    try {
        fn(resolve, reject)
    } catch (error) {
        reject(error)
    }

    function resolve(value) {
        // 因为resolve在外部被调用时有可能被修改this，所以这里用self
        if (self.status === PENDING) {
            self.status = FULLFILLED
            self.value = value
            // pending转成其他状态才会执行回调函数，因为也只有在pending时才会将回调函数放进这个数组
            self.thenCallbacks.forEach(cb => {
                cb(value)
            })
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED
            self.reason = reason
            self.catchCallbacks.forEach(cb => {
                cb(reason)
            })
        }
    }
}
MyPromise.prototype.then = function (onFullfilled, onRejected) {
    // 如果传入的onFullfilled/onRejected 不是函数，但我们也要返回一个正常的函数,以便promise的结果继续传递下去
    let onFullfilledFunc = onFullfilled
    if (typeof onFullfilled !== 'function') {
        onFullfilledFunc = function (value) {
            return value
        }
    }

    let onRejectedFunc = onRejected
    if (typeof onRejected !== 'function') {
        onRejectedFunc = function (reason) {
            throw reason
        }
    }
    // 也就是把当前then的回调函数都放到下一个新promise的同步中执行，这样一旦回调函数执行有结果就可以用新promise的resolve/reject
    const promise2 = new MyPromise((resolve, reject) => {
        const fullfilled = () => {
            setTimeout(() => {
                try {
                    let result = onFullfilledFunc(this.value)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0)
        }
        const rejected = () => {
            setTimeout(() => {
                try {
                    let result = onRejectedFunc(this.reason)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0)
        }
        switch (this.status) {
            case FULLFILLED:
                fullfilled()
                break
            case REJECTED:
                rejected()
                break
            case PENDING:
                this.thenCallbacks.push(fullfilled)
                this.catchCallbacks.push(rejected)
                break
        }
    })
    return promise2
}
/**
 * 对resolve()和reject()改造增强，针对onFullfiled和onRejected的不同返回值情况进行处理
 * @param {promise} promise2 promise.then返回的新promise实例
 * @param {any} x onFullfilled或onRejected的返回值
 * @param {function} resolve promise2的resolve方法
 * @param {function} reject promise2的reject方法
 * @returns 
 */
function resolvePromise(promise2, x, resolve, reject) {
    //  防止循环引用
    if (promise2 === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
        let called = false
        //  为什么要用try？因为有可能检索属性x.then时会报错，例如用Object.defineProperty进行劫持，然后抛出一个错误
        try {
            let then = x.then
            if (typeof then === 'function') {
                // 为什么用then.call而不是x.then? 因为可以减少二次检索的风险
                then.call(
                    x,
                    y => {
                        if (called) return
                        called = true
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    r => {
                        if (called) return
                        called = true
                        reject(r)
                    }
                )
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        resolve(x)
    }
}
// 测试专用
MyPromise.deferred = function () {
    let result = {};
    result.promise = new MyPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject
    })
    return result
}
module.exports = MyPromise
// 增加了resolvePromsie顺利通过872个测试用例。Nice！🎉🎉🎉

// Promise (无注释版）
const PENDING = 'pending'
const FULLFILLED = 'fullfilled'
const REJECTED = 'rejected'
function MyPromise(fn) {
    this.status = PENDING
    this.value = null
    this.reason = null
    this.thenCallbacks = []
    this.catchCallbacks = []
    const self = this
    try {
        fn(resolve, reject)
    } catch (error) {
        reject(error)
    }

    function resolve(value) {
        if (self.status === PENDING) {
            self.status = FULLFILLED
            self.value = value
            self.thenCallbacks.forEach(cb => {
                cb(value)
            })
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED
            self.reason = reason
            self.catchCallbacks.forEach(cb => {
                cb(reason)
            })
        }
    }
}
MyPromise.prototype.then = function (onFullfilled, onRejected) {
    let onFullfilledFunc = onFullfilled
    if (typeof onFullfilled !== 'function') {
        onFullfilledFunc = function (value) {
            return value
        }
    }

    let onRejectedFunc = onRejected
    if (typeof onRejected !== 'function') {
        onRejectedFunc = function (reason) {
            throw reason
        }
    }
    const promise2 = new MyPromise((resolve, reject) => {
        const fullfilled = () => {
            setTimeout(() => {
                try {
                    let result = onFullfilledFunc(this.value)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0)
        }
        const rejected = () => {
            setTimeout(() => {
                try {
                    let result = onRejectedFunc(this.reason)
                    resolvePromise(promise2, result, resolve, reject)
                } catch (error) {
                    reject(error)
                }
            }, 0)
        }
        switch (this.status) {
            case FULLFILLED:
                fullfilled()
                break
            case REJECTED:
                rejected()
                break
            case PENDING:
                this.thenCallbacks.push(fullfilled)
                this.catchCallbacks.push(rejected)
                break
        }
    })
    return promise2
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
        let called = false
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(
                    x,
                    y => {
                        if (called) return
                        called = true
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    r => {
                        if (called) return
                        called = true
                        reject(r)
                    }
                )
            } else {
                resolve(x)
            }
        } catch (error) {
            if (called) return
            called = true
            reject(error)
        }
    } else {
        resolve(x)
    }
}
MyPromise.deferred = function () {
    let result = {};
    result.promise = new MyPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject
    })
    return result
}
module.exports = MyPromise
/**
Promise （Class版）- 未完成
未完待续
Promise（TS版）- 未完成
未完待续
https://bigfrontend.dev/zh/problem/create-your-own-Promise
其他Promise方法
这些方法虽然不在Promise/A+规范里，但是都是基于上面的实现进行封装的API，我们就根据MDN上的说明进行封装即可。
Promise.resolve
Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。如果这个值是一个 promise ，那么将返回这个 promise ；如果这个值是thenable（即带有"then"方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；否则返回的promise将以此值完成。此函数将类promise对象的多层嵌套展平。 
*/
MyPromise.resolve = function (value) {
    if (value instanceof MyPromise) return value
    const promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            try {
                // 直接使用上面封装好的resolvePromise来处理value为不同值的情况
                resolvePromise(promise2, value, resolve, reject)
            } catch (error) {
                reject(error)
            }
        }, 0)
    })
    return promise2
}
/**
Promise.reject
Promise.reject()方法返回一个带有拒绝原因的Promise对象。
reject方法很简单，传什么就reject什么即可。
MyPromise.reject = function (reason){
  return new MyPromise((resolve,reject)=>{
    reject(reason)
  })
}
Promise.prototype.catch

catch() 方法返回一个Promise (en-US)，并且处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。 (事实上, calling obj.catch(onRejected) 内部calls obj.then(undefined, onRejected)).
哈哈哈哈，其实MDN就已经把这个方法的实现告诉我们了，catch方法就是调用内部的then方法，第一个参数给undefined，相当于不传第一个参数即可。
 */
MyPromise.prototype.catch = function (onRejected) {
    // 本身then就返回一个promise，所以直接返回then的调用结果即可
    return this.then(undefined, onRejected)
}
/** 
Promise.prototype.finally
finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。
这避免了同样的语句需要在then()和catch()中各写一次的情况。

● 与Promise.resolve(2).then(() => {}, () => {}) （resolved的结果为undefined）不同，Promise.resolve(2).finally(() => {}) resolved的结果为 2。
● 同样，Promise.reject(3).then(() => {}, () => {}) (fulfilled的结果为undefined), Promise.reject(3).finally(() => {}) rejected 的结果为 3。
怎么理解上面这句话呢？
finally也会返回一个新的promise，但这个promise的结果是继承于上一个promise的，看下面的例子就明白了：
*/
new Promise(function (resolve, reject) {
    resolve(1);
}).finally(() => { console.log('finally'); return 2 }).then(console.log)
// finally
// 1
/**
如果finally根据回调函数的结果，返回一个新promise，那么then回调函数应该打印的是2
因此我一开始的解法是想当然的，是错误的：
MyPromise.prototype.finally = function(onFinally){
  return this.then(onFinally,onFinally)
}
我们要把上一个promise的结果继承并传递下去 
*/
MyPromise.prototype.finally = function (onFinally) {
    return this.then(
        (value) => {
            onFinally();
            return value;
        },
        (error) => {
            onFinally();
            throw error;
        }
    );
};

// 这是别人实现的finally 方法，暂时还理解不透
MyPromise.prototype.finally = function (onFinally) {
    return this.then(
        (value) => {
            return MyPromise.resolve(onFinally()).then(() => value);
        },
        (error) => {
            return MyPromise.resolve(onFinally()).then(() => {
                throw error;
            });
        }
    );
};
/**
Promise.all
Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例， 那个输入的所有promise的resolve回调的结果是一个数组。这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。它的reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息。

这里引用前端小包对promise.all的理解
Promise.all 类似于一群并肩而行的兄弟的老大，参数类比一群兄弟，只有全部兄弟都开心了，老大才开心，有一个兄弟不开心，老大就不开心。 
*/
MyPromise.all = function (iterable) {
    return new MyPromise((resolve, reject) => {
        const result = [];
        for (let i = 0, len = iterable.length; i < len; i++) {
            let ps = iterable[i];
            if (!(ps instanceof MyPromise)) {
                ps = MyPromise.resolve(ps);
            }
            ps.then(
                (res) => {
                    result[i] = res;
                    if (result.length === len) {
                        resolve(result);
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        }
    });
};
/**
这个版本有一个缺点，就是promise.all只能接受可用for循环遍历的数组和String类型作为参数。
但是根据MDN的描述，promise.all是可以接受iterable类型的参数，形如Set、Map等ES6类型的参数，因此我们要再写一个更完善promise.all.
iterable类的类型都可以通过for-of进行遍历的，我们只需要用count来模拟for循坏的索引i即可。
 */
MyPromise.all = function (iterable) {
    return new MyPromise((resolve, reject) => {
        const result = [];
        let count = 0;
        let len = iterable.length
        if (len === 0) {
            resolve()
        }
        try {
            for (let it of iterable) {
                count++;
                MyPromise.resolve(it).then(
                    (data) => {
                        result[count] = data;
                        if (result.length === len) {
                            resolve(result);
                        }
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        } catch (error) {
            reject(error);
        }
    });
};
/**
版本二有两个致命的问题：
1. iterable不一定有length属性，Set、Map就没有length属性，只有Array和String有。
2. count产生闭包问题。因为MyPromise.resolve(it).then是异步执行的，当执行then回调函数时，count已经是最终值了。
可以使用let声明一个变量解决闭包问题。
 */
MyPromise.all = function (iterable) {
    return new MyPromise((resolve, reject) => {
        const result = [];// 保存成功resolve的promise，顺序和iterable一致
        let count = 0; // 记录promise的个数，随着iterable遍历而递增
        let fulfilledCount = 0; // 成功resolve的promise个数
        try {
            for (let it of iterable) {
                // 这里使用到闭包，记录当前promie的索引，用于保证result的顺序和iterable一致
                let i = count;
                // 索引自增
                count++;
                // 无论什么样的值都先转成promise
                MyPromise.resolve(it).then(
                    (data) => {
                        fulfilledCount++;
                        result[i] = data;
                        // 执行到这里时，count已经已经是一个固定值，代表iterable的长度
                        // if判断成立，说明iterable最后一个promise已经完成了
                        if (fulfilledCount === count) {
                            resolve(result);
                        }
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
            // 规范规定，传入的iterable是一个空数组的话，就要返回空数组
            if (count === 0) {
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    });
};
/**
Promise.race
Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。
更详细的描述：
race 函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。
如果传的迭代是空的，则返回的 promise 将永远等待。
如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值。
 */

MyPromise.race = function (iterable) {
    return new MyPromise((resolve, reject) => {
        try {
            for (let it of iterable) {
                MyPromise.resolve(it).then(
                    (res) => {
                        resolve(res);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        } catch (error) {
            reject(error)
        }
    });
};
/**
promise.race 最简单好理解，只要有一个状态变了就resolve/reject即可。

Promise.allSettled
该Promise.allSettled()方法返回一个在所有给定的 promise 都已经fulfilled或rejected后的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果。
返回的对象数据格式如下：
● 如果是fulfilled：Object { status: "fulfilled", value: 3 }
● 如果是Rejected：Object { status: "rejected", reason: "foo" }

allSettled和all有点相似，不同之处在于：
● allSettled会等所有的promise成功或失败，再返回所有promise的结果
● allSettled返回的格式是固定的
所以只要在all的基础上，进行改造即可。

*/
MyPromise.allSettled = function (iterable) {
    return new MyPromise((resolve, reject) => {
        const result = [];
        let count = 0;
        let finishCount = 0; // promise完成的总数
        try {
            for (let it of iterable) {
                let i = count;
                count++;
                MyPromise.resolve(it).then(
                    (data) => {
                        finishCount++;
                        // 成功时返回成功格式数据
                        result[i] = {
                            status: 'fulfilled',
                            value: data
                        };
                        // 全部promise完成
                        if (finishCount === count) {
                            resolve(result);
                        }
                    },
                    (reason) => {
                        finishCount++;
                        result[i] = {
                            status: 'rejected',
                            reason
                        };
                        // 全部promise完成
                        if (finishCount === count) {
                            resolve(result);
                        }
                    }
                );
            }
            // 规范规定，传入的iterable是一个空数组的话，就要返回空数组
            if (count === 0) {
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    });
}

// 总结
/** 

参考https://github.com/promises-aplus/promises-spechttps://segmentfault.com/a/1190000023157856https://www.zhihu.com/question/316514618https://xie.infoq.cn/article/e2483968019dd14138daa9708https://github.com/zcxiaobao/zcBlog/tree/main/promise

题外题
如何取消promise
思路：
1. 包装一个辅助promise，把resolve和reject引用赋值给外面的变量，可以在外面控制这个promise
2. 利用promise.race，参数是辅助promise和想被取消的promise
3. 要取消时，调用辅助promise的resolve
*/

function cancelPromise(promise) {
    const obj = Object.create(null)
    const pro = new Promise((resolve, reject) => {
        obj.resolve = resolve
        obj.reject = reject
    })
    obj.promise = Promise.race([pro, promise])
    return obj
}
let p = new Promise(resolve => {
    setTimeout(() => {
        resolve(123)
    }, 3000)
})

let c = cancelPromise(p)// 包装一层
c.promise.then(console.log)
c.resolve("取消")
/** 
async/awiat的实现原理
看下面这题输出顺序：
*/
async function test1() {
    console.log(1);
    await test2();
    console.log(3);
}
async function test2() {
    console.log(2);
}
test1();
new Promise((resolve) => {
    console.log(4);
    resolve(5);
}).then((res) => {
    console.log(res);
});
// 这题应该可以容易得出输出顺序是1->2->4->3->5
// 稍微改一下题目：
async function test1() {
    console.log(1);
    await test2();
    console.log(3);
}
async function test2() {
    await console.log(2);
}
test1();
new Promise((resolve) => {
    console.log(4);
    resolve(5);
}).then((res) => {
    console.log(res);
});
/** 
顺序变成了：1->2->4->5->3
这就需要知道async/await的实现原理了。
async/await其实是co和generator函数的语法糖。
generator函数是一个状态机，遇到yield就暂停，需要手动去执行next函数才会继续走下去，如果done为true则停下来。
而co的作用就是自动执行generator的next函数，直到done为true就停止下来。
*/
// generator函数永远只返回函数，只有调用返回函数的next函数，才会开始执行gen函数里面的代码
function* gen() {
    console.log('go');
    yield 'hello'
    yield 'world'
    return 'ending'
}
let g = gen();// 此时gen函数里面的代码还没有开始执行
while (1) {
    let result = g.next();
    console.log(result) // 打印结果格式：{value:T,done:boolean}
    if (result.done === true) break
    else {
        console.log(result.value)
    }
}
/*
输出结果：
go!
{value: 'hello', done: false}
hello
{value: 'world', done: false}
world
{value: 'ending', done: true}
*/

// 参考这位大佬的博客https://juejin.cn/post/7084074118206717966，实现一个针对value是promise的简陋版async/await
function generatorToAsync(generator) {
    let args = Array.prototype.slice(arguments, 1);
    // 先执行generator函数
    let gen = generator.apply(this, args)
    return function () {
        return new Promise((resolve, reject) => {
            // 先启动generator函数，拿到第一个yield的结果，然后执行next
            onFulfilled()
            function onFulfilled(value) {
                let res = gen.next(value)
                next(res)
            }
            // next函数的作用是如果done不返回true就一直执行onFulfilled，也就是执行generator函数的next函数，使得generator函数继续执行下去
            function next(result) {
                let { done, value } = result
                if (done) return resolve(value)
                return Promise.resolve(value).then(onFulfilled)
            }
        })
    }
}
// 然后我们用generator函数结合generatorToAsync方法，替换掉上面升级版的async/await的写法，得到的效果是一样的。
function* gen1() {
    console.log(1)
    yield test2()
    console.log(3)
}
function* gen2() {
    yield console.log(2)
}
var test1 = generatorToAsync(gen1)
var test2 = generatorToAsync(gen2)
test1()
new Promise((resolve) => {
    console.log(4);
    resolve(5);
}).then((res) => {
    console.log(res);
});

再简化一点相当于
function test1() {
    console.log(1);
    console.log(2)
    Promise.resolve(Promise.resolve(undefined).then(onFulfilled)).then(() => {
        console.log(3)
    })
}
test1();
new Promise((resolve) => {
    console.log(4);
    resolve(5);
}).then((res) => {
    console.log(res);
});
/**

是不是恍然大悟了，😁
其实我们去看babel转换async / await的代码的实现也是如此，上面的generatorToAsync函数，在babel中是asyncGeneratorStep方法：
也是使用了Promise.resolve(value).then的方式去执行下一次的next 
*/
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
/** 

总结：
1. async / await就是结合了generator和promise的链式调用的一个语法糖。
2. generator函数遇到yield就暂停，执行next函数就继续，直到done为true时则返回。
3. co库的作用就是让generator函数自动执行，把下一次调用next方法放到了promise.then回调函数中，利用promise的链式调用，实现等待上一个yield有结果时，再继续执行next方法。
4. 以后遇到await语句，可以把await后面的语句做个转换：
*/
await event1
event2
//等价于：
Promise.resolve(event1).then(event2)
/** 

参考：https://developer.51cto.com/article/697957.htmlhttps://juejin.cn/post/7084074118206717966
ES6 commonJS 区别 - 未完成
require和import的区别
*/

// 参考：https://github.com/yuanyuanbyte/Blog/issues/134
/** *
第二周2022.5.30 - 2022.6.3
1. 手写bind
首先思考bind的作用有哪些？
Function.prototype.bind(thisArg, ...args)
1. 改变函数的this指向thisArg
2. 返回一个新函数
3. 新函数里面执行旧函数
/
Function.prototype.bind = function (newThis, ...args) {
    const fn = this;//保存当前函数的this，作用是等待以后执行
    return function (...params) {
        return fn.call(newThis, ...args, ...params)
    }
}
 /**

bind的核心流程就是上面的初级版，是不是so easy？？？要更完善一些，需要考虑其他边界和极端情况：
1. 当前对象不是函数，虽然我们把bind方法挂载在了Function.prototype对象上，但是也有可能该对象被call修改了this的指向。要判断当前对象是否是函数。
2. 返回的新函数有可能被用作构造函数。如果是构造函数，要忽略提供的newThis。
3. 既然是构造函数，那就需要继承。如果是构造函数，新函数的prototype要继承旧函数的prototype。
 */
Function.prototype.bind = function (newThis, ...args) {
    if (typeof this !== 'function') throw new TypeError('Must be function');
    let fn = this;//保存当前函数的this，作用是等待以后执行,以及被继承
    const boundFunction = function bound(...params) {
        // 是否是构造函数可以用instanceof来判断
        const cxt = this instanceof bound ? this : newThis
        return fn.apply(cxt, args.concat(params)
  }
    boundFunction.prototype = Object.create(fn.prototype);// 寄生组合继承
    return boundFunction
}
/** 

关于JS的继承，详细可阅读
参考：https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/function-bind.js
2. 手写深拷贝
深拷贝：1. 考虑数组的情况  2. 考虑循环引用

*/
function deepCopy(obj, map = new Map()) {
    if (!obj || typeof obj !== 'object') return obj;
    let result = Array.isArray(obj) ? [] : {};
    if (map.has(obj)) {
        return map.get(obj)
    } else {
        map.set(obj, result)
    }
    Object.keys(obj).forEach(key => {
        let value = obj[key];
        result[key] = typeof value === 'object' ? deepCopy(value) : value
    })
    return result;

}
 /** 

这个初级版还有什么地方可以改进的吗？
1. map可以使用weakMap。
a.Map和WeakMap的区别；
b.JS的垃圾内存回收机制、GC；
c.内存泄漏以及解决方式；
d.项目中的内存优化
2. 其他数据类型的克隆
a.日期
b.正则表达式
c.函数
d.等等，可以参考lodash的baseClone
3. 性能优化
a.不同遍历数组或对象的方式的性能
ⅰ.for -in
    ⅱ.for
ⅲ.while
ⅳ.forEach
*/

 /** 

3. 函数柯里化
函数柯里化是一种高阶函数技术，把一个接受多个参数的函数变成接受单一参数的函数。
可以这样去理解柯里化后的函数：用闭包保存参数，等参数满足执行函数了，就执行函数，否则继续返回函数。
相关题目：实现 add(1)(2)(3)，add(1, 2)(3)，add(1)(2, 3)
JS版
我们先从简单的来，先实现add(1)(2)，add(1)(2)(3)，add(1)(2)(3)(4)再总结规律，进行升级。*/
// add(1)(2)
function add(a) {
    return function (b) {
        return a + b
    }
}
// add(1)(2)(3)
function add(a) {
    return function (b) {
        return function (c) {
            return a + b + c
        }
    }
}
// add(1)(2)(3)(4)
function add(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return a + b + c + d
            }
        }
    }
}
// 可以看出来，只要参数还不够，就会一直返回一个函数，返回的函数都是一样的，所以这个可以使用递归；如果参数长度满足了，就把之前传入的参数进行相加即可。
function add() {
    let args = Array.prototype.slice.call(arguments, 0);
    if (args.length >= 4) {
        return args.reduce((prev, curv) => prev + curv, 0)
    } else {
        return function temp() {
            args = args.concat(Array.prototype.slice.call(arguments, 0));
            if (args.length >= 4) {
                return args.reduce((prev, curv) => prev + curv, 0)
            } else {
                return temp
            }
        }
    }
}

// 判断参数是否大于等于4和求和这两个步骤有重复的，我们可以直接让add函数递归，这样更简洁：
let slice = Array.prototype.slice
function add() {
    let self = this
    let args = slice.call(arguments, 0);
    return function () {
        args = args.concat(slice.call(arguments, 0))
        if (args.length >= 4) {
            return args.reduce((prev, curv) => prev + curv, 0)
        } else {
            return add.apply(self, args)
        }
    }
} /** 
但是这样相比上一个版本的有个缺点，add 必须调用两次以上才可以，因为add(1, 2, 3, 4)是返回一个函数。
因此我们不能直接使用add，我们需要一个curry对add进行转换*/
function sum(...args) {
    return args.reduce((prev, curv) => prev + curv, 0)
}
function curry(fn) {
    let self = this
    let length = fn.length || 4
    return function temp(...args) {
        if (args.length >= length) {
            return fn.apply(self, args)
        } else {
            return (...arg) => temp(...args, ...arg)
        }
    }
}
const add = curry(sum)
console.log(add(1)(2)(3)(4))
console.log(add(1, 2, 3, 4))
console.log(add(1, 2)(3, 4))
 /** 

现在来看，只要记住柯里化的作用就是：用闭包保存参数，当参数足够时，就执行函数。
实现逻辑就是：如果参数满足，则执行函数，否则递归继续执行相同的逻辑。
更简洁版本：*/
var curry = fn =>
    temp = (...args) =>
        args.length >= fn.length
            ? fn(...args)
            : (...params) => temp(...args, ...params);
// curry函数支持传入参数的：
var curry = (fn, ...params) =>
    temp = (...args) =>
        params.concat(args).length >= fn.length
            ? fn(...params, ...args)
            : curry(fn, ...params, ...args)
// 超简洁版的curry，传入的fn的参数不能是...args这种剩余参数，因为这种方式，fn.length是等于0的。

// TS版 - 未完成

            /** 

参考：
1. https://github.com/mqyqingfeng/Blog/issues/42
2. https://zh.javascript.info/currying-partials
第三周2022.6.3 - 2022.6.10
1. 控制最大并发数量

题目来源：https://libin1991.github.io/2019/02/06/%E4%B8%80%E9%81%93%E8%B5%8B%E5%80%BC%E9%9D%A2%E8%AF%95%E9%A2%98%E5%BC%95%E5%8F%91%E7%9A%84%E6%80%9D%E8%80%833%E3%80%90%E5%B9%B6%E5%8F%91%E6%95%B0%E6%8E%A7%E5%88%B6%E3%80%91/
类似的题目还有：有100个请求，并发请求数量最多是6个，怎样才能最快完成这100个请求。
我们需要是实现一个通用的方法createParallRequest(tasks, max)，这个方法的作用：
1. 发送并发请求
2. 最大并发数量有限制，最多是max
3. 并发请求每成功一个就从等待队列tasks中补上
4. 最后返回结果按tasks顺序返回

思路：用一个while循环，只要当前并发个数count少于max，就从tasks中获取下一个执行，然后count加1，一旦某一个task执行then之后，就将count减一。*/
function createParallRequest(tasks, max) {
    let result = []
    let count = 1
    let i = 0
    while (i < tasks.length) {
        if (count <= max) {
            let ps = tasks[i]()
            ps.then(res => {
                console.log(`第${i}个完成：${res}`)
                result[i] = res
                count--
            })
            count++
            i++
        }
    }
    return result
}
跑一下测试用例：
function req(res, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res)
        }, delay)
    })
}
createParallRequest([
    req.bind(null, 1, 1000),
    req.bind(null, 2, 500),
    req.bind(null, 3, 2000),
    req.bind(null, 4, 100)],
    2)

恭喜你把浏览器卡嗝屁了。
这个方法理想很丰满，现实很骨感，这里犯了一个很大的错误，就是ps.then回调方法是需要等同步任务的while循环执行完是才会执行的，所以这个代码会进入一个无限循环之中。
所以不能使用循环的方式。
可以借鉴Generator + Promise实现await的方式，第三点【并发请求每成功一个就从等待队列tasks中补上】，一个请求成功之后就要获取下一个promise，可以把这个当成一个递归的过程。递归终止的条件是当前遍历tasks的索引到了尾部。

function createParallRequest(tasks, max) {
    let len = tasks.length;
    let result = new Array(len).fill(null);
    let i = 0;//tasks的索引，每执行一个task就自增
    let fulfilledCount = 0; //请求成功的个数
    let pendingCount = 0; //正在请求的个数
    return new Promise(resolve => {
        const run = () => {
            if (fulfilledCount == len) {
                resolve(result)// 所有请求都结束时，就返回
                return;
            }
            if (i >= len) return // 所有tasks都执行之后，就不要继续了，如果再继续就数组越界了
            let j = i; // 利用块级作用域，保存当前索引
            let task = tasks[i]
            task().then(res => {
                result[j] = res; // 结果顺序要和tasks一致
                fulfilledCount++;
                pendingCount--;
                run(); // 每完成一个task，就要启动另一个task
            })
            i++; // tasks数组向右移动的指针
            if (pendingCount <= max && i < len) {
                run()
                pendingCount++
            }

        }
        run()
    })
}


再走一下测试用例：
function req(res, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(res)
        }, delay)
    })
}
createParallRequest([
    req.bind(null, 1, 1000),
    req.bind(null, 2, 500),
    req.bind(null, 3, 2000),
    req.bind(null, 4, 100)],
    2).then(console.log)
// console输出：[1,2,3,4]
这个测试用例，按执行顺序的话，应该是2 -> 1 -> 4 -> 3。
但是createParallRequest返回的结果顺序要按照其所在的tasks位置进行返回，所以，返回的结果应该是[1, 2, 3, 4]

还有其他用例：
var urls = [
    'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg',
    'https://www.kkkk1000.com/images/getImgData/gray.gif',
    'https://www.kkkk1000.com/images/getImgData/Particle.gif',
    'https://www.kkkk1000.com/images/getImgData/arithmetic.png',
    'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
    'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg',
    'https://www.kkkk1000.com/images/getImgData/arithmetic.gif',
    'https://www.kkkk1000.com/images/wxQrCode2.png'
];

function loadImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = function () {
            console.log('一张图片加载完成');
            resolve();
        }
        img.onerror = reject
        img.src = url
    })
};
let tasks = urls.map(url => {
    return function () {
        return loadImg(url)
    }
})
createParallRequest(tasks, 2)
参考：https://juejin.cn/post/7082393784767496206


2. 数组扁平化
实现一个多维数组转化成一维数组的方法。
方法一：递归
function flatten(array) {
    let result = []
    for (let item of array) {
        if (Array.isArray(item)) {
            result = result.concat(flatten(item))
        } else {
            result.push(item)
        }
    }
    return result
}
var arr = [1, 2, 3, [3, 3, 3, [5, 4, 5, 6, 6, 7, 8]], [333, 4444]];
console.log(flatten(arr))
//  [1,2,3,3,3,3,5,4,5,6,6,7,8,333,4444]

方法二：reduce
利用数组的原型reduce方法，其实原理和上面第一种方法是差不多的。
function flatten(array) {
    return array.reduce((prev, curv) => {
        if (Array.isArray(curv)) {
            return [...prev, ...flatten(curv)]
        }
        else {
            return [...prev, curv]
        }
    }, [])
}
或者也可以更简洁一点：
function flatten(array) {
    return array.reduce((prev, curv) => {
        return prev.concat(Array.isArray(curv) ? flatten(curv) : curv)
    }, [])
}

网上还有更简单粗暴的方式：
var arr = [1, 2, 3, [3, 3, 3, [5, 4, 5, 6, 6, 7, 8]], [333, 4444]];

arr.join(",").split(",")
不过仅限于数组所有项都是数字的，局限性很大，不具备通用性，这里就不详细讨论了。

3. 对象数组结构和树形结构的相互转化
// 对象数组
source = [{
    id: 1,
    pid: 0,
    name: 'body'
}, {
    id: 2,
    pid: 1, // 父节点的id
    name: 'title'
}, {
    id: 3,
    pid: 2,
    name: 'div'
}]
// 树形结构
tree = [{
    id: 1,
    pid: 0,
    name: 'body',
    children: [{
        id: 2,
        pid: 1,
        name: 'title',
        children: [{
            id: 3,
            pid: 1,
            name: 'div'
        }]
    }]
}]

树形结构转为扁平化数组结构

function treeToArray(treeArr) {
    let result = [];
    let stack = treeArr
    while (stack.length) {
        let node = stack.shift();
        result.push(node)
        if (Array.isArray(node.children) && node.children.length > 0) {
            result = result.concat(treeToArray(node.children))
        }
    }
    return result
}

数组结构转为树形结构

function listToTree(list) {
    let hash = new Map()
    let result = []
    for (let item of list) {
        hash.set(item.id, item)
    }
    for (let item of list) {
        let parent = hash.get(item.pid)
        if (parent) {
            if (Array.isArray(parent.children)) {
                parent.children.push(item)
            } else {
                parent.children = [item]
            }
        } else {
            result.push(item)
        }
    }
    return result
}
题目可再升级：增加一个最大层数的限制，超过这个层数的节点就不需要加到树上了。

参考：
https://www.xiabingbao.com/post/algorithm/tree-to-list-r85xj6.html
            /** 

第四周2022.6.13 - 2022.6.17
1. 实现模板字符串解析功能*/
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
    name: '姓名',
    age: 18
}
render(template, data); // 我是姓名，年龄18，性别undefined
    /**

思路：
1. i = 0从头遍历字符串，初始化html
2. 如果遇到{
    {，即str[i] === '{'和str[i + 1] === '{'
        a.获取{ { 到 } } 之间的key已经最后一个
    } 的索引index
    b.匹配data[key]，并将其添加到html
    c.i = index + 1
    d.继续遍历
    3. 如果不是{
        {
            a.将当前字符str[i]添加到html
            b.i++，循环继续
            4. i小于str.length - 1时，循环结束，因为我们循环里面需要判断str[i + 1]所以i < len - 1时循环就停止。
            let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
            let data = {
                name: '姓名',
                age: 18
            } 
            */
            function render(template, data) {
                let html = ""
                let key = ""
                let i = 0
                let len = template.length
                while (i < len - 1) {
                    if (template[i] === '{' && template[i + 1] === '{') {
                        let { index, key } = getKeyAndIndex(template, i + 2)
                        key = key.trim()
                        html += data[key]
                        i = index + 1
                    } else {
                        html += template[i]
                        i++
                    }
                }
                function getKeyAndIndex(template, start) {
                    let res = ""
                    let index = start;
                    while (index < len - 1) {
                        if (template[index] === '}' && template[index + 1] === '}') {
                            res = template.slice(start, index)
                            break
                        } else {
                            index++
                        }
                    }
                    return {
                        index: index + 1,
                        key: res
                    }
                }
                return html
            }

            console.log(render(template, data)); // 我是姓名，年龄18，性别undefined


            function render(template, data) {
                return template.replace(/\{\{(.*?)\}\}/gi, (match, $1) => {
                    return data[$1.trim()]
                })
            }

            // 2. 实现一个对象的 flatten 方法

            const obj = {
                a: {
                    b: 1,
                    c: 2,
                    d: { e: 5 }
                },
                b: [1, 3, { a: 2, b: 3 }],
                c: 3
            }
            // flatten(obj) 结果返回如下
            // {
            //     'a.b': 1,
            //         'a.c': 2,
            //             'a.d.e': 5,
            //                 'b[0]': 1,
            //                     'b[1]': 3,
            //                         'b[2].a': 2,
            //                             'b[2].b': 3,
            //                                 c: 3
            // }
            /** 
            先思考，后动手。
            思路：
            遍历对象，如果当前obj[key]是object类型，则进行递归，并把当前的属性路径和最终结果传递给子对象，如果是非object类型，则将当前属性路径记录到result中。*/
            function flatten(target, parent = "", result = {}) {
                if (!target || typeof target !== 'object') return target
                Object.keys(target).forEach(key => {
                    let value = target[key]
                    let newKey = parent + (Array.isArray(target) ? `[${key}]` : `${parent ? "." : ""}${key}`)
                    if (typeof value === 'object') {
                        flatten(value, newKey, result)
                    } else {
                        result[newKey] = value
                    }
                })
                return result
            }

            /** 

            总结：
            1. flatten和深拷贝的思路是差不多的，只不过需要把当前路径通过参数的形式传给子对象
            2. 属性路径根据父对象区分数组索引和对象属性

            PS：很多在处理父子关系的时候，也是通过把父亲的信息，通过函数参数的方式传递给儿子。最近在学习webpack 热更新的原理的时候，发现require函数引用模块时，会记录当前模块的父亲模块是谁，孩子模块是谁，原理也和flatten方法有异曲同工之处。*/
            // 3. 发布订阅模式

            class Emitter {
                constructor() {
                    this.events = {}
                }
                on(name, fn) {
                    if (this.events[name]) {
                        this.events[name].push(fn)
                    } else {
                        this.events[name] = [fn]
                    }
                }
                emit(name, data) {
                    if (this.events[name]) {
                        this.events[name].forEach(fn => {
                            fn(data)
                        })
                    }
                }
            }
            let emitter = new Emitter()
            emitter.on('gg', (data) => {
                console.log("触发了gg", data)
            })
            setTimeout(() => {
                emitter.emit('gg', { name: 'John', age: 18 })
            }, 1000)

            增加once和off：
            class EimtterEvent {
                constructor() {
                    this.events = Object.create(null)
                }
                on(name, callback) {
                    if (this.events[name]) {
                        this.events[name].push(callback)
                    } else {
                        this.events[name] = [callback]
                    }
                }
                off(name, callback) {
                    if (this.events[name]) {
                        this.events[name].filter(cb => cb !== callback)
                    }
                }
                // 巧妙的结合了off和on
                once(name, callback) {
                    function fn() {
                        callback()
                        this.off(name, callback)
                    }
                    this.on(name, fn)
                }
                emit(name, ...args) {
                    (this.events[name] || []).forEach(cb => cb.apply(this, args))
                }
            }

            /**
            第五周 2022.6.20-2022.6.24
            1. 手写new操作符
            new 的时候做了那些事情？
            1. 创建一个新对象
            2. 将新对象的原型(__proto__)指向构造函数的原型(ctor.prototype)
            3. 执行构造函数代码，并把this指向这个新对象
            4. 如果构造函数返回值是一个对象，则返回这个对象，否则返回新对象
             */
            function myNew(ctor, ...args) {
                let newObj = Object.create(ctor.prototype);
                let result = ctor.apply(newObj, args)
                return Object.prototype.toString.call(result) === '[object Object]' ? result : newObj
            }
            /** 
           问问自己：
           1. 为什么要把新对象的原型指向构造函数的原型？
           答：因为new操作符是创建一个实例，那么就要继承父类的属性和方法，JS中继承的方式之一就是原型继承。
           2. 为什么要把this指向新对象？
           答：因为既然是继承，那么实例也要有自己的属性和方法，而且和父类相互独立，因此要让构造函数里的this指向新对象。
           */

            /**
            2. 手写instanceof
            instanceof的作用：判断右边的原型是否在左边的原型链上。（关键点：两个原型）
            通过__proto__或者Object.getPrototypeOf方法不断向上获取左边对象的原型，直到追溯到null
             */

            function ins(left, right) {
                if (!right || typeof right !== 'object' || typeof right.prototype !== 'object') {
                    throw TypeError('error')
                }
                let l = Object.getPrototypeOf(left)
                let proto = right.prototype
                while (l) {
                    if (l === proto) return true
                    l = Object.getPrototypeOf(left)
                }
                return false
            }
            // 3. 实现千位符
            // 1. 正则表达式
            function format(number) {
                let s = String(number)
                return s.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
            }
            /** 
            g全局匹配有个特点：如果匹配到了，则从当前匹配的索引继续匹配。
            比如上面这个正则表达匹配'1234567'
            首先会匹配到1，因为1后面跟着234和567两组千位组，此时遍历的索引lastIndex=0
            接着会从lastIndex=1的位置继续走，也就是234567，匹配到234，因为234后面跟着一组千位组。
            */
            function format(number) {
                let s = String(number)
                return s.replace(/\d{1,3}(?=(\d{3})+\.\d+$)/g, '$&,')
            }
            // https://juejin.cn/post/6844904014824505352
            /** 
        2. 非正则表达式
        思路：
        1. 从右往左遍历字符串，每走三步，就把这三步组成的字符串和逗号添加到队列a
        2. 遍历完之后，将队列逆序，并且合并成字符串即可。
        */
            function format(number) {
                let str = number.toString()
                let a = [];
                let thousand = ""
                for (let len = str.length, i = len - 1; i >= 0;) {
                    if (thousand.length === 3) {
                        a.push(thousand, ',')
                        thousand = ""
                    } else {
                        thousand = str[i] + thousand
                        i--
                    }
                }
                a.push(thousand)
                return a.reverse().join('')
            }
            /** 
            4. 实现大整数相加
            思路：
            1. 把整数分割成一个个数字保存到数组，短的数组前面用0补齐，使得和另外一个数组长度相同。
            2. 从数组尾部开始，相加，如果相加结果大于10，则用一个临时变量temp=1，用来记录进位数
            */
            function add(a, b) {
                let arr1 = a.toString().split('').map(v => Number(v))
                let arr2 = b.toString().split('').map(v => Number(v))
                if (arr1.length > arr2.length) {
                    arr2 = new Array(arr1.length - arr2.length).fill(0).concat(arr2)
                }
                if (arr1.length < arr2.length) {
                    arr1 = new Array(arr2.length - arr1.length).fill(0).concat(arr1)
                }
                let result = []
                let temp = 0
                while (arr1.length) {
                    let sum = arr1.pop() + arr2.pop() + temp
                    temp = sum >= 10 ? 1 : 0
                    sum = sum % 10
                    result.push(sum)
                }
                if (temp) result.push(temp)
                return Number(result.reverse().join(''))
            }
            console.log(add('9999', '9999'))