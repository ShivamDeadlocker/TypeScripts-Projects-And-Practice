var MyClass = /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype.show = function () {
        console.log("Inside UnNamed Class");
    };
    return class_1;
}());
var p1 = new MyClass();
p1.show();
var MyClass1 = /** @class */ (function () {
    function MyClassDemo() {
    }
    MyClassDemo.prototype.disp = function () {
        console.log("InSide Named expression class");
    };
    return MyClassDemo;
}());
var p2 = new MyClass1();
p2.disp();
