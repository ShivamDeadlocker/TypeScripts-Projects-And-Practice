"use strict";
// Regular function
function multiplyA(a, b) {
    return a * b;
}
// Arrow function (same thing, cleaner syntax)
const multiplyB = (a, b) => {
    return a * b;
};
// Even shorter for single-line returns
const multiplyC = (a, b) => a * b;
// C# equivalent: Func<int, int, int> multiply = (a, b) => a * b;
console.log(`Method A: ${multiplyA(5, 10)} Method B: ${multiplyA(5, 10)} Method C: ${multiplyA(5, 10)}`);
//# sourceMappingURL=arrowFunc.js.map