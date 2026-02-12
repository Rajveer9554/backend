import axios from "axios";

export const askAI = async (message) => {
  const response = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent",
    {
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};
