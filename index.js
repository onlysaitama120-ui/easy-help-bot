// Load Express
const express = require("express");
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Middleware (for JSON handling)
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
  res.send("Easy-helpBot is running!");
});

// Example API route
app.get("/help", (req, res) => {
  res.json({ message: "This is your Easy-helpBot API endpoint." });
});

// Webhook verification
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "easyhelp123";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Webhook event handler
app.post("/webhook", (req, res) => {
  console.log("Webhook event:", req.body);
  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

