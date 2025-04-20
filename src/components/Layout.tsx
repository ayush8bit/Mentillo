
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="w-full h-screen">
      <main className="h-full w-full overflow-hidden">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
