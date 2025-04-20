
import { StressLevel, DepressionLevel } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, HeartPulse } from "lucide-react";

interface StatusIndicatorProps {
  stressLevel: StressLevel;
  depressionLevel: DepressionLevel;
  currentHeartRate: number;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  stressLevel, 
  depressionLevel, 
  currentHeartRate 
}) => {
  const getStressDetails = () => {
    switch (stressLevel) {
      case 'highly_stressed':
        return {
          label: 'Highly Stressed',
          description: 'Your heart rate is above 110 BPM',
          color: 'bg-red-500',
          textColor: 'text-red-500'
        };
      case 'stressed':
        return {
          label: 'Stressed',
          description: 'Your heart rate is above 90 BPM',
          color: 'bg-yellow-500',
          textColor: 'text-yellow-500'
        };
      default:
        return {
          label: 'Not Stressed',
          description: 'Your heart rate is below 90 BPM',
          color: 'bg-green-500',
          textColor: 'text-green-500'
        };
    }
  };

  const getDepressionDetails = () => {
    return depressionLevel === 'depressed' ? {
      label: 'Depression Risk',
      description: 'Your heart rate is below 60 BPM',
      color: 'bg-blue-500',
      textColor: 'text-blue-500'
    } : {
      label: 'No Depression Risk',
      description: 'Your heart rate is above 60 BPM',
      color: 'bg-green-500',
      textColor: 'text-green-500'
    };
  };

  const stressDetails = getStressDetails();
  const depressionDetails = getDepressionDetails();

  return (
    <div className="space-y-4">
      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`${stressDetails.color} p-3 rounded-full mr-3 text-white`}>
                <HeartPulse className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  {stressDetails.label}
                  <Badge variant="outline" className="ml-2">
                    {currentHeartRate} BPM
                  </Badge>
                </h3>
                <p className="text-sm text-muted-foreground">{stressDetails.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md border-none overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`${depressionDetails.color} p-3 rounded-full mr-3 text-white`}>
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  {depressionDetails.label}
                  <Badge variant="outline" className="ml-2">
                    {currentHeartRate} BPM
                  </Badge>
                </h3>
                <p className="text-sm text-muted-foreground">{depressionDetails.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusIndicator;
