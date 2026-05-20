var A;
(function (A) {
    var DemoClass = /** @class */ (function () {
        function DemoClass() {
        }
        DemoClass.prototype.show = function () {
            return "hello from A namespace";
        };
        return DemoClass;
    }());
})(A || (A = {}));
var obj = new A.DemoClass().show();
