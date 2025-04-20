
export type StressLevel = 'not_stressed' | 'stressed' | 'highly_stressed';
export type DepressionLevel = 'not_depressed' | 'depressed';

export interface HeartRateReading {
  timestamp: number;
  bpm: number;
}

export interface MentalHealthData {
  stressLevel: StressLevel;
  depressionLevel: DepressionLevel;
  currentHeartRate: number;
}

export interface HistoricalData {
  date: string;
  averageHeartRate: number;
  stressLevel: StressLevel;
  depressionLevel: DepressionLevel;
}

export interface UserSettings {
  name: string;
  age: number;
  notificationsEnabled: boolean;
  monitoringInterval: number; // in minutes
}
