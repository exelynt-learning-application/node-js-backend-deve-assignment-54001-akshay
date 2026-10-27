const http = require("http");

const PORT = 3000;

// Sample user data
const users = [
    {
        id: 1,
        name: "Akshay",
        email: "akshay@example.com"
    },
    {
        id: 2,
        name: "Rahul",
        email: "rahul@example.com"
    },
    {
        id: 3,
        name: "Priya",
        email: "priya@example.com"
    }
];

// Sample product data
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000
    },
    {
        id: 2,
        name: "Mobile Phone",
        price: 25000
    },
    {
        id: 3,
        name: "Headphones",
        price: 2000
    }
];

// Function to send JSON response
function sendJsonResponse(res, statusCode, data) {
    res.writeHead(statusCode, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data));
}

// Create HTTP server
const server = http.createServer((req, res) => {

    // GET /api/users
    if (req.method === "GET" && req.url === "/api/users") {
        sendJsonResponse(res, 200, {
            success: true,
            data: users
        });
    }

    // GET /api/products
    else if (req.method === "GET" && req.url === "/api/products") {
        sendJsonResponse(res, 200, {
            success: true,
            data: products
        });
    }

    // API home
    else if (req.method === "GET" && req.url === "/") {
        sendJsonResponse(res, 200, {
            success: true,
            message: "Welcome to the JSON API",
            endpoints: [
                "/api/users",
                "/api/products"
            ]
        });
    }

    // Handle invalid routes
    else {
        sendJsonResponse(res, 404, {
            success: false,
            message: "API endpoint not found"
        });
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`JSON API server running at http://localhost:${PORT}`);
});
