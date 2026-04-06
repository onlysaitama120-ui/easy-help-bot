// Load Express
const express = require("express");
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Middleware (optional, for JSON handling)
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
  res.send("Easy-helpBot is running!");
});

// Example API route
app.get("/help", (req, res) => {
  res.json({ message: "This is your Easy-helpBot API endpoint." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
