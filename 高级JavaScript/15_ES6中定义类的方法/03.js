var names = ["abc", "cba", "nba"]

class Person{
    constructor(name, age) {
        this.name = name
        this.age = age
        this._address = "十堰市"
    }

    eating() {
        console.log(this.name + "eating");
    }

    running() {
        console.log(this.name + "running~");
    }

    get address() {
        console.log("拦截访问操作");
        return this._address
    }

    set address(newAddress) {
        console.log("拦截设置操作");
        this._address = newAddress
    }
}