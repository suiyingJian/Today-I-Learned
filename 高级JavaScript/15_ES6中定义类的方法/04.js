class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    running() {
        console.log(this.name + "running");
    }

    eating() {
        console.log(this.name + "eating");
    }

    personMethod() {
        console.log("处理逻辑1");
        console.log("处理逻辑2");
        console.log("处理逻辑3");

    }

    static staticMethod() {
        console.log("PersonStaticMethod");
    }
}