function ADD(number1, number2) {
    var sum = number1 + number2;
    console.log("Addition of 2 numbers =".concat(sum));
}
ADD(12, 23);
function ADD1() {
    var prompt = require('prompt-sync')({ sigint: true });
    var num1 = prompt("Enter First Number");
    var num2 = prompt("Enter Second Number");
    var sum = Number(num1) + Number(num2);
    console.log("Addition of 2 numbers =".concat(sum));
}
ADD1();
//function with return value
function Add2() {
    var prompt = require('prompt-sync')({ sigint: true });
    var num1 = prompt("Enter First Number");
    var num2 = prompt("Enter Second Number");
    var sum = Number(num1) + Number(num2);
    return sum;
}
var addition = Add2();
console.log(addition);
function Add3(n1, n2) {
    var sum = n1 + n2;
    return sum;
}
var prompt1 = require('prompt-sync')({ sigint: true });
var n1 = prompt1("Enter First Number");
var n2 = prompt1("Enter Second Number");
var SumVar = Add3(Number(n1), Number(n2));
console.log(SumVar);
//function expression
var FunName = function () {
    console.log("Hello from Function Expression");
};
FunName();
//Function Expression with parameter
var FunName1 = function (number1) {
    console.log(number1 * number1);
};
FunName1(8);
var FunName2 = function (number1) {
    return number1 * number1;
};
var result = FunName2(5);
console.log(result);
function Display() {
    console.log("hello");
}
Display();
