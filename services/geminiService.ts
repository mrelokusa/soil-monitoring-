import { GoogleGenAI, Type } from "@google/genai";
import { SoilData, AIAnalysisResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getSoilAnalysis = async (data: SoilData): Promise<AIAnalysisResponse> => {
    
    const analysisSchema = {
        type: Type.OBJECT,
        properties: {
          overall_summary: {
            type: Type.STRING,
            description: "A brief, one or two-sentence summary of the overall soil health."
          },
          observations: {
            type: Type.ARRAY,
            description: "A list of 2-4 key observations about the data points. Frame them as positive, neutral, or negative insights.",
            items: { type: Type.STRING }
          },
          recommendations: {
            type: Type.ARRAY,
            description: "A list of 2-4 actionable recommendations for the user to improve soil health based on the observations.",
            items: { type: Type.STRING }
          }
        },
        required: ["overall_summary", "observations", "recommendations"]
      };

    const prompt = `
        Analyze the following real-time soil sensor data for a smart agriculture system. 
        Provide an expert analysis and actionable recommendations.

        Sensor Data:
        - Moisture: ${data.moisture.toFixed(1)}%
        - Temperature: ${data.temperature.toFixed(1)}°C
        - Electrical Conductivity (EC): ${data.ec} uS/cm
        - pH: ${data.ph.toFixed(1)}
        - Nitrogen (N): ${data.nitrogen} mg/kg
        - Phosphorus (P): ${data.phosphorus} mg/kg
        - Potassium (K): ${data.potassium} mg/kg
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are an expert agronomist and soil scientist providing advice for a smart agriculture platform. Your analysis should be clear, concise, and easy for a non-expert to understand. Your response MUST be in JSON format conforming to the provided schema.",
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
                temperature: 0.5,
            }
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        return parsedResponse;

    } catch (error) {
        console.error("Error generating AI analysis:", error);
        throw new Error("Failed to get analysis from AI. The model may be overloaded or an API error occurred.");
    }
};