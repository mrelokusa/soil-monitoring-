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
  cross_domain_insights?: string[]; // Optional for new integrated analysis
  priority?: 'Normal' | 'Warning' | 'Critical' | string;
}

// Data from the Greenhouse API
export interface GreenhouseData {
  id: number;
  timestamp: string;
  temperature: number;
  humidity: number;
  pressure: number;
  altitude: number;
  lightRaw: number;
  flameDetected: boolean;
  airQualityRaw: number; // MQ135
  smokeRaw: number; // MQ2
  coRaw: number; // MQ7
}

export interface ApiGreenhouseItem {
    id: number;
    timestamp_reading: string;
    temperature_dht22: number;
    humidity: number;
    pressure: number;
    altitude: number;
    light_raw: number;
    flame_detected: number; // 0 or 1
    mq135_raw: number;
    mq2_raw: number;
    mq7_raw: number;
    // other fields ignored for now
}