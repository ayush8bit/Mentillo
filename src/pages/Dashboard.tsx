
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeartRateMonitor from "@/components/HeartRateMonitor";
import StatusIndicator from "@/components/StatusIndicator";
import HeartRateChart from "@/components/HeartRateChart";
import HistoryCalendar from "@/components/HistoryCalendar";
import { Card, CardContent } from "@/components/ui/card";
import { BookHeart, Heart } from "lucide-react";
import { mentalHealthService } from "@/services/mentalHealthService";
import { heartRateService } from "@/services/heartRateService";
import { MentalHealthData } from "@/types";

const Dashboard = () => {
  const navigate = useNavigate();
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

          <Card 
            className="border-none shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/depression-tips')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <BookHeart className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Feel depressed? Check this out</h3>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-none shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate('/mental-health-tips')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Improve your mental wellness</h3>
              </div>
            </CardContent>
          </Card>
          
          <HeartRateChart />
          
          <HistoryCalendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
