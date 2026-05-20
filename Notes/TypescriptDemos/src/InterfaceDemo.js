var Duck = /** @class */ (function () {
    function Duck() {
    }
    Duck.prototype.fly = function () {
        console.log("Duck can Fly");
    };
    Duck.prototype.swim = function () {
        console.log("Duck is swimming");
    };
    return Duck;
}());
var d = new Duck();
d.fly();
d.swim();
