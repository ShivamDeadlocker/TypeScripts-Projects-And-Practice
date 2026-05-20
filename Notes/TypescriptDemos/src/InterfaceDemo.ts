interface IFlyable
{
    fly():void;
}
interface ISwimmable
{
    swim():void;
}
class Duck implements IFlyable,ISwimmable
{
    fly():void{
        console.log("Duck can Fly");
    }
    swim():void{
        console.log("Duck is swimming");
    }
}
var d=new Duck();
d.fly();
d.swim();
 