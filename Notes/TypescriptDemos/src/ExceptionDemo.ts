import * as readline from 'node:readline';
import {stdin,stdout} from 'process'
class ApplicationException implements Error
{
    public name='Application Error';
    constructor(public message:string)
    {
        //if(typeof console!='undefined')
        //{
          // console.log('Creating'+this.name+ '" '+this.message+' "');
        //}

    }
    toString()
    {
        return this.name+ ':' + this.message;
    }
}
class InputError extends ApplicationException
{
    constructor(public msg : string)
    {
        super(msg);
    }
}
function Div():void{
const prompt=require('prompt-sync')({sigint:true});
let n1=prompt("Enter a number");
let n2=prompt("Enter 2nd numner");
if(n2==0)
{
    //throw new Error("Number cant divide by Zero");
    throw new InputError("Number cant be divide by Zero");
}
let d=Number(n1)/Number(n2);
console.log(`Division of 2 numbers=${d}`);

}
try{
Div();
}catch(err)
{
    if(!(err instanceof ApplicationException))
    {
        throw err;
    }
    console.log(err.message);
    
}
function ArrDisp():void
{
    var arr:number[]=[1,2,3,4,5];
  /*  arr.forEach(element => {
        console.log(element)
    });*/

    for(var i:number=0;i<=arr.length;i++)
    {
        if(i>=arr.length)
        {
            throw new InputError("Index Out of Range : You are trying to access array index which is not exists");
        }
        console.log(arr[i]);
    }
}
try
{
ArrDisp();
}
catch(err)
{
    if(!(err instanceof ApplicationException))
    {
        throw err;
    }
    console.log(err.message);
}