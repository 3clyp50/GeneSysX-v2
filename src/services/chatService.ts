import { GoogleGenerativeAI } from "@google/generative-ai";

// Use Vite's import.meta.env instead of process.env
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

class ChatService {
  private model = genAI.getGenerativeModel({ model: "gemini-pro" });
  private chat = this.model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    },
  });

  async sendMessage(message: string): Promise<string> {
    try {
      if (!GEMINI_API_KEY) {
        throw new Error("Gemini API key is not configured");
      }

      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error in chat service:', error);
      throw new Error('Failed to get response from AI service');
    }
  }

  async resetChat() {
    this.chat = this.model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });
  }
}

export const chatService = new ChatService();