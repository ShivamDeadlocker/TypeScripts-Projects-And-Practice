var A;
(function (A) {
    function show() {
        return "hello from A namespace";
    }
})(A || (A = {}));
var aa = A.show();
console.log(aa);
