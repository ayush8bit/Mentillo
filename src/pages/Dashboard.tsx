
import { useState, useEffect } from "react";
import HeartRateMonitor from "@/components/HeartRateMonitor";
import StatusIndicator from "@/components/StatusIndicator";
import RiskFactorGauge from "@/components/RiskFactorGauge";
import HeartRateChart from "@/components/HeartRateChart";
import HistoryCalendar from "@/components/HistoryCalendar";
import { mentalHealthService } from "@/services/mentalHealthService";
import { heartRateService } from "@/services/heartRateService";
import { MentalHealthData } from "@/types";

const Dashboard = () => {
  const [mentalHealthData, setMentalHealthData] = useState<MentalHealthData>({
    status: 'unknown',
    confidence: 0
  });

  useEffect(() => {
    // Start heart rate monitoring for simulated data
    heartRateService.startMonitoring(5000);
    
    // Analyze mental health initially
    updateMentalHealthData();
    
    // Set up interval to update data periodically
    const interval = setInterval(updateMentalHealthData, 10000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateMentalHealthData = () => {
    const data = mentalHealthService.analyzeHeartRate();
    setMentalHealthData(data);
  };

  return (
    <div className="h-full w-full overflow-y-auto pb-16">
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Mental Health Monitor</h1>
        
        <div className="space-y-4">
          <HeartRateMonitor />
          
          <StatusIndicator 
            status={mentalHealthData.status} 
            confidence={mentalHealthData.confidence} 
          />
          
          {mentalHealthData.riskFactors && (
            <div className="grid grid-cols-3 gap-2">
              <RiskFactorGauge 
                label="Stress" 
                value={mentalHealthData.riskFactors.stress} 
                color="bg-mental-stress"
              />
              <RiskFactorGauge 
                label="Depression" 
                value={mentalHealthData.riskFactors.depression} 
                color="bg-mental-depression"
              />
              <RiskFactorGauge 
                label="Insomnia" 
                value={mentalHealthData.riskFactors.insomnia} 
                color="bg-mental-insomnia"
              />
            </div>
          )}
          
          <HeartRateChart />
          
          <HistoryCalendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
