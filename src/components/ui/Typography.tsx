import { forwardRef, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/classMerge";

export const textVariants = cva("", {
  variants: {
    type: {
      largeTitle: "text-2xl leading-8",
      title: "text-xl leading-6",
      subheadline: "text-sm leading-4 text-neutral-400",
    },
    weight: {
      default: "font-medium",
      emphasized: "font-semibold",
    },
  },
  defaultVariants: {
    weight: "default",
  },
});

export interface TypographyProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof textVariants> {}

export const Typography = forwardRef<HTMLDivElement, TypographyProps>(
  function Typography({ children, type, weight, className, ...props }, ref) {
    return (
      <div
        className={cn(textVariants({ type, weight, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
