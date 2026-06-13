"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface BadgeProps extends HTMLMotionProps<"span"> {
  variant?: "default" | "success" | "warning" | "error" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";
  
  const variants = {
    default: "bg-surface-hover text-foreground border border-border",
    success: "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20",
    error: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
    outline: "bg-transparent text-muted-foreground border border-border",
  };

  return (
    <motion.span 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.span>
  );
};
