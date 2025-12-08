import { GoogleGenAI } from "@google/genai";
import { Batch } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const analyzeBatchHealth = async (batch: Batch): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "API Key is missing. Please provide a valid Gemini API Key to receive AI insights.";
  }

  const prompt = `
    You are an expert mycologist and mushroom cultivation consultant.
    Analyze the following batch of mushrooms and provide concise, actionable advice (max 3 sentences).
    
    Species: ${batch.speciesName} (${batch.strain})
    Growth Stage: ${batch.growthStage}
    Current Environment:
    - Temperature: ${batch.currentReading.temperature}°C
    - Humidity: ${batch.currentReading.humidity}%
    - CO2: ${batch.currentReading.co2} PPM
    
    Is this environment optimal? If not, what should be adjusted?
  `;

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to analyze batch health at this time.";
  }
};

export const getMarketplaceTrends = async (products: any[]): Promise<string> => {
  const client = getClient();
  if (!client) return "API Key missing.";

  const prompt = `
    You are a market analyst for agricultural commodities.
    Given this list of mushroom products: ${products.map(p => p.name).join(', ')}.
    Suggest 3 trending exotic mushroom products that are missing from this list that would likely sell well in a gourmet market.
  `;

   try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "No insights available.";
  } catch (error) {
    return "Unable to fetch trends.";
  }
}