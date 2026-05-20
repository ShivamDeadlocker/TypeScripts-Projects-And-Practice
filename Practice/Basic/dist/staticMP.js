"use strict";
class MathHelper {
    static circleArea(radius) {
        return MathHelper.PI * radius * radius;
    }
}
MathHelper.PI = 3.14159;
// Call WITHOUT creating an object
console.log(MathHelper.PI); // 3.14159
console.log(MathHelper.circleArea(5)); // 78.53...
//# sourceMappingURL=staticMP.js.map