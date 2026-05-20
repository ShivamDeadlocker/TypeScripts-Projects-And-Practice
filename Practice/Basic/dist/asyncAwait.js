"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// async function always returns a Promise
function fetchUserData(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // await pauses HERE until the promise resolves
        // (other code outside this function keeps running)
        try {
            // Simulate an API call
            let response = yield fetch(`https://api.example.com/users/${userId}`);
            let data = yield response.json();
            return data.name;
        }
        catch (error) {
            throw new Error("Failed to fetch user");
        }
    });
}
// Calling the async function
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = yield fetchUserData(1);
        console.log("User:", name);
    });
}
main();
//# sourceMappingURL=asyncAwait.js.map