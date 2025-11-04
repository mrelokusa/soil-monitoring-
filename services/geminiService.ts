import { GoogleGenAI, Type } from "@google/genai";
import { SoilData, GreenhouseData, AIAnalysisResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getCombinedAnalysis = async (soilData: SoilData, greenhouseData: GreenhouseData): Promise<AIAnalysisResponse> => {
    
    const analysisSchema = {
        type: Type.OBJECT,
        properties: {
          overall_summary: {
            type: Type.STRING,
            description: "A brief, one or two-sentence summary of the overall growing environment health, considering both soil and atmosphere."
          },
          observations: {
            type: Type.ARRAY,
            description: "A list of 2-4 key observations about the combined data points. Frame them as positive, neutral, or negative insights.",
            items: { type: Type.STRING }
          },
          recommendations: {
            type: Type.ARRAY,
            description: "A list of 2-3 actionable recommendations for the user to improve conditions based on the soil data.",
            items: { type: Type.STRING }
          },
          cross_domain_insights: {
            type: Type.ARRAY,
            description: "A list of 1-2 insights or recommendations that connect the greenhouse environmental data to the soil data. For example, how high humidity might affect soil moisture or pH.",
            items: {type: Type.STRING}
          },
          priority: {
            type: Type.STRING,
            description: "Rate the overall situation's priority. Use 'Normal' for ideal conditions, 'Warning' for conditions that need monitoring, or 'Critical' for issues requiring immediate attention (like very low moisture, nutrient deficiency, or detected hazards)."
          }
        },
        required: ["overall_summary", "observations", "recommendations", "priority"]
      };

    const systemInstruction = "You are an expert agronomist and environmental scientist for a smart agriculture platform. Your analysis must be clear, concise, and easy to understand. Critically, you must connect the atmospheric conditions with the soil health to provide integrated advice. Your response MUST be in JSON format conforming to the provided schema, including an accurate priority level.";
    
    const userPrompt = `
        Analyze the following real-time sensor data for a smart agriculture system. 
        Provide an expert, holistic analysis considering both soil and greenhouse environmental conditions.

        Soil Sensor Data:
        - Moisture: ${soilData.moisture.toFixed(1)}%
        - Temperature: ${soilData.temperature.toFixed(1)}°C
        - Electrical Conductivity (EC): ${soilData.ec} uS/cm
        - pH: ${soilData.ph.toFixed(1)}
        - Nitrogen (N): ${soilData.nitrogen} mg/kg
        - Phosphorus (P): ${soilData.phosphorus} mg/kg
        - Potassium (K): ${soilData.potassium} mg/kg

        Greenhouse Environment Data:
        - Air Temperature: ${greenhouseData.temperature.toFixed(1)}°C
        - Humidity: ${greenhouseData.humidity.toFixed(1)}%
        - Pressure: ${greenhouseData.pressure.toFixed(2)} hPa
        - Light Intensity: ${greenhouseData.lightRaw} (raw value)
        - Flame Detected: ${greenhouseData.flameDetected ? 'Yes - CRITICAL' : 'No'}
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: analysisSchema,
                temperature: 0.6,
            }
        });

        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        return parsedResponse;

    } catch (error) {
        console.error("Error generating AI analysis:", error);
        const originalErrorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        throw new Error(`Failed to get analysis from AI. The model may be overloaded or an API error occurred. Details: ${originalErrorMessage}`);
    }
};