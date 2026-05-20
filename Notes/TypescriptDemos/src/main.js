var Inogic;
(function (Inogic) {
    var Employee = /** @class */ (function () {
        function Employee(eid, ename, salary, da) {
            this.empid = eid;
            this.ename = ename;
            this.salary = salary;
            this.da = da;
        }
        Employee.prototype.printData = function () {
            console.log("EmpID:".concat(this.empid));
            console.log("EmpName:".concat(this.ename));
            console.log("Salary:".concat(this.salary));
            console.log("Da:".concat(this.da));
        };
        return Employee;
    }());
    Inogic.Employee = Employee;
})(Inogic || (Inogic = {}));
var obj1 = new Inogic.Employee(1, "Alina", 10000, 1000);
obj1.printData();
