"use strict";
class ValidationError {
    constructor(message) {
        this.name = "ValidationError";
        this.message = message;
    }
    toString() {
        return `${this.name}: ${this.message}`;
    }
}
throw new ValidationError("Email is required");
//# sourceMappingURL=customException.js.map