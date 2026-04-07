export default function handler(req, res) {
  const VERIFY_TOKEN = "easyhelp123";

  const url = new URL(req.url, "https://dummy.com");

  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  // ✅ Meta verification
  if (req.method === "GET") {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send("Forbidden");
    }
  }

  // ✅ Event handling
  if (req.method === "POST") {
    console.log("Webhook event received");
    return res.status(200).send("EVENT_RECEIVED");
  }

  return res.status(405).send("Method Not Allowed");
}