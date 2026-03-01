
import { GoogleGenAI, Type } from "@google/genai";
import { GroundwaterData, PredictionResult, StressLevel } from "../types";

export const getAIAnalysis = async (data: GroundwaterData): Promise<PredictionResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Analyze the groundwater status for the following agricultural data in Tamil Nadu:
    District: ${data.district}
    Annual Rainfall: ${data.rainfall}mm
    Soil Type: ${data.soilType}
    Crop Type: ${data.cropType}
    Borewell Depth: ${data.borewellDepth}m
    Recent Trend: ${data.groundwaterTrend.join(', ')} (annual measurements in meters below ground level)

    Classify the groundwater stress into one of these categories: SAFE, AVERAGE, or DANGER.
    Provide a concise explanation (1-2 lines) of why this status was chosen.
    
    Return the response in JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ['SAFE', 'AVERAGE', 'DANGER'] },
            explanation: { type: Type.STRING }
          },
          required: ["status", "explanation"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return {
      status: result.status as StressLevel,
      explanation: result.explanation,
      district: data.district,
      cropType: data.cropType,
      confidence: 0.92,
      recommendation: "Maintain sustainable practices and monitor water levels."
    };
  } catch (error) {
    console.error("AI Analysis failed:", error);
    // Fallback logic
    let status = StressLevel.SAFE;
    if (data.borewellDepth > 100 || data.rainfall < 800) status = StressLevel.DANGER;
    else if (data.borewellDepth > 60 || data.rainfall < 1000) status = StressLevel.AVERAGE;

    return {
      status,
      explanation: "Analysis performed using heuristic model due to connectivity issues. Higher borewell depth and lower rainfall indicate elevated stress levels.",
      district: data.district,
      cropType: data.cropType,
      confidence: 0.75,
      recommendation: "Adopt water-saving technologies and drought-resistant crops."
    };
  }
};
