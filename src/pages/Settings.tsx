
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { UserSettings } from "@/types";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings>({
    name: "User",
    age: 30,
    notificationsEnabled: true,
    monitoringInterval: 5
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, name: e.target.value });
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, age: parseInt(e.target.value) || 0 });
  };

  const handleToggleNotifications = (checked: boolean) => {
    setSettings({ ...settings, notificationsEnabled: checked });
  };

  const handleMonitoringIntervalChange = (value: number[]) => {
    setSettings({ ...settings, monitoringInterval: value[0] });
  };

  const handleSaveSettings = () => {
    // In a real app, this would persist settings to storage
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="h-full w-full overflow-y-auto pb-16">
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={settings.name} 
                onChange={handleNameChange}
                placeholder="Your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                value={settings.age.toString()} 
                onChange={handleAgeChange}
                min={1}
                max={120}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Monitoring Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <Switch 
                id="notifications" 
                checked={settings.notificationsEnabled}
                onCheckedChange={handleToggleNotifications}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="interval">Monitoring Interval (minutes)</Label>
                <span className="text-sm">{settings.monitoringInterval}</span>
              </div>
              <Slider
                id="interval"
                min={1}
                max={60}
                step={1}
                value={[settings.monitoringInterval]}
                onValueChange={handleMonitoringIntervalChange}
              />
            </div>
          </CardContent>
        </Card>
        
        <Button className="w-full" onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
