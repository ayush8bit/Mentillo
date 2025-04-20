import { HeartRateReading, MentalHealthData } from '../types';

// Simulated heart rate data for development
// In a real app, this would interface with the smartwatch heart rate sensor API
class HeartRateService {
  private readings: HeartRateReading[] = [];
  private lastReading: HeartRateReading | null = null;
  private isMonitoring = false;
  private monitoringInterval: number | null = null;

  constructor() {
    // Initialize with some sample data
    const now = Date.now();
    for (let i = 0; i < 24; i++) {
      this.readings.push({
        timestamp: now - (24 - i) * 3600000, // Last 24 hours
        bpm: Math.floor(65 + Math.random() * 20) // Random BPM between 65-85
      });
    }
  }

  // Start monitoring heart rate
  startMonitoring(intervalMs = 60000): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitoringInterval = window.setInterval(() => {
      this.recordHeartRate();
    }, intervalMs);
    
    // Immediately record one reading
    this.recordHeartRate();
  }

  // Stop monitoring heart rate
  stopMonitoring(): void {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }

  // Record current heart rate
  private recordHeartRate(): void {
    // This would normally get data from the watch sensors
    // For now, we'll generate realistic simulated data
    
    let baseBpm = 70;
    const hourOfDay = new Date().getHours();
    
    // Simulate daily patterns - higher during day, lower at night
    if (hourOfDay >= 9 && hourOfDay <= 18) {
      baseBpm += 10; // Higher during daytime activity
    } else if (hourOfDay >= 22 || hourOfDay <= 5) {
      baseBpm -= 10; // Lower during typical sleep hours
    }
    
    // Add some randomness
    const randomVariation = Math.random() * 12 - 6; // -6 to +6 BPM variation
    const bpm = Math.floor(baseBpm + randomVariation);
    
    const reading: HeartRateReading = {
      timestamp: Date.now(),
      bpm
    };
    
    this.lastReading = reading;
    this.readings.push(reading);
    
    // Keep only the last 24 hours of readings
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    this.readings = this.readings.filter(r => r.timestamp >= oneDayAgo);
  }

  // Get the latest heart rate reading
  getLatestReading(): HeartRateReading | null {
    return this.lastReading;
  }

  // Get all readings for a time period
  getReadings(timespan = 24): HeartRateReading[] {
    const cutoffTime = Date.now() - timespan * 60 * 60 * 1000;
    return this.readings.filter(reading => reading.timestamp >= cutoffTime);
  }

  // Calculate average heart rate
  getAverageHeartRate(timespan = 24): number {
    const relevantReadings = this.getReadings(timespan);
    if (relevantReadings.length === 0) return 0;
    
    const sum = relevantReadings.reduce((acc, reading) => acc + reading.bpm, 0);
    return Math.round(sum / relevantReadings.length);
  }

  // Calculate heart rate variability (simplified)
  getHeartRateVariability(timespan = 24): number {
    const readings = this.getReadings(timespan);
    if (readings.length < 2) return 0;
    
    const bpmValues = readings.map(r => r.bpm);
    const mean = bpmValues.reduce((a, b) => a + b, 0) / bpmValues.length;
    
    // Calculate standard deviation
    const squareDiffs = bpmValues.map(bpm => {
      const diff = bpm - mean;
      return diff * diff;
    });
    const variance = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
    
    return Math.sqrt(variance);
  }
}

// Singleton instance
export const heartRateService = new HeartRateService();
