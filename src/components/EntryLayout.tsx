import { Outlet } from "react-router-dom";
import TrafficLights from "./TrafficLights";

export default function EntryLayout() {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <div
        data-tauri-drag-region
        className="fixed px-3 h-8 top-0 inset-x-0 flex items-center"
      >
        <TrafficLights className="w-fit" />
      </div>
      <Outlet />
    </div>
  );
}
