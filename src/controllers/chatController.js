import { askAI } from "../services/geminiService.js";

export const chatHandler = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ message: "Message is required" });
    }

    const today = new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const talking=[
        "hello",
        "hi",
        "how are you",
        "kaise ho",
        "kya haal hai",
        "kya chal raha hai",
        "what's up",
        "sup",
        "how's it going",
    ]

    const projectKeywords = [
      "complaint",
      "application",
      "authority",
      "dashboard",
      "admin",
      "schema",
      "jwt",
      "awaz-e-janata",
      "mongoose",
      "backend",
    ];

    const isDateQuery =
      message.toLowerCase().includes("date") ||
      message.toLowerCase().includes("aaj");

    const isProjectQuery = projectKeywords.some((kw) =>
      message.toLowerCase().includes(kw)
    );
    const isTalking = talking.some((greet) =>
      message.toLowerCase().includes(greet)
    );

    let finalPrompt;

    // ✅ 1. Date questions → direct factual answer
    if (isDateQuery) {
      return res.json({
        reply: `Hello, Aaj ki date ${today} hai.`,
      });
    }
        // ✅ 2. Talking greetings → direct friendly response
    else if(isTalking){
        return res.json({
            reply:"Hello! Kaise ho? Main aapki madad ke liye yahan hoon. 😊"
        })
    }

    // ✅ 2. Project-related queries (NO date in visible output)
    if (isProjectQuery) {
      finalPrompt = `
You are an AI assistant helping with a software project.

Explain the following topic in HINGLISH.
IMPORTANT FORMAT RULES:
- Write the answer ONLY in numbered points (1, 2, 3...).
- EACH numbered point must be on a NEW LINE.
- Leave ONE BLANK LINE after every point.
- Do NOT write multiple points in one line.
- Do NOT use bullet points or paragraphs.
- Output must look like exam / notes format.

Topic:
${message}
`;
    }
    // ✅ 3. Non-project → Hindi motivational shayari
    else {
      finalPrompt = `
User message:
${message}

Reply with a short motivational shayari in Hindi only with some emoji and love sign.
No explanations.
`;
    }

    const reply = await askAI(finalPrompt);
    return res.status(200).json({ reply });

  } catch (err) {
    console.error("❌ Backend Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
