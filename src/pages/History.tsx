
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { mentalHealthService } from "@/services/mentalHealthService";
import { MentalHealthStatus } from "@/types";

const History = () => {
  const [timespan, setTimespan] = useState<"7" | "14" | "30">("7");
  const days = parseInt(timespan);
  
  // Get historical data
  const rawData = mentalHealthService.getHistoricalData(days);
  
  // Format data for charts
  const lineData = rawData.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    heartRate: item.averageHeartRate
  }));
  
  // Count mental health statuses
  const statusCounts: Record<string, number> = {
    healthy: 0,
    stress: 0,
    depression: 0,
    insomnia: 0,
    unknown: 0
  };
  
  rawData.forEach(item => {
    statusCounts[item.mentalStatus]++;
  });
  
  const pieData = Object.entries(statusCounts)
    .filter(([_, count]) => count > 0)
    .map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    }));
  
  const COLORS = ['#8FE388', '#FF6B6B', '#6B66FF', '#9966CC', '#ccc'];
  
  return (
    <div className="h-full w-full overflow-y-auto pb-16">
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">History</h1>
        
        <Tabs
          defaultValue="7"
          value={timespan}
          onValueChange={(value) => setTimespan(value as "7" | "14" | "30")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="7">7 Days</TabsTrigger>
            <TabsTrigger value="14">14 Days</TabsTrigger>
            <TabsTrigger value="30">30 Days</TabsTrigger>
          </TabsList>
          
          <TabsContent value={timespan} className="space-y-4">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-md">Heart Rate Trends</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="w-full h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={lineData}
                      margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 10 }}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        domain={['dataMin - 5', 'dataMax + 5']}
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                          borderRadius: '4px',
                          fontSize: '12px',
                          border: '1px solid #f0f0f0'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="heartRate"
                        name="Heart Rate"
                        stroke="#FF6B6B"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-md">Mental Health Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="w-full h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} days`, name]}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                          borderRadius: '4px',
                          fontSize: '12px',
                          border: '1px solid #f0f0f0'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default History;
