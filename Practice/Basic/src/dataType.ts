// Number — integers AND decimals (unlike C# which has int, float, double)
let ageNew: number = 25;
let price: number = 19.99;

// String
let nameNew: string = "Alice";
let greeting: string = `Hello, ${nameNew}`; // template literals

// Boolean
let isLoggedIn: boolean = true;

// Void — for functions that return nothing
function sayHello(): void {
    console.log("Hello!");
}

sayHello();

// Null — intentional absence of value
let data: null = null;

// Undefined — variable declared but not assigned
let result: undefined = undefined;

// Any — opt out of type checking (use sparingly!)
let anything: any = "hello";
anything = 42;     // no error
anything = true;   // no error