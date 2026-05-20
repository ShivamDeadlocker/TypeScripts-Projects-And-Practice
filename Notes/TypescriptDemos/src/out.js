var A;
(function (A) {
    function show() {
        return "hello from A namespace";
    }
    A.show = show;
})(A || (A = {}));
let aa = A.show();
console.log(aa);
