"use strict";
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero!"); // throw exception
    }
    return a / b;
}
try {
    let result = divide(10, 0);
    console.log(result);
}
catch (error) {
    console.log("Error caught:", error.message); // "Cannot divide by zero!"
}
finally {
    console.log("This always runs"); // cleanup code
}
//# sourceMappingURL=exceptionH.js.map