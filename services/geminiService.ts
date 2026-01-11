import { GoogleGenAI } from "@google/genai";
import { BOT_NAME } from "../constants";

export const getBotResponse = async (userMessage: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "**:warning: System Offline:** API Configuration missing. Please check credentials.";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Lightning fast 2.0/3.0 generation
      contents: userMessage,
      config: {
        systemInstruction: `You are the high-performance AI core for "${BOT_NAME}". 
        Be extremely efficient and professional. You handle music, moderation, and roles with zero latency.
        
        Simulation Protocol:
        - Identify as: TPG CORE V5
        - Commands: /tpg play, /tpg mod, /tpg roles, /tpg help
        
        Tone:
        - Cybernetic, efficient, helpful.
        - Use code blocks for technical status.
        - Emojis: ⚡, 💠, 🔊.
        - RESPONSE LIMIT: 40 WORDS MAX.`,
        temperature: 0.5, // Lower temperature for faster/more deterministic responses
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for maximum speed
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "**:warning: Packet Loss:** Re-calibrating session. Use \`/tpg help\` to reset. :tools:";
  }
};