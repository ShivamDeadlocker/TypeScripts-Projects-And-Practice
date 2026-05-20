// Interface — defines a contract (like C# interfaces)
interface IFlyable {
    maxSpeed: number;
    fly(speed: number): void;
}

interface ISwimmable {
    swim(): void;
}

// A class can implement MULTIPLE interfaces
class Duck implements IFlyable, ISwimmable {
    maxSpeed: number = 80;

    fly(speed: number): void {
        console.log(`Duck flying at ${speed} km/h`);
    }

    swim(): void {
        console.log("Duck swimming!");
    }
}

let duck = new Duck();
duck.fly(50);  // Duck flying at 50 km/h
duck.swim();   // Duck swimming!