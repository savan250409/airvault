import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Custom gradient variants using design system
        "gradient-primary": "bg-gradient-to-r from-primary to-primary-dark text-primary-foreground shadow-soft hover:shadow-medium transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5",
        "gradient-secondary": "bg-gradient-to-r from-secondary to-secondary-dark text-secondary-foreground shadow-soft hover:shadow-medium transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-0.5",
        "outline-animated": "border-2 border-primary text-primary bg-transparent relative overflow-hidden transition-all duration-300 ease-out hover:text-white hover:border-primary-dark before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary before:to-primary-dark before:transform before:-translate-x-full before:transition-transform before:duration-300 before:ease-out before:z-[-1] hover:before:translate-x-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
