//npm --init y
//npm i --save-dev @types/node
//npm install prompt-sync
//import * as readline from 'node:readline'
//import {stdin,stdout} from 'process'
const prompt1=require('prompt-sync')();
let n1=prompt1("Enter a number");
let n2=prompt1("Enter 2nd numner");
let add=Number(n1)+Number(n2);
console.log(`Addition of 2 numbers=${add}`);

