"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ApplicationException = /** @class */ (function () {
    function ApplicationException(message) {
        //if(typeof console!='undefined')
        //{
        // console.log('Creating'+this.name+ '" '+this.message+' "');
        //}
        this.message = message;
        this.name = 'Application Error';
    }
    ApplicationException.prototype.toString = function () {
        return this.name + ':' + this.message;
    };
    return ApplicationException;
}());
var InputError = /** @class */ (function (_super) {
    __extends(InputError, _super);
    function InputError(msg) {
        var _this = _super.call(this, msg) || this;
        _this.msg = msg;
        return _this;
    }
    return InputError;
}(ApplicationException));
function Div() {
    var prompt = require('prompt-sync')({ sigint: true });
    var n1 = prompt("Enter a number");
    var n2 = prompt("Enter 2nd numner");
    if (n2 == 0) {
        //throw new Error("Number cant divide by Zero");
        throw new InputError("Number cant be divide by Zero");
    }
    var d = Number(n1) / Number(n2);
    console.log("Division of 2 numbers=".concat(d));
}
try {
    Div();
}
catch (err) {
    if (!(err instanceof ApplicationException)) {
        throw err;
    }
    console.log(err.message);
}
function ArrDisp() {
    var arr = [1, 2, 3, 4, 5];
    /*  arr.forEach(element => {
          console.log(element)
      });*/
    for (var i = 0; i <= arr.length; i++) {
        if (i >= arr.length) {
            throw new InputError("Index Out of Range : You are trying to access array index which is not exists");
        }
        console.log(arr[i]);
    }
}
try {
    ArrDisp();
}
catch (err) {
    if (!(err instanceof ApplicationException)) {
        throw err;
    }
    console.log(err.message);
}
