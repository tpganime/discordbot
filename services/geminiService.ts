import { GoogleGenAI } from "@google/genai";
import { BOT_NAME } from "../constants";

export const getBotResponse = async (userMessage: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "**:warning: System Offline:** API Configuration missing. Check environment.";
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", // Fastest model available
      contents: userMessage,
      config: {
        systemInstruction: `You are the core AI for "${BOT_NAME}". 
        Stay in character as an efficient, ultra-fast music bot engine.
        
        Protocol:
        - Version: 5.2.0-STABLE
        - Behavior: Technical, cybernetic, helpful.
        - Commands: /tpg play, /tpg stop, /tpg queue.
        
        Output:
        - Be brief (max 30 words).
        - Use code blocks for logs.
        - Focus on SPEED.`,
        temperature: 0.3,
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for instant response
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "**:warning: Packet Loss:** Session interrupted. :tools:";
  }
};