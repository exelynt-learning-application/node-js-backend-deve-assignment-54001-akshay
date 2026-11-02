Node.js Project Configuration Assessment
Detailed solution, setup instructions, package management, environment variables, npm scripts, and GitHub
submission guide.
1. Assessment objective
Build a small Node.js project that demonstrates five grading areas: project configuration (30%), package
management (25%), environment variables (20%), npm scripts (15%), and documentation (10%). The included
starter project addresses each area.
2. Project structure
nodejs-project-assessment/
nnn src/
n nnn index.js
nnn .env.example
nnn .gitignore
nnn package.json
nnn README.md
3. Initialize the project
Install Node.js LTS from the official Node.js website if it is not already installed. Open a terminal and run:
node --version
npm --version
mkdir nodejs-project-assessment
cd nodejs-project-assessment
npm init -y
The `npm init -y` command creates a default package.json. In this solution, use the provided package.json, which
defines project metadata, dependencies, and custom scripts.
4. Package management
The project uses dotenv as a runtime dependency and nodemon as a development dependency. A runtime
dependency is required by the application; a development dependency supports development tasks. Install
packages with:
npm install dotenv
npm install --save-dev nodemon
The package.json and package-lock.json record dependency information. Commit package-lock.json to Git so other
developers can install consistent dependency versions. Do not commit the node_modules folder.
5. Environment variables with .env
Environment variables keep configuration separate from application code. The app reads APP_NAME, PORT, and
NODE_ENV through process.env. dotenv loads values from a local .env file.
APP_NAME=Node.js Assessment App
PORT=3000
NODE_ENV=development
Copy .env.example to .env before running the app. The .env file is listed in .gitignore because local configuration
may contain private credentials. Never commit passwords, API keys, or other secrets.
6. Application entry point
require("dotenv").config();
const appName = process.env.APP_NAME || "Node.js Assessment App";
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || "development";
console.log("=================================");
console.log(`${appName} is running`);
console.log(`Environment: ${environment}`);
console.log(`Configured port: ${port}`);
console.log("=================================");
if (environment === "development") {
console.log("Tip: use `npm run dev` while developing.");
}
The first line loads dotenv. The remaining code reads values from process.env, applies safe defaults if values are
missing, and prints the application configuration. This is intentionally a small console app so the assessment stays
focused on project setup.
7. Custom npm scripts
Command Purpose
npm start Runs src/index.js
npm run dev Runs the app with Node.js watch mode
npm test Runs the built-in Node test runner
npm run check Checks JavaScript syntax without running the app
Scripts are shortcuts stored in package.json. They make common commands consistent and easier to remember.
8. Run and verify
npm install
# Create .env from .env.example
npm start
npm run check
npm test
The start command should print the application name, environment, and configured port. `npm run check` should
finish without syntax errors. `npm test` may report zero tests until you add test files; this is acceptable for this
configuration-focused starter, but adding tests is a useful improvement.
9. Git and GitHub submission
Suggested repository name: nodejs-project-configuration-assessment. Create an empty repository on GitHub, then
run the following commands from the project folder. Replace the example URL with your own repository URL.
git init
git add .
git commit -m "Initialise Node.js assessment project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nodejs-project-configuration-assessment.git
git push -u origin main
Make sure package-lock.json is committed after running npm install. Do not upload node_modules or .env. Include
the README so the evaluator can understand how to install and run the project.
10. Grading checklist
Grading area Weight Evidence in project
Project Configuration 30% Clear folder structure, package.json, application entry point
Package Management 25% dotenv dependency, nodemon dev dependency, lockfile after install
Environment Variables 20% .env.example, dotenv setup, .env ignored by Git
npm Scripts 15% start, dev, test, and check scripts
Documentation 10% README setup steps, commands, package explanations, expected output
Before submission, run the app locally, verify the README instructions, push the source files to GitHub, and confirm
the repository does not contain .env or node_modules
