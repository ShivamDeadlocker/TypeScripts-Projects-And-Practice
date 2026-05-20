//Array 

let fruits: string[] = ["apple", "banana", "mango"];
let scores: number[] = [90, 85, 92];

console.log(fruits[0]); // "apple"

//Tuple

let person: [string, number] = ["John", 30];
// person[0] must be string, person[1] must be 

console.log(person)

//Enum

enum Direction {
    North,
    South,
    East,
    West
}

let move: Direction = Direction.North;
console.log(move); // 0 (default numeric values)