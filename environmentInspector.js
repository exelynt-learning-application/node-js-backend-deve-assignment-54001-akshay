const process = require("process");

console.log("=================================");
console.log("       ENVIRONMENT INSPECTOR");
console.log("=================================");

console.log("\nProcess Information");
console.log("----------------------------");

console.log("Process ID (PID):", process.pid);
console.log("Node.js Version:", process.version);
console.log("Platform:", process.platform);
console.log("Architecture:", process.arch);
console.log("Current Working Directory:", process.cwd());
console.log("Process Uptime:", process.uptime().toFixed(2), "seconds");

console.log("\nCommand-Line Arguments");
console.log("----------------------------");

const argumentsList = process.argv.slice(2);

if (argumentsList.length === 0) {
    console.log("No command-line arguments provided.");
} else {
    argumentsList.forEach((argument, index) => {
        console.log(`Argument ${index + 1}: ${argument}`);
    });
}

console.log("\nEnvironment Information");
console.log("----------------------------");

console.log("Operating System:", process.env.OS || process.platform);
console.log("Home Directory:", process.env.HOME || process.env.USERPROFILE);

console.log("\n=================================");
console.log("Environment inspection completed.");
console.log("=================================");
