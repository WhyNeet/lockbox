import Sidebar from "@/components/Sidebar";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") navigate("/all");
  }, [location]);

  return (
    <div className="h-full w-full flex items-stretch">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
