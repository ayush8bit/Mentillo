
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HistoricalData, MentalHealthStatus } from "@/types";
import { CalendarIcon } from "lucide-react";
import { mentalHealthService } from "@/services/mentalHealthService";

const getStatusColor = (status: MentalHealthStatus): string => {
  switch (status) {
    case 'healthy': return 'bg-mental-healthy';
    case 'stress': return 'bg-mental-stress';
    case 'depression': return 'bg-mental-depression';
    case 'insomnia': return 'bg-mental-insomnia';
    default: return 'bg-gray-400';
  }
};

const getStatusText = (status: MentalHealthStatus): string => {
  switch (status) {
    case 'healthy': return 'Healthy';
    case 'stress': return 'Stress';
    case 'depression': return 'Depression';
    case 'insomnia': return 'Insomnia';
    default: return 'Unknown';
  }
};

const HistoryCalendar = () => {
  const [days, setDays] = useState(7);
  const [data, setData] = useState<HistoricalData[]>(() => 
    mentalHealthService.getHistoricalData(days)
  );

  const handleUpdateDays = (newDays: number) => {
    setDays(newDays);
    setData(mentalHealthService.getHistoricalData(newDays));
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            History
          </CardTitle>
          <div className="flex space-x-1">
            <Button 
              variant={days === 7 ? "default" : "outline"} 
              size="sm"
              onClick={() => handleUpdateDays(7)}
              className="text-xs px-2 h-6"
            >
              7d
            </Button>
            <Button 
              variant={days === 14 ? "default" : "outline"} 
              size="sm"
              onClick={() => handleUpdateDays(14)}
              className="text-xs px-2 h-6"
            >
              14d
            </Button>
            <Button 
              variant={days === 30 ? "default" : "outline"} 
              size="sm"
              onClick={() => handleUpdateDays(30)}
              className="text-xs px-2 h-6"
            >
              30d
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {data.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs text-muted-foreground">
                {new Date(day.date).toLocaleDateString('en-US', { 
                  month: 'numeric', 
                  day: 'numeric'
                })}
              </div>
              <div 
                className={`w-8 h-8 mt-1 rounded-full flex items-center justify-center text-white text-xs ${getStatusColor(day.mentalStatus)}`}
                title={`${getStatusText(day.mentalStatus)} - ${day.averageHeartRate} BPM avg`}
              >
                {day.averageHeartRate}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryCalendar;
