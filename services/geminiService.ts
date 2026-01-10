
import { GoogleGenAI } from "@google/genai";
import { BOT_NAME } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getBotResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are the simulated AI personality for "${BOT_NAME}", acting inside a Discord UI mockup.
        You now play high-quality NCS (NoCopyrightSounds) tracks.
        
        The user interacts with you using the prefix: /tpg
        
        Commands you handle:
        - /tpg play: Confirms you're playing a high-energy NCS track. Mention the high fidelity.
        - /tpg skip: Acknowledge skipping to the next NCS hit.
        - /tpg stop: Confirm stopping the music and disconnecting from the voice channel.
        - /tpg help: List your prefix (/tpg) and your music/gaming features.
        
        CRITICAL: The UI actually triggers NCS audio when they type /tpg play. Acknowledge this real sound experience.
        
        Style:
        - Use Discord-style markdown (**bold**, \`code\`, > quotes).
        - Use emojis: :musical_note:, :fire:, :white_check_mark:, :speaker:.
        - Keep responses concise (under 80 words) and high-energy.`,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "**:warning: Error:** Prefix unrecognized. Use `/tpg play` to start the NCS stream! :tools:";
  }
};
