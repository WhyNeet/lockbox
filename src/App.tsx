import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-full w-full flex items-stretch">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
