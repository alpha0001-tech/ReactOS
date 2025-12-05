import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini Client
// We use the 2.5 flash model as requested for general text tasks if no model is specified by user, 
// but here we hardcode 2.5 flash for efficiency in this assistant.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (
  prompt: string, 
  history: { role: 'user' | 'model'; text: string }[] = []
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are a helpful AI assistant integrated into a web-based macOS simulation. Keep responses concise and formatted nicely using Markdown.",
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the AI service. Please check your API key or internet connection.";
  }
};