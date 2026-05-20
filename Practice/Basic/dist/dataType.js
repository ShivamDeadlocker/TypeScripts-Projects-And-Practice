"use strict";
// Number — integers AND decimals (unlike C# which has int, float, double)
let ageNew = 25;
let price = 19.99;
// String
let nameNew = "Alice";
let greeting = `Hello, ${nameNew}`; // template literals
// Boolean
let isLoggedIn = true;
// Void — for functions that return nothing
function sayHello() {
    console.log("Hello!");
}
sayHello();
// Null — intentional absence of value
let data = null;
// Undefined — variable declared but not assigned
let result = undefined;
// Any — opt out of type checking (use sparingly!)
let anything = "hello";
anything = 42; // no error
anything = true; // no error
//# sourceMappingURL=dataType.js.map