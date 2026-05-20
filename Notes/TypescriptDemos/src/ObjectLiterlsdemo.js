var Person = {
    ID: 1,
    Name: "John"
};
console.log(Person.ID + " , " + Person.Name);
function Student_constructor1(pid, panme) {
    this.StudentID = pid;
    this.StudentName = panme;
    this.CalculateMarks = CalculateMarks;
    function CalculateMarks() {
        console.log("InSide Calculate Marks Function");
    }
}
var pp1 = new Student_constructor1(1, "Alina");
console.log(pp1.StudentID + "," + pp1.StudentName);
pp1.CalculateMarks();
//pass object to a function parameter
function PersonData(p) {
    console.log("Person ID=" + p.ID);
    console.log("Person Name=" + p.Name);
}
PersonData(Person);
