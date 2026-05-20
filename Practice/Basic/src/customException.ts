class ValidationError implements Error {
    name: string = "ValidationError";
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    toString(): string {
        return `${this.name}: ${this.message}`;
    }
}

throw new ValidationError("Email is required");