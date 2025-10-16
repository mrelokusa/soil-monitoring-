export interface SoilData {
  id: number;
  inserted_at: string;
  moisture: number;
  temperature: number;
  ec: number;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface AIAnalysisResponse {
  overall_summary: string;
  observations: string[];
  recommendations: string[];
}
