// /api/webhook.js

export default async function handler(req, res) {

  // ✅ VERIFY WEBHOOK (Meta setup)
  if (req.method === "GET") {
    const VERIFY_TOKEN = "myverifytoken";

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  // ✅ HANDLE INCOMING MESSAGES
  if (req.method === "POST") {
    const body = req.body;

    if (body.entry) {
      for (const entry of body.entry) {

        const messagingEvents = entry.messaging || [];

        for (const event of messagingEvents) {

          if (event.message && event.message.text) {
            const senderId = event.sender.id;
            const userMessage = event.message.text.toLowerCase();

            let reply = "I'm not sure how to respond 🤔";

            // 🔥 CUSTOM AUTO REPLIES

            if (userMessage.includes("hi") || userMessage.includes("hello")) {
              const replies = [
                "Yes mademoiselle 💅",
                "Hello there 😌",
                "Heyy 👀 what's up?"
              ];
              reply = replies[Math.floor(Math.random() * replies.length)];
            }

            else if (userMessage.includes("saad")) {
              reply = "Yes mademoiselle 💅";
            }

            else if (userMessage.includes("how are you")) {
              reply = "I'm cool 😎 What about you?";
            }

            else if (userMessage.includes("price")) {
              reply = "It's ₹499 💸";
            }

            else if (userMessage.includes("bye")) {
              reply = "Goodbye 👋 Come back soon!";
            }

            // 🚀 SEND REPLY BACK TO USER
            await fetch(
              `https://graph.facebook.com/v19.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  recipient: { id: senderId },
                  message: { text: reply },
                }),
              }
            );

          }
        }
      }
    }

    return res.status(200).send("EVENT_RECEIVED");
  }

  res.status(405).send("Method Not Allowed");
}