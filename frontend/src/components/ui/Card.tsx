"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { HOVER_LIFT } from "@/lib/animations";

interface CardProps extends HTMLMotionProps<"div"> {
  hoverable?: boolean;
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", hoverable = false, glass = false, ...props }, ref) => {
    const baseStyles = "rounded-2xl border border-border bg-surface text-foreground shadow-sm overflow-hidden";
    const glassStyles = glass ? "bg-surface/60 backdrop-blur-xl" : "";
    
    return (
      <motion.div
        ref={ref}
        className={`${baseStyles} ${glassStyles} ${className}`}
        whileHover={hoverable ? HOVER_LIFT.whileHover : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
