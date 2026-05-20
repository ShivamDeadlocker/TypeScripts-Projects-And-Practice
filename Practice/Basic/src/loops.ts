// While loop
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// Do-While — always runs at least once
let j = 0;
do {
    console.log(j);
    j++;
} while (j < 5);

// For loop
for (let k = 0; k < 5; k++) {
    console.log(k);
}

// For...of — iterate over array values (modern, clean)
let fruitsNew = ["apple", "banana", "mango"];
for (let fruit of fruitsNew) {
    console.log(fruit);
}