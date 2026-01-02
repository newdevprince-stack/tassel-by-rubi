
import { GoogleGenAI } from "@google/genai";
import { SearchResult } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Vite uses import.meta.env for environment variables
    const apiKey = (import.meta as any).env?.VITE_API_KEY || process.env.API_KEY || '';
    this.ai = new GoogleGenAI({ apiKey });
  }

  async getStylingAdvice(query: string): Promise<SearchResult> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are the expert digital stylist for 'Tassel Design by Rubi'. Your tone is elegant, helpful, and knowledgeable about high-end fashion, luxury clothing, and artisan tassels. 
        Research current trends, fabric quality, and styling tips for the following request. 
        Format your response as a "Boutique Style Guide" with sections for Trend Overview, Recommended Looks, and Styling Advice.
        Request: ${query}`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const answer = response.text || "Our stylist is currently unavailable. Please try again shortly.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      return {
        answer,
        sources,
      };
    } catch (error) {
      console.error("Gemini Stylist Error:", error);
      throw new Error("We encountered a connectivity issue in our boutique. Please refresh.");
    }
  }
}

export const geminiService = new GeminiService();
