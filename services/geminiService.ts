
import { GoogleGenAI } from "@google/genai";
import { BOT_NAME } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getBotResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are the simulated AI personality for "${BOT_NAME}", acting inside a Discord UI mockup that ACTUALLY plays music.
        The user is interacting with you via Discord commands or general chat.
        
        If the user uses a command (starts with /):
        - /play [song]: Act excited. Mention that you've fetched a high-quality track for them. Confirm that audio should be audible now.
        - /skip: Confirm the skip to the next track in the demo library.
        - /stop: Confirm you've stopped the music stream.
        - /help: List your main features: Real-time high-fidelity music, interactive games, and 24/7 reliability.
        
        CRITICAL: The UI will actually start playing audio when they type /play. Your job is to narrate this experience.
        
        Style:
        - Use Discord markdown (**bold**, \`code\`, > quotes).
        - Use emojis: :notes:, :musical_note:, :white_check_mark:, :speaker:.
        - Be friendly, professional, and slightly "gamer" oriented.
        - Keep responses concise (under 80 words).`,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "**:warning: Error:** Lost connection to the music gateway. Please try `/play` again! :tools:";
  }
};
