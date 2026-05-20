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
var Employee1 = /** @class */ (function () {
    function Employee1(id, name, job) {
        this.empID = id;
        this.empName = name;
        this.JobTitle = job;
    }
    Employee1.prototype.printDetails = function () {
        console.log("EmpID:".concat(this.empID));
        console.log("Name:".concat(this.empName));
        console.log("Job Title:".concat(this.JobTitle));
    };
    return Employee1;
}());
var FullTimeEmployee = /** @class */ (function (_super) {
    __extends(FullTimeEmployee, _super);
    function FullTimeEmployee(id, name, job, sal) {
        var _this = _super.call(this, id, name, job) || this;
        _this.MonthlySalary = sal;
        return _this;
    }
    FullTimeEmployee.prototype.CalculateYearlySalary = function () {
        var calcSal = this.MonthlySalary * 12;
    };
    FullTimeEmployee.prototype.printDetails = function () {
        _super.prototype.printDetails.call(this);
        console.log("MonthlySalary=" + this.MonthlySalary);
    };
    return FullTimeEmployee;
}(Employee1));
var partTimeEmployee = /** @class */ (function (_super) {
    __extends(partTimeEmployee, _super);
    function partTimeEmployee(id, name, job, hourpay) {
        var _this = _super.call(this, id, name, job) || this;
        _this.hourlyPay = hourpay;
        return _this;
    }
    partTimeEmployee.prototype.calculatePerDaySalary = function (hours) {
        return this.hourlyPay * hours;
    };
    partTimeEmployee.prototype.printDetails = function () {
        _super.prototype.printDetails.call(this);
        var salP = this.calculatePerDaySalary(6);
        console.log("Per Day Salary=" + salP);
    };
    return partTimeEmployee;
}(Employee1));
var ContactBasesEmployee = /** @class */ (function (_super) {
    __extends(ContactBasesEmployee, _super);
    function ContactBasesEmployee(id, name, jobtitle, salary, contacrtPeriod) {
        var _this = _super.call(this, id, name, jobtitle, salary) || this;
        _this.contractPeriod = contacrtPeriod;
        return _this;
    }
    return ContactBasesEmployee;
}(FullTimeEmployee));
var obj = new FullTimeEmployee(1, "alina", "MGR", 25000);
obj.printDetails();
