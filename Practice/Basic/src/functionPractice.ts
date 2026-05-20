// Named function with type annotations
function add(a: number, b: number): number {
    return a + b;
}

let resultNew = add(5, 3); // 8

console.log(resultNew);

// Void function (no return value)
function greet(name: string): void {
    console.log("Hello, " + name);
}

// Optional parameter (use ?)
function greetUser(name: string, title?: string): void {
    if (title) {
        console.log(`Hello, ${title} ${name}`);
    } else {
        console.log(`Hello, ${name}`);
    }
}

greetUser("John");          // Hello, John
greetUser("John", "Mr.");   // Hello, Mr. John

// Default parameter
function power(base: number, exponent: number = 2): number {
    return Math.pow(base, exponent);
}

power(3);    // 9  (uses default exponent of 2)
power(3, 3); // 27