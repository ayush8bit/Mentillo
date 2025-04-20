
export type MentalHealthStatus = 'healthy' | 'stress' | 'depression' | 'insomnia' | 'unknown';

export interface HeartRateReading {
  timestamp: number;
  bpm: number;
}

export interface MentalHealthData {
  status: MentalHealthStatus;
  confidence: number; // 0-100
  riskFactors?: {
    stress: number; // 0-100
    depression: number; // 0-100
    insomnia: number; // 0-100
  };
}

export interface HistoricalData {
  date: string; // ISO date string
  averageHeartRate: number;
  mentalStatus: MentalHealthStatus;
}

export interface UserSettings {
  name: string;
  age: number;
  notificationsEnabled: boolean;
  monitoringInterval: number; // in minutes
}
