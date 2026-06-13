"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={id} className="text-sm font-medium text-foreground flex items-center justify-between">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={`
              w-full rounded-xl border bg-surface px-4 py-3 text-sm text-foreground shadow-sm transition-all
              placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
              ${icon ? "pl-10" : ""}
              ${error ? "border-error focus-visible:ring-error" : "border-border hover:border-border-hover"}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-error flex items-center gap-1 mt-0.5"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
