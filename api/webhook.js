export default function handler(req, res) {
  const VERIFY_TOKEN = "123"; // keep this simple

  try {
    const url = new URL(req.url, "https://dummy.com");

    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    // 🔐 META VERIFICATION
    if (req.method === "GET") {
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        return res.status(200).send(challenge);
      } else {
        return res.status(403).send("Forbidden");
      }
    }

    // 📩 EVENT RECEIVED
    if (req.method === "POST") {
      console.log("Webhook event received:", req.body);
      return res.status(200).send("EVENT_RECEIVED");
    }

    return res.status(405).send("Method Not Allowed");

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Server Error");
  }
}