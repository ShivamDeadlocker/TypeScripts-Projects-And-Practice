// Function overload signatures
function add(a: number, b: number): number;
function add(a: string, b: string): string;

// Actual implementation of the function
function add(a: number | string, b: number | string): number | string {
    // Check if both parameters are numbers
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    // Check if both parameters are strings
    else if (typeof a === 'string' && typeof b === 'string') {
        return a + b;
    }
    // In case of incompatible types, throw an error
    else {
        throw new Error('Unsupported parameter types');
    }
}

// Test cases
console.log(add(5, 10)); // Output: 15
console.log(add('Hello', ' TypeScript')); // Output: Hello TypeScript
