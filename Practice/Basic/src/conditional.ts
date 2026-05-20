let scoreNew = 75;

if (scoreNew >= 90) {
    console.log("A Grade");
} else if (scoreNew >= 75) {
    console.log("B Grade");
} else if (scoreNew >= 60) {
    console.log("C Grade");
} else {
    console.log("Fail");
}

// Switch — same as C#
let day = 3;
switch (day) {
    case 1: console.log("Monday"); break;
    case 2: console.log("Tuesday"); break;
    case 3: console.log("Wednesday"); break;
    default: console.log("Other day");
}