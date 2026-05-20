"use strict";
// A class can implement MULTIPLE interfaces
class Duck {
    constructor() {
        this.maxSpeed = 80;
    }
    fly(speed) {
        console.log(`Duck flying at ${speed} km/h`);
    }
    swim() {
        console.log("Duck swimming!");
    }
}
let duck = new Duck();
duck.fly(50); // Duck flying at 50 km/h
duck.swim(); // Duck swimming!
//# sourceMappingURL=interFace.js.map