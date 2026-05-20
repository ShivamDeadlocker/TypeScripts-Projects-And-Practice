let a: null = null;
let b: undefined = undefined;

console.log(a == b);   // true  (loose equality)
console.log(a === b);  // false (strict equality)
console.log(Number(a)); // 0
console.log(Number(b)); // NaN