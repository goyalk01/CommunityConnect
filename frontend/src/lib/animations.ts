import { Variants } from "framer-motion";

export const FADE_UP_SPRING: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  }),
};

export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // Custom sleek ease
    },
  }),
};

export const STAGGER_CONTAINER: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const HOVER_LIFT = {
  whileHover: { y: -4, scale: 1.01, transition: { duration: 0.2, ease: "easeOut" as const } },
  whileTap: { y: 0, scale: 0.98, transition: { duration: 0.1 } },
};

export const PAGE_TRANSITION: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    opacity: 0, 
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] } 
  }
};
