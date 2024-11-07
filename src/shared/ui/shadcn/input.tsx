import * as React from "react";

import { cn } from "@/shared/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "custom";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          {
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm":
              variant === "default",
            "flex h-16 lg:h-20 px-10 lg:px-12 w-full bg-input font-semibold rounded-2xl lg:rounded-3xl placeholder:text-muted-foreground/60 text-xl lg:text-3xl":
              variant === "custom",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
