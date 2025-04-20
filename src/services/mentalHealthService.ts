
import { MentalHealthData, StressLevel, DepressionLevel, HeartRateReading } from '../types';
import { heartRateService } from './heartRateService';

class MentalHealthService {
  analyzeHeartRate(): MentalHealthData {
    const latestReading = heartRateService.getLatestReading();
    const currentHeartRate = latestReading?.bpm || 0;

    return {
      stressLevel: this.determineStressLevel(currentHeartRate),
      depressionLevel: this.determineDepressionLevel(currentHeartRate),
      currentHeartRate
    };
  }

  private determineStressLevel(heartRate: number): StressLevel {
    if (heartRate > 110) {
      return 'highly_stressed';
    } else if (heartRate > 90) {
      return 'stressed';
    }
    return 'not_stressed';
  }

  private determineDepressionLevel(heartRate: number): DepressionLevel {
    return heartRate < 60 ? 'depressed' : 'not_depressed';
  }

  getHistoricalData(days = 7): HistoricalData[] {
    // Generate sample historical data
    const data = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      
      const heartRate = 70 + Math.floor(Math.sin(i / 2) * 20); // Simulated heart rate
      
      data.push({
        date: date.toISOString().split('T')[0],
        averageHeartRate: heartRate,
        stressLevel: this.determineStressLevel(heartRate),
        depressionLevel: this.determineDepressionLevel(heartRate)
      });
    }
    
    return data;
  }
}

export const mentalHealthService = new MentalHealthService();
