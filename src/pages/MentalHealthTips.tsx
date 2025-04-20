
import { Card, CardContent } from "@/components/ui/card";
import { Meditation } from "lucide-react";

const MentalHealthTips = () => {
  return (
    <div className="h-full w-full overflow-y-auto pb-16">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <Meditation className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Mental Wellness Tips</h1>
        </div>

        <Card className="border-none shadow-md">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Daily Mental Wellness Tips</h2>
              <p className="text-muted-foreground">Simple practices to boost your mental well-being.</p>
            </div>

            {[
              {
                title: "1. Practice Daily Gratitude",
                content: "Take a moment each day to write down three things you're grateful for. This simple practice can significantly improve your mental outlook."
              },
              {
                title: "2. Establish a Sleep Routine",
                content: "Aim for 7-9 hours of sleep each night. A consistent sleep schedule helps regulate your mood and reduces stress levels."
              },
              {
                title: "3. Stay Active Daily",
                content: "Regular physical activity boosts endorphins and improves both physical and mental health. Even a 15-minute walk makes a difference!"
              },
              {
                title: "4. Practice Mindful Breathing",
                content: "Take 5 minutes each day for deep breathing exercises. This helps reduce anxiety and promotes mental clarity."
              },
              {
                title: "5. Connect with Nature",
                content: "Spend time outdoors daily. Nature exposure has been proven to reduce stress and improve overall mental well-being."
              }
            ].map((tip, index) => (
              <div key={index} className="p-4 bg-card rounded-lg space-y-2">
                <h3 className="font-semibold text-lg text-primary">{tip.title}</h3>
                <p className="text-muted-foreground">{tip.content}</p>
              </div>
            ))}

            <p className="text-lg font-medium text-center mt-6">
              Remember: Small daily actions lead to significant improvements in mental health!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentalHealthTips;
