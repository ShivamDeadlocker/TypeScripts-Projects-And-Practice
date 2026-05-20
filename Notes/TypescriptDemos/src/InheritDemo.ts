class Employee1
{
    empID;
    empName;
    JobTitle;
    constructor(id:number,name:string,job:string)
    {
        this.empID=id;
        this.empName=name;
        this.JobTitle=job;
    }
    printDetails():void
    {
        console.log(`EmpID:${this.empID}`);
        console.log(`Name:${this.empName}`);
        console.log(`Job Title:${this.JobTitle}`);
    }

}
class FullTimeEmployee extends Employee1
{
    
    MonthlySalary;
    constructor(id:number,name:string,job:string,sal:number)
    {
        super(id,name,job);
       
        this.MonthlySalary=sal;
    }
    CalculateYearlySalary():void{
        let calcSal=this.MonthlySalary*12;
    }
    printDetails():void{
        super.printDetails();
        console.log("MonthlySalary="+this.MonthlySalary);
    }
}
class partTimeEmployee extends Employee1
{
    hourlyPay;
    constructor(id:number,name:string,job:string,hourpay:number)
    {
        super(id,name,job);
       
        this.hourlyPay=hourpay;
    }
    calculatePerDaySalary(hours:number):number
    {
        return this.hourlyPay*hours;
    }
    printDetails():void{
        super.printDetails();
        var salP=this.calculatePerDaySalary(6);
        console.log("Per Day Salary="+salP);
    }
}
class ContactBasesEmployee extends FullTimeEmployee
{
    contractPeriod;
    constructor(id:number,name:string,jobtitle:string,salary:number,contacrtPeriod:number)
    {
        super(id,name,jobtitle,salary);
        this.contractPeriod=contacrtPeriod;
    }
}
var obj=new FullTimeEmployee(1,"alina","MGR",25000);
obj.printDetails();