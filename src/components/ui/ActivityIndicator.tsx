import { cn } from "@/lib/classMerge";
import { Asterisk } from "lucide-react";
import { HTMLAttributes, forwardRef } from "react";

export interface ActivityIndicatorProps
  extends HTMLAttributes<HTMLDivElement> {}

export const ActivityIndicator = forwardRef<
  HTMLDivElement,
  ActivityIndicatorProps
>(function ActivityIndicator({ className, ...props }, ref) {
  return (
    <div
      className={cn(
        "overflow-hidden border-b-4 border-b-neutral-600 w-44 h-28 flex items-center justify-center gap-1.5 text-7xl animate-appear-widen",
        className
      )}
      ref={ref}
      {...props}
    >
      {[1, 2, 3].map((idx) => (
        <div
          key={idx}
          className="animate-star-bounce flex items-center justify-center"
          style={{ animationDelay: idx * 500 + "ms" }}
        >
          <Asterisk className="animate-spin h-12 w-12" />
        </div>
      ))}
    </div>
  );
});
