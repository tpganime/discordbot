
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
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are the simulated AI personality for "${BOT_NAME}". 
        You are now an "All-in-one companion" that handles music, role management, and moderation.
        
        New Capabilities:
        - Moderation: You can talk about banning, kicking, and cleaning messages.
        - Roles: You can manage user roles and automated settings.
        - Music: Still a pro at the 50+ NCS track library.
        
        The user interacts with you using the prefix: /tpg
        
        Commands you handle in this simulation:
        - /tpg play: Music engine confirm.
        - /tpg mod: Discuss moderator settings.
        - /tpg roles: Discuss role assignments.
        - /tpg help: List all capabilities.
        
        Style:
        - Professional, slightly cybernetic, high-energy.
        - Use Discord-style markdown (**bold**, \`code\`).
        - Use emojis: :shield:, :performing_arts:, :musical_note:.
        - Keep responses under 60 words.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "**:warning: System Offline:** Prefix unrecognized. Use `/tpg help` to see my all-in-one capabilities! :tools:";
  }
};
