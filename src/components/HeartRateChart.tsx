
import { useEffect, useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { heartRateService } from "@/services/heartRateService";
import { HeartRateReading } from "@/types";

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const HeartRateChart = () => {
  const [data, setData] = useState<Array<{time: string; bpm: number}>>([]);

  useEffect(() => {
    // Get initial data
    updateChartData();
    
    // Set up interval to update chart data
    const interval = setInterval(updateChartData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const updateChartData = () => {
    const readings = heartRateService.getReadings(6); // Last 6 hours
    
    // Format the data for the chart
    const chartData = readings.map((reading: HeartRateReading) => ({
      time: formatTime(reading.timestamp),
      bpm: reading.bpm
    }));
    
    setData(chartData);
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Heart Rate History</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="w-full h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
                tickCount={5}
              />
              <YAxis 
                domain={['dataMin - 10', 'dataMax + 10']}
                tick={{ fontSize: 10 }}
                tickCount={5}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '4px',
                  fontSize: '12px',
                  border: '1px solid #f0f0f0'
                }}
                formatter={(value) => [`${value} BPM`, 'Heart Rate']}
              />
              <Line
                type="monotone"
                dataKey="bpm"
                stroke="#FF6B6B"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeartRateChart;
