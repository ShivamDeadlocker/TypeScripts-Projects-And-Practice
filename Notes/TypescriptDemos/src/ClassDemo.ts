namespace Inogic
{
export class Employee
{
   private empid;
   private ename;
    private salary;
    private da:number;
    constructor(eid,ename,salary,da)
    {
        this.empid=eid;
        this.ename=ename;
        this.salary=salary;
        this.da=da;

    }
    printData():void{
        console.log(`EmpID:${this.empid}`);
        console.log(`EmpName:${this.ename}`);
        console.log(`Salary:${this.salary}`);
        console.log(`Da:${this.da}`);
    }

}
}
var obj1=new Inogic.Employee(1,"Alina",10000,1000);
obj1.printData();
