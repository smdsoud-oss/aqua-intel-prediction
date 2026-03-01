
export enum AppScreen {
  HOME = 'HOME',
  DATA_INPUT = 'DATA_INPUT',
  PROCESSING = 'PROCESSING',
  RESULTS = 'RESULTS',
  RECOMMENDATIONS = 'RECOMMENDATIONS',
  ABOUT = 'ABOUT',
  HISTORY = 'HISTORY'
}

export enum StressLevel {
  SAFE = 'SAFE',
  AVERAGE = 'AVERAGE',
  DANGER = 'DANGER'
}

export interface GroundwaterData {
  district: string;
  rainfall: number;
  soilType: string;
  cropType: string;
  borewellDepth: number;
  groundwaterTrend: number[]; // Last 5 years
}

export interface PredictionResult {
  status: StressLevel;
  explanation: string;
  district: string;
  cropType: string;
  confidence: number;
  recommendation: string;
  timestamp?: string;
}

export interface Recommendation {
  title: string;
  description: string;
  icon: string;
}
