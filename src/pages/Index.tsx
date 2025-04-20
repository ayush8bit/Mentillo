
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This is just a redirect page to the dashboard
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  
  return null;
};

export default Index;
