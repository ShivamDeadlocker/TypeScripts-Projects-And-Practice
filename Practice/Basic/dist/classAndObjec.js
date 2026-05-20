"use strict";
class Person {
    // Constructor
    constructor(fn, ln, age) {
        this.firstName = fn;
        this.lastName = ln;
        this.age = age;
    }
    // Method
    greet() {
        console.log(`Hello, I'm ${this.firstName} ${this.lastName}`);
    }
}
// Create object (instantiate)
let person1 = new Person("John", "Doe", 30);
person1.greet(); // Hello, I'm John Doe
//# sourceMappingURL=classAndObjec.js.map