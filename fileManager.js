const fs = require("fs");
const path = require("path");
const readline = require("readline");

const FILES_DIR = path.join(__dirname, "files");

// Create files directory if it does not exist
if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}

// CREATE
function createFile(fileName, content) {
    const filePath = path.join(FILES_DIR, fileName);

    if (fs.existsSync(filePath)) {
        console.log("Error: File already exists.");
        return;
    }

    try {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`File "${fileName}" created successfully.`);
    } catch (error) {
        console.log("Error creating file:", error.message);
    }
}

// READ
function readFile(fileName) {
    const filePath = path.join(FILES_DIR, fileName);

    if (!fs.existsSync(filePath)) {
        console.log("Error: File does not exist.");
        return;
    }

    try {
        const content = fs.readFileSync(filePath, "utf8");

        console.log("\n----- File Content -----");
        console.log(content);
        console.log("------------------------");
    } catch (error) {
        console.log("Error reading file:", error.message);
    }
}

// UPDATE
function updateFile(fileName, content) {
    const filePath = path.join(FILES_DIR, fileName);

    if (!fs.existsSync(filePath)) {
        console.log("Error: File does not exist.");
        return;
    }

    try {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`File "${fileName}" updated successfully.`);
    } catch (error) {
        console.log("Error updating file:", error.message);
    }
}

// DELETE
function deleteFile(fileName) {
    const filePath = path.join(FILES_DIR, fileName);

    if (!fs.existsSync(filePath)) {
        console.log("Error: File does not exist.");
        return;
    }

    try {
        fs.unlinkSync(filePath);
        console.log(`File "${fileName}" deleted successfully.`);
    } catch (error) {
        console.log("Error deleting file:", error.message);
    }
}

// LIST FILES
function listFiles() {
    try {
        const files = fs.readdirSync(FILES_DIR);

        if (files.length === 0) {
            console.log("No files found.");
            return;
        }

        console.log("\nFiles:");
        files.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });
    } catch (error) {
        console.log("Error listing files:", error.message);
    }
}

// MENU
async function showMenu() {
    while (true) {
        console.log("\n==============================");
        console.log("       FILE MANAGER CLI");
        console.log("==============================");
        console.log("1. Create File");
        console.log("2. Read File");
        console.log("3. Update File");
        console.log("4. Delete File");
        console.log("5. List Files");
        console.log("6. Exit");
        console.log("==============================");

        const choice = await ask("Enter your choice: ");

        switch (choice.trim()) {
            case "1": {
                const fileName = await ask("Enter file name: ");
                const content = await ask("Enter file content: ");

                if (!fileName.trim()) {
                    console.log("Error: File name cannot be empty.");
                    break;
                }

                createFile(fileName.trim(), content);
                break;
            }

            case "2": {
                const fileName = await ask("Enter file name: ");

                if (!fileName.trim()) {
                    console.log("Error: File name cannot be empty.");
                    break;
                }

                readFile(fileName.trim());
                break;
            }

            case "3": {
                const fileName = await ask("Enter file name: ");
                const content = await ask("Enter new file content: ");

                if (!fileName.trim()) {
                    console.log("Error: File name cannot be empty.");
                    break;
                }

                updateFile(fileName.trim(), content);
                break;
            }

            case "4": {
                const fileName = await ask("Enter file name: ");

                if (!fileName.trim()) {
                    console.log("Error: File name cannot be empty.");
                    break;
                }

                deleteFile(fileName.trim());
                break;
            }

            case "5":
                listFiles();
                break;

            case "6":
                console.log("Exiting File Manager. Goodbye!");
                rl.close();
                return;

            default:
                console.log("Invalid choice. Please select 1 to 6.");
        }
    }
}

showMenu();
