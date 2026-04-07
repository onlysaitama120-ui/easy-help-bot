export default function handler(req, res) {
  const VERIFY_TOKEN = "123";

  const url = new URL(req.url, "https://dummy.com");

  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  // 👇 DEBUG LOGS (IMPORTANT)
  console.log("MODE:", mode);
  console.log("TOKEN RECEIVED:", token);
  console.log("EXPECTED TOKEN:", VERIFY_TOKEN);

  if (req.method === "GET") {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ VERIFIED SUCCESS");
      return res.status(200).send(challenge);
    } else {
      console.log("❌ TOKEN MISMATCH");
      return res.status(403).send("Forbidden");
    }
  }

  if (req.method === "POST") {
    console.log("Webhook event:", req.body);
    return res.status(200).send("EVENT_RECEIVED");
  }

  return res.status(405).send("Method Not Allowed");
}