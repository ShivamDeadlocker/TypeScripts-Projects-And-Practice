function ADD(number1:number,number2:number)
{
    var sum=number1+number2;
    console.log(`Addition of 2 numbers =${sum}`);
}
ADD(12,23);
function ADD1()
{
    const prompt=require('prompt-sync')({sigint:true});
    let num1=prompt("Enter First Number");
    let num2=prompt("Enter Second Number");
    let sum:number=Number(num1)+Number(num2);
    console.log(`Addition of 2 numbers =${sum}`);

}
ADD1();
//function with return value
function Add2():number{
    const prompt=require('prompt-sync')({sigint:true});
    let num1=prompt("Enter First Number");
    let num2=prompt("Enter Second Number");
    let sum:number=Number(num1)+Number(num2);
    return sum;
}
let addition=Add2();
console.log(addition);
function Add3(n1:number,n2:number):number{
    let sum=n1+n2;
    return sum;
}
const prompt1=require('prompt-sync')({sigint:true});
    let n1=prompt1("Enter First Number");
    let n2=prompt1("Enter Second Number");
    let SumVar=Add3(Number(n1),Number(n2));
    console.log(SumVar);
//function expression
var FunName =()=>{
    console.log("Hello from Function Expression");
}
FunName();
//Function Expression with parameter
var FunName1=(number1:number)=>{
    console.log(number1*number1);
}
FunName1(8);

var FunName2=(number1:number):number=>{
    return number1*number1;
}
let result=FunName2(5);
console.log(result);
function Display():void
{
    console.log("hello");
}
Display();
