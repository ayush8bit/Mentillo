
import { useState, useEffect } from "react";
import HeartRateMonitor from "@/components/HeartRateMonitor";
import StatusIndicator from "@/components/StatusIndicator";
import HeartRateChart from "@/components/HeartRateChart";
import HistoryCalendar from "@/components/HistoryCalendar";
import { mentalHealthService } from "@/services/mentalHealthService";
import { heartRateService } from "@/services/heartRateService";
import { MentalHealthData } from "@/types";

const Dashboard = () => {
  const [mentalHealthData, setMentalHealthData] = useState<MentalHealthData>({
    stressLevel: 'not_stressed',
    depressionLevel: 'not_depressed',
    currentHeartRate: 0
  });

  useEffect(() => {
    // Start heart rate monitoring
    heartRateService.startMonitoring(5000);
    
    // Analyze mental health initially
    updateMentalHealthData();
    
    // Set up interval to update data periodically
    const interval = setInterval(updateMentalHealthData, 10000);
    
    return () => {
      clearInterval(interval);
      heartRateService.stopMonitoring();
    };
  }, []);

  const updateMentalHealthData = () => {
    const data = mentalHealthService.analyzeHeartRate();
    setMentalHealthData(data);
  };

  return (
    <div className="h-full w-full overflow-y-auto pb-16">
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Mentillo</h1>
        
        <div className="space-y-4">
          <HeartRateMonitor />
          
          <StatusIndicator 
            stressLevel={mentalHealthData.stressLevel}
            depressionLevel={mentalHealthData.depressionLevel}
            currentHeartRate={mentalHealthData.currentHeartRate}
          />
          
          <HeartRateChart />
          
          <HistoryCalendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
