
import { GoogleGenAI } from "@google/genai";
import { BOT_NAME } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getBotResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are the AI personality for "${BOT_NAME}", a Discord bot. 
        You are helpful, modern, slightly witty, and music-obsessed. 
        You use Discord emojis like :musical_note:, :sparkles:, and :headphones: in your speech. 
        Your main features include high-quality free music playback, server games, and AI-powered chat.
        Encourage the user to add you to their server using the invite link.
        Keep responses concise (under 150 words).`,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My circuits got a bit tangled. Can you try asking me that again? :tools:";
  }
};
