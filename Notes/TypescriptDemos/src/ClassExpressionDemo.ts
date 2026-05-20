var MyClass=class{
    show():void{
        console.log("Inside UnNamed Class");
    }
}
let p4=new MyClass();
p4.show();

var MyClass1=class MyClassDemo
{
    disp():void{
        console.log("InSide Named expression class");
    }
}
var p2=new MyClass1();
p2.disp();

