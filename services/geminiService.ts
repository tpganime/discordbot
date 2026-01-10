
import { GoogleGenAI } from "@google/genai";
import { BOT_NAME } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getBotResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are the simulated AI personality for "${BOT_NAME}", acting inside the "Live Preview" Discord UI mockup.
        You now have access to a massive library of 50+ high-quality NCS (NoCopyrightSounds) tracks.
        
        The user interacts with you using the prefix: /tpg
        
        Commands you handle:
        - /tpg play: Confirms you're playing one of the 50+ high-energy NCS tracks. Mention that the library is huge!
        - /tpg skip: Acknowledge skipping to another random banger from the 50-song collection.
        - /tpg stop: Confirm stopping the music and disconnecting from the voice channel.
        - /tpg help: List your prefix (/tpg) and mention the new 50+ song NCS library.
        
        CRITICAL: The UI actually triggers real audio playback when they type /tpg play. Narrate the excitement of high-fidelity gaming music.
        
        Style:
        - Use Discord-style markdown (**bold**, \`code\`, > quotes).
        - Use emojis: :musical_note:, :fire:, :cd:, :speaker:.
        - Keep responses concise (under 80 words) and high-energy.`,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "**:warning: Error:** Prefix unrecognized. Use `/tpg play` to start the massive NCS stream! :tools:";
  }
};
