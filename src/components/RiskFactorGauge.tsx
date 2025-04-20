
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RiskFactorGaugeProps {
  label: string;
  value: number;
  color: string;
}

const RiskFactorGauge: React.FC<RiskFactorGaugeProps> = ({ label, value, color }) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <Progress 
          value={value} 
          className="h-2"
          indicatorClassName={color}
        />
        <div className="mt-1 text-xs font-medium text-right">
          {value}%
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskFactorGauge;
