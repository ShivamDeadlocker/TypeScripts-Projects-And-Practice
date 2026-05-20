"use strict";
class BankAccount {
    constructor(owner, balance) {
        this.owner = owner;
        this.balance = balance;
        this.id = "ACC001";
    }
    // Method to access private field
    getBalance() {
        return this.balance;
    }
}
let acc = new BankAccount("John", 5000);
console.log(acc.owner); // ✅ works
console.log(acc.getBalance()); // ✅ works
//console.log(acc.balance);     // ❌ ERROR — private
//# sourceMappingURL=accessModi.js.map