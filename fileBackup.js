const fs = require("fs");
const path = require("path");
const readline = require("readline");

const BACKUP_FOLDER = path.join(__dirname, "backup");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

// Create backup folder if it does not exist
function createBackupFolder() {
    try {
        if (!fs.existsSync(BACKUP_FOLDER)) {
            fs.mkdirSync(BACKUP_FOLDER);
            console.log("Backup folder created successfully.");
        }
    } catch (error) {
        console.log("Error creating backup folder:", error.message);
    }
}

// Backup a single file
function backupFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log(`Error: File "${filePath}" does not exist.`);
            return;
        }

        const fileName = path.basename(filePath);
        const destination = path.join(BACKUP_FOLDER, fileName);

        fs.copyFileSync(filePath, destination);

        console.log(`Backup successful: ${fileName}`);
    } catch (error) {
        console.log(`Error backing up "${filePath}":`, error.message);
    }
}

// Backup multiple files
async function startBackup() {
    console.log("\n===== File Backup Utility =====");

    createBackupFolder();

    const input = await ask(
        "Enter file paths separated by commas: "
    );

    if (!input.trim()) {
        console.log("Error: Please enter at least one file path.");
        rl.close();
        return;
    }

    const files = input
        .split(",")
        .map((file) => file.trim())
        .filter((file) => file.length > 0);

    if (files.length === 0) {
        console.log("Error: No valid files entered.");
        rl.close();
        return;
    }

    console.log("\nStarting backup...\n");

    files.forEach((file) => {
        backupFile(file);
    });

    console.log("\nBackup process completed.");
    console.log(`Backup location: ${BACKUP_FOLDER}`);

    rl.close();
}

startBackup();
