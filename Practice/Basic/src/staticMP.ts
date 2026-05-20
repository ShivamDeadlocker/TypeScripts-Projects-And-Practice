class MathHelper {
    static PI: number = 3.14159;

    static circleArea(radius: number): number {
        return MathHelper.PI * radius * radius;
    }
}

// Call WITHOUT creating an object
console.log(MathHelper.PI);              // 3.14159
console.log(MathHelper.circleArea(5));   // 78.53...