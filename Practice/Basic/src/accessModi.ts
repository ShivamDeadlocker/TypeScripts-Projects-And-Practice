class BankAccount {
    public owner: string;       // accessible everywhere (default)
    private balance: number;    // only accessible inside this class
    protected id: string;       // accessible in this class + subclasses

    constructor(owner: string, balance: number) {
        this.owner = owner;
        this.balance = balance;
        this.id = "ACC001";
    }

    // Method to access private field
    getBalance(): number {
        return this.balance;
    }
}

let acc = new BankAccount("John", 5000);
console.log(acc.owner);       // ✅ works
console.log(acc.getBalance()); // ✅ works
//console.log(acc.balance);     // ❌ ERROR — private