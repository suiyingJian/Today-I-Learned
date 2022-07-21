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

    static randomPerson() {
        var nameIndex = Math.floor(Math.random() * names.length)
        var name = names[nameIndex]
        var agee = Math.floor(Math.random() * 100)
        return new Person(name,age)
    }
}

var p = new Person("why", 18)
p.eating()
p.running()

console.log(p.address);
p.address = "北京市"
console.log(p.address);

console.log(Objext.getOwnPropertyDescriptors(Person.prototype));

for (var i = 0; i < 50; i++) {
    console.log(Person.randomPeirson());
}