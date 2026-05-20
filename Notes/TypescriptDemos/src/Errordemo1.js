function Divide(num1, num2) {
    if (num2 == 0) {
        throw new Error("Cant Divide by Zero");
    }
    var x = num1 / num2;
    console.log(x);
}
try {
    Divide(10, 0);
}
catch (err) {
    console.log(err.message);
}
finally {
    console.log("exit");
}
