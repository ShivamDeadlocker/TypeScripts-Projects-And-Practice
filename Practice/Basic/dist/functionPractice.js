"use strict";
// Named function with type annotations
function add(a, b) {
    return a + b;
}
let resultNew = add(5, 3); // 8
console.log(resultNew);
// Void function (no return value)
function greet(name) {
    console.log("Hello, " + name);
}
// Optional parameter (use ?)
function greetUser(name, title) {
    if (title) {
        console.log(`Hello, ${title} ${name}`);
    }
    else {
        console.log(`Hello, ${name}`);
    }
}
greetUser("John"); // Hello, John
greetUser("John", "Mr."); // Hello, Mr. John
// Default parameter
function power(base, exponent = 2) {
    return Math.pow(base, exponent);
}
power(3); // 9  (uses default exponent of 2)
power(3, 3); // 27
//# sourceMappingURL=functionPractice.js.map