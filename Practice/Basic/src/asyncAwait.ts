// async function always returns a Promise
async function fetchUserData(userId: number): Promise<string> {
    // await pauses HERE until the promise resolves
    // (other code outside this function keeps running)
    
    try {
        // Simulate an API call
        let response = await fetch(`https://api.example.com/users/${userId}`);
        let data = await response.json();
        return data.name;
    } catch (error) {
        throw new Error("Failed to fetch user");
    }
}

// Calling the async function
async function main() {
    let name = await fetchUserData(1);
    console.log("User:", name);
}

main();