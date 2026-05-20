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
