"use strict";
//Array 
let fruits = ["apple", "banana", "mango"];
let scores = [90, 85, 92];
console.log(fruits[0]); // "apple"
//Tuple
let person = ["John", 30];
// person[0] must be string, person[1] must be 
console.log(person);
//Enum
var Direction;
(function (Direction) {
    Direction[Direction["North"] = 0] = "North";
    Direction[Direction["South"] = 1] = "South";
    Direction[Direction["East"] = 2] = "East";
    Direction[Direction["West"] = 3] = "West";
})(Direction || (Direction = {}));
let move = Direction.North;
console.log(move); // 0 (default numeric values)
//# sourceMappingURL=userDefindDT.js.map