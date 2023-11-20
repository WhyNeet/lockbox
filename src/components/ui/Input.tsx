import { cn } from "@/lib/classMerge";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";

export const inputVariants = cva(
  "rounded-lg px-2.5 py-1.5 focus:border-blue-500 border",
  {
    variants: {
      variant: {
        filled: "bg-neutral-750 border-transparent",
        outline: "border-neutral-750 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "filled",
    },
  }
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, variant, ...props },
  ref
) {
  return (
    <input
      className={cn(inputVariants({ className, variant }))}
      ref={ref}
      {...props}
    />
  );
});
