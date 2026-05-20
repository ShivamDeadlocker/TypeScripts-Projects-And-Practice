function Max(number1, number2) {
    if (number1 > number2) {
        console.log("Number 1 is greater");
    }
    else if (number1 == number2) {
        console.log("both are equal");
    }
    else {
        console.log("Number2 is greater");
    }
}
Max(10, 20);
function Print(num1) {
    switch (num1) {
        case 1:
            console.log("one");
            break;
        case 2:
            console.log("Two");
            break;
        case 3:
            console.log("Three");
            break;
        case 4:
            console.log("FOUR");
            break;
        case 5:
            console.log("Five");
            break;
        case 6:
            console.log("Six");
            break;
        case 7:
            console.log("Seven");
            break;
        case 8:
            console.log("Eight");
            break;
        case 9:
            console.log("Nine");
            break;
        default: console.log("This is not single digit number");
    }
}
Print(2);
