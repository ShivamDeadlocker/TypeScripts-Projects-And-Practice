class StudentData
{
    StudentID;
    StudentName;
    Age;
    constructor(sid:number,sname:string)
    {
        this.StudentID=sid;
        this.StudentName=sname;
        
    }
    get GetData(){
        return this.StudentID+","+this.StudentName+","+this.Age;
    }
    set PutData(value)
    {
        if(value<=0)
        {
            throw new Error("Not valid Age");
            
        }
        this.Age=value;
    }


}

var objS=new StudentData(1,"Alina");

objS.PutData=22;

let StudentInfo=objS.GetData;
console.log(StudentInfo);


