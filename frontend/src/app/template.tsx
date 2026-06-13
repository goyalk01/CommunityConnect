"use client";

import { motion } from "framer-motion";
import { PAGE_TRANSITION } from "@/lib/animations";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={PAGE_TRANSITION}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col flex-1"
    >
      {children}
    </motion.div>
  );
}
