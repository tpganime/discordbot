
import { GoogleGenAI } from "@google/genai";
import { BOT_NAME } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getBotResponse = async (userMessage: string) => {
  try {
    const isCommand = userMessage.startsWith('/');
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are the simulated AI personality for "${BOT_NAME}", acting inside a Discord UI mockup.
        The user is interacting with you via Discord commands or general chat.
        
        If the user uses a command (starts with /):
        - /play [song]: Act as if you've started playing the song. Mention the high-fidelity audio quality.
        - /skip: Confirm the skip.
        - /stop: Confirm stopping and leaving the voice channel.
        - /queue: Show a mock queue of 2-3 popular songs.
        - /help: List your main features (Music, Games, AI).
        
        Style your responses as a Discord bot. Use markdown like **bold**, *italics*, and > quotes.
        Use emojis: :musical_note:, :notes:, :white_check_mark:, :cd:.
        Always be professional yet friendly. If it's not a command, just chat music and encourage them to add you to their real server.
        Keep responses concise (under 100 words).`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "**:warning: Error:** My connection to the Discord gateway timed out. Please try again! :tools:";
  }
};
