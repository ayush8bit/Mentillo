
import { MentalHealthData, MentalHealthStatus, HeartRateReading } from '../types';
import { heartRateService } from './heartRateService';

// Simple ML model and analysis for heart rate patterns
class MentalHealthService {
  // Analyze heart rate data to determine mental health status
  analyzeHeartRate(): MentalHealthData {
    const readings = heartRateService.getReadings();
    if (readings.length < 5) {
      return {
        status: 'unknown',
        confidence: 0,
      };
    }

    // Get key metrics
    const averageHeartRate = heartRateService.getAverageHeartRate();
    const heartRateVariability = heartRateService.getHeartRateVariability();
    const recentReadings = readings.slice(-5); // Last 5 readings
    
    // Calculate nighttime vs daytime heart rates
    const nightReadings = readings.filter(r => {
      const hour = new Date(r.timestamp).getHours();
      return hour >= 22 || hour <= 5;
    });
    const dayReadings = readings.filter(r => {
      const hour = new Date(r.timestamp).getHours();
      return hour > 5 && hour < 22;
    });
    
    const avgNightHeartRate = nightReadings.length > 0 
      ? nightReadings.reduce((acc, r) => acc + r.bpm, 0) / nightReadings.length 
      : 0;
    const avgDayHeartRate = dayReadings.length > 0 
      ? dayReadings.reduce((acc, r) => acc + r.bpm, 0) / dayReadings.length 
      : 0;

    // Calculate risk factors - in a real app, this would be a proper ML model
    // Here, we're just using simple heuristics for demonstration
    
    // Stress indicators: elevated heart rate, reduced variability
    const stressRisk = this.calculateStressRisk(averageHeartRate, heartRateVariability, recentReadings);
    
    // Depression indicators: consistently low heart rate, reduced day/night difference
    const depressionRisk = this.calculateDepressionRisk(averageHeartRate, avgDayHeartRate, avgNightHeartRate);
    
    // Insomnia indicators: elevated nighttime heart rate, high variability at night
    const insomniaRisk = this.calculateInsomniaRisk(avgNightHeartRate, nightReadings);

    // Determine overall status based on highest risk factor
    const riskFactors = {
      stress: stressRisk,
      depression: depressionRisk,
      insomnia: insomniaRisk
    };
    
    const maxRisk = Math.max(stressRisk, depressionRisk, insomniaRisk);
    let status: MentalHealthStatus = 'healthy';
    
    if (maxRisk > 70) {
      // High risk of an issue
      if (stressRisk === maxRisk) status = 'stress';
      else if (depressionRisk === maxRisk) status = 'depression';
      else if (insomniaRisk === maxRisk) status = 'insomnia';
    } else if (maxRisk > 50) {
      // Moderate risk - we'll still flag it but with lower confidence
      if (stressRisk === maxRisk) status = 'stress';
      else if (depressionRisk === maxRisk) status = 'depression';
      else if (insomniaRisk === maxRisk) status = 'insomnia';
    }
    
    return {
      status,
      confidence: Math.min(100, Math.round(maxRisk)), // Convert highest risk factor to confidence
      riskFactors
    };
  }

  private calculateStressRisk(avgHeartRate: number, heartRateVariability: number, recentReadings: HeartRateReading[]): number {
    // Stress typically shows as elevated heart rate and reduced variability
    let risk = 0;
    
    // Check for elevated heart rate
    if (avgHeartRate > 85) risk += 30;
    else if (avgHeartRate > 75) risk += 15;
    
    // Check for reduced heart rate variability
    if (heartRateVariability < 5) risk += 40;
    else if (heartRateVariability < 10) risk += 20;
    
    // Check for consistently increasing heart rate in recent readings
    let increasingCount = 0;
    for (let i = 1; i < recentReadings.length; i++) {
      if (recentReadings[i].bpm > recentReadings[i - 1].bpm) increasingCount++;
    }
    if (increasingCount >= 3) risk += 15;
    
    return Math.min(100, risk);
  }

  private calculateDepressionRisk(avgHeartRate: number, avgDayHeartRate: number, avgNightHeartRate: number): number {
    // Depression can manifest as consistently low heart rate and reduced day/night difference
    let risk = 0;
    
    // Check for low overall heart rate
    if (avgHeartRate < 60) risk += 25;
    else if (avgHeartRate < 65) risk += 15;
    
    // Check for reduced difference between day and night heart rates
    // Healthy people usually have more distinct patterns
    const dayNightDifference = Math.abs(avgDayHeartRate - avgNightHeartRate);
    if (dayNightDifference < 5) risk += 30;
    else if (dayNightDifference < 8) risk += 15;
    
    // Low daytime heart rate can indicate lethargy
    if (avgDayHeartRate < 65) risk += 25;
    else if (avgDayHeartRate < 70) risk += 15;
    
    return Math.min(100, risk);
  }

  private calculateInsomniaRisk(avgNightHeartRate: number, nightReadings: HeartRateReading[]): number {
    // Insomnia often shows as elevated nighttime heart rate and high variability at night
    let risk = 0;
    
    if (nightReadings.length < 3) return risk; // Not enough data
    
    // Check for elevated nighttime heart rate
    if (avgNightHeartRate > 70) risk += 30;
    else if (avgNightHeartRate > 65) risk += 15;
    
    // Calculate nighttime variability
    const nightHeartRates = nightReadings.map(r => r.bpm);
    const nightAvg = nightHeartRates.reduce((a, b) => a + b, 0) / nightHeartRates.length;
    const squareDiffs = nightHeartRates.map(bpm => (bpm - nightAvg) ** 2);
    const nightVariance = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
    const nightVariability = Math.sqrt(nightVariance);
    
    // High variability at night suggests disturbed sleep
    if (nightVariability > 15) risk += 40;
    else if (nightVariability > 10) risk += 20;
    
    // Check for irregular patterns in night readings
    let irregularPatterns = 0;
    for (let i = 1; i < nightReadings.length; i++) {
      const diff = Math.abs(nightReadings[i].bpm - nightReadings[i - 1].bpm);
      if (diff > 10) irregularPatterns++;
    }
    
    if (irregularPatterns >= 3) risk += 20;
    else if (irregularPatterns > 1) risk += 10;
    
    return Math.min(100, risk);
  }

  // Get historical data for the past days
  getHistoricalData(days = 7): any[] {
    // In a real app, this would come from a database
    // Here we'll generate sample historical data
    const data = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      
      // Generate different patterns for different days
      let avgHeartRate = 70 + Math.floor(Math.sin(i / 2) * 10);
      
      // Determine a status based on the avg heart rate (simplified)
      let status: MentalHealthStatus = 'healthy';
      if (avgHeartRate > 80) status = 'stress';
      else if (avgHeartRate < 65) status = 'depression';
      // Randomly assign insomnia for demonstration
      else if (i % 5 === 0) status = 'insomnia';
      
      data.push({
        date: date.toISOString().split('T')[0],
        averageHeartRate: avgHeartRate,
        mentalStatus: status
      });
    }
    
    return data;
  }
}

export const mentalHealthService = new MentalHealthService();
