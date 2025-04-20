
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { heartRateService } from "@/services/heartRateService";
import { HeartRateReading } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

const HeartRateMonitor = () => {
  const [currentBpm, setCurrentBpm] = useState<number | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Start monitoring on component mount
    heartRateService.startMonitoring(5000); // Update every 5 seconds for demo purposes
    setIsMonitoring(true);

    // Set up an interval to check for the latest reading
    const interval = setInterval(() => {
      const latest = heartRateService.getLatestReading();
      if (latest) {
        setCurrentBpm(latest.bpm);
      }
    }, 1000);

    // Clean up on component unmount
    return () => {
      clearInterval(interval);
      heartRateService.stopMonitoring();
    };
  }, []);

  return (
    <Card className="border-none shadow-lg overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 mb-4">
          <Heart 
            className={`text-white w-14 h-14 ${isMonitoring ? 'animate-heart-beat' : ''}`} 
            fill="rgba(255,255,255,0.7)"
          />
        </div>
        <div className="text-3xl font-bold tracking-tighter">
          {currentBpm !== null ? currentBpm : '--'} <span className="text-sm font-normal ml-1">BPM</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {isMonitoring ? 'Monitoring...' : 'Monitor paused'}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeartRateMonitor;
