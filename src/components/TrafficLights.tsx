import { cn } from "@/lib/classMerge";
import { HTMLAttributes } from "react";
import { Minus, Square, X } from "lucide-react";

export default function TrafficLights({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2 group", className)} {...props}>
      <button
        onClick={close}
        className="h-3 w-3 bg-red-500 border border-red-700 rounded-full ring-0 flex items-center justify-center text-red-900"
      >
        <X className="h-3 w-3 hidden group-hover:block" strokeWidth={3.5} />
      </button>
      <button
        onClick={minimize}
        className="h-3 w-3 bg-yellow-500 border border-yellow-700 rounded-full ring-0 flex items-center justify-center text-yellow-900"
      >
        <Minus className="h-3 w-3 hidden group-hover:block" strokeWidth={3.5} />
      </button>
      <button
        onClick={maximize}
        className="h-3 w-3 bg-green-500 border border-green-700 rounded-full ring-0 flex items-center justify-center text-green-900"
      >
        <Square
          className="h-2.5 w-2.5 scale-75 hidden group-hover:block"
          strokeWidth={4.5}
        />
      </button>
    </div>
  );
}

import { appWindow } from "@tauri-apps/api/window";

const maximize = async () => await appWindow.toggleMaximize();
const minimize = async () => await appWindow.minimize();
const close = async () => await appWindow.close();
