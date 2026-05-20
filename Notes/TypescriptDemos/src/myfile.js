//npm --init y
//npm i --save-dev @types/node
//npm install prompt-sync
//import * as readline from 'node:readline'
//import {stdin,stdout} from 'process'
var prompt1 = require('prompt-sync')();
var n1 = prompt1("Enter a number");
var n2 = prompt1("Enter 2nd numner");
var add = Number(n1) + Number(n2);
console.log("Addition of 2 numbers=".concat(add));
var num1;
var num2;
num1 = 10;
num2 = 20;
var n3 = num1++;
var n4 = ++num2;
console.log(n3);
console.log(n4);
var b1 = true;
var b2 = false;
console.log((b1 && b2));
console.log((b1 || b2));
console.log(!b1);
console.log(!b2);
console.log(-num1);
var str = "Welcome to the world of ";
var str1 = "Typescript";
str = str + str1;
console.log(str);
console.log(typeof (num1));
(num1 > num2) ? console.log("A is greater") : console.log("B is greater");
num1 += num2;
console.log(num1);
console.log("Hello");
