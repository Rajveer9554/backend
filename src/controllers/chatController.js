// chatHandler

import {askAI} from "../services/geminiService.js"
import { detectGreeting, detectDateQuery,detectLanguage, detectApplicationRequest,detectDepartment } from "../utils/aichatdetector.js"

export default async function chatHandler(req, resp) {

  try{
    // message checking 
    const {message}=req.body;
    if(!message || typeof message !== "string"){
      return resp.status(400).json({reply: "Message is required "})
    }

    // greeting message✅

    if(detectGreeting(message)){
      return resp.json({
        reply: "Hello 🙋‍♂️ I am Awaze-E-Janata AI assistant. How may I help you, regarding complaints"
      })
    }
    // Data query ✅
    if(detectDateQuery(message)){
      const today = new Date().toLocaleDateString("en-IN", {
        weekday:"long",
        day:"numeric",
        months:"long",
        year:"numeric"

      });
      const lang= detectLanguage(message);
      if(lang=="English"){
        return resp.json({reply:`Today's date is ${today}.` });

      } else{
        return resp.json({reply:`Aaj ki date: ${today}`});
      }
    }

    // Application wrritiung
    // ✅ Application Writing
    if (detectApplicationRequest(message)) {
      const department = detectDepartment(message) || "Concerned Authority";
const lang = detectLanguage(message);

const prompt = `
You are an AI assistant for a public complaint platform called "Awaze-e-Janata".

Write a FORMAL complaint application in ${lang}.

VERY IMPORTANT FORMATTING RULES:
- Each section must be on a NEW LINE.
- Leave ONE BLANK LINE between each section.
- Do NOT merge everything in one paragraph.
- Follow the exact format strictly.

FORMAT:

To,
The Officer
${department}

Subject: [Short complaint subject]

Respected Sir/Madam,

[Write the complaint in 2 short paragraphs based on the user's problem.]

Therefore, I kindly request you to take necessary action as soon as possible.

Thank you.

Yours sincerely,
[Applicant Name]
[Address]
[Contact Number]
[Date]

User problem:
${message}
`;


      const reply = await askAI(prompt);
      return resp.json({ reply });
    }

    // ✅ Department Query (without application request)
    const department = detectDepartment(message);
    if (department) {
      const prompt = `
User problem: ${message}

Explain in Hinglish which department (${department}) is responsible.
Give answer in 3 short numbered points.
`;
      const reply = await askAI(prompt);
      return resp.json({ reply });
    }

    // ✅ General Question → AI Answer
    const prompt = `
You are Awaze-e-Janata AI assistant.
User asked: ${message}

Give a clear, short answer in Hinglish.
`;
    const reply = await askAI(prompt);
    return resp.json({ reply });

  } catch (err) {
    console.error("Backend Error:", err);
    return resp.status(500).json({ reply: "Internal Server error" });
  }
}