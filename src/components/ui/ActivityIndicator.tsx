import { cn } from "@/lib/classMerge";
import { Asterisk } from "lucide-react";
import { HTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";

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
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: idx * 0.2 }}
          className={`animate-star-bounce flex items-center justify-center ${
            idx % 2 ? "" : "text-blue-400"
          }`}
          style={{
            animationDelay: idx * 500 + "ms",
          }}
        >
          <Asterisk className="animate-spin h-12 w-12" />
        </motion.div>
      ))}
    </div>
  );
});
