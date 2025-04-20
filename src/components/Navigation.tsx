
import { useLocation, Link } from "react-router-dom";
import { Heart, Clock, Settings } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-primary text-white' : 'text-muted-foreground';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-background border-t flex justify-around items-center z-10">
      <Link to="/" className="flex-1">
        <div className={`flex flex-col items-center justify-center ${isActive('/')}`}>
          <Heart className="h-5 w-5 mb-0.5" />
          <span className="text-[10px]">Dashboard</span>
        </div>
      </Link>
      
      <Link to="/history" className="flex-1">
        <div className={`flex flex-col items-center justify-center ${isActive('/history')}`}>
          <Clock className="h-5 w-5 mb-0.5" />
          <span className="text-[10px]">History</span>
        </div>
      </Link>
      
      <Link to="/settings" className="flex-1">
        <div className={`flex flex-col items-center justify-center ${isActive('/settings')}`}>
          <Settings className="h-5 w-5 mb-0.5" />
          <span className="text-[10px]">Settings</span>
        </div>
      </Link>
    </div>
  );
};

export default Navigation;
