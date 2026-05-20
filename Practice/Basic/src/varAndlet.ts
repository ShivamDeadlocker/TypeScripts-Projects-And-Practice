// With type annotation
let firstName: string;
let age: number;
let isActive: boolean;

// Without type (TypeScript infers it)
let messageNew; // type = 'any'

// Declaration + Assignment together (initialization)
let personName: string = "John";
let score = 100; // TypeScript infers 'number' automatically

console.log(`Person Name: ${personName} And Score: ${score}`);
