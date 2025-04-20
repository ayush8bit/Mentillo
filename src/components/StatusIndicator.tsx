
import { MentalHealthStatus } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Moon, Activity, AlertTriangle } from "lucide-react";

interface StatusIndicatorProps {
  status: MentalHealthStatus;
  confidence: number;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, confidence }) => {
  // Determine display properties based on status
  const getStatusDetails = () => {
    switch (status) {
      case 'healthy':
        return {
          label: 'Healthy',
          description: 'Your heart rate patterns look normal',
          color: 'bg-mental-healthy',
          textColor: 'text-mental-healthy',
          icon: <Heart className="h-6 w-6" />
        };
      case 'stress':
        return {
          label: 'Stress',
          description: 'Your heart rate patterns suggest elevated stress',
          color: 'bg-mental-stress',
          textColor: 'text-mental-stress',
          icon: <Activity className="h-6 w-6" />
        };
      case 'depression':
        return {
          label: 'Depression',
          description: 'Your heart rate patterns match depression indicators',
          color: 'bg-mental-depression',
          textColor: 'text-mental-depression',
          icon: <AlertTriangle className="h-6 w-6" />
        };
      case 'insomnia':
        return {
          label: 'Insomnia',
          description: 'Your heart rate patterns suggest disturbed sleep',
          color: 'bg-mental-insomnia',
          textColor: 'text-mental-insomnia',
          icon: <Moon className="h-6 w-6" />
        };
      default:
        return {
          label: 'Unknown',
          description: 'Not enough data to determine your status',
          color: 'bg-gray-400',
          textColor: 'text-gray-400',
          icon: <AlertTriangle className="h-6 w-6" />
        };
    }
  };

  const details = getStatusDetails();

  return (
    <Card className="shadow-md border-none overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`${details.color} p-3 rounded-full mr-3 text-white`}>
              {details.icon}
            </div>
            <div>
              <h3 className="text-lg font-medium flex items-center">
                {details.label}
                <Badge 
                  variant={confidence > 70 ? "default" : "outline"}
                  className="ml-2 text-xs"
                >
                  {confidence}% confidence
                </Badge>
              </h3>
              <p className="text-sm text-muted-foreground">{details.description}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusIndicator;
