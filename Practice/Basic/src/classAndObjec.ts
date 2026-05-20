class Person {
    // Properties
    firstName: string;
    lastName: string;
    age: number;

    // Constructor
    constructor(fn: string, ln: string, age: number) {
        this.firstName = fn;
        this.lastName = ln;
        this.age = age;
    }

    // Method
    greet(): void {
        console.log(`Hello, I'm ${this.firstName} ${this.lastName}`);
    }
}

// Create object (instantiate)
let person1 = new Person("John", "Doe", 30);
person1.greet(); // Hello, I'm John Doe