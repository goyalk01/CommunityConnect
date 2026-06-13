"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------------------------
// Custom Typewriter Hook
// ----------------------------------------------------------------------
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        setDisplayed((prev) => {
          const nextStr = text.slice(0, prev.length + 1);
          if (nextStr === text) {
            clearInterval(interval);
            setDone(true);
          }
          return nextStr;
        });
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// ----------------------------------------------------------------------
// Main Page Component
// ----------------------------------------------------------------------
export default function MainframePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!", 38, 600);

  // Video Scrubbing Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile Autoplay
    if (window.innerWidth < 1024) {
      video.autoplay = true;
      video.play().catch(() => {});
      return;
    }

    // Desktop Scrubbing
    let prevX = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (!video.duration) return;

      const delta = e.clientX - prevX;
      prevX = e.clientX;
      
      const scrubAmount = (delta / window.innerWidth) * 0.8 * video.duration;
      let targetTime = video.currentTime + scrubAmount;
      
      // Clamp
      if (targetTime < 0) targetTime = 0;
      if (targetTime > video.duration) targetTime = video.duration;
      
      video.currentTime = targetTime;
    };

    // Ensure smooth tracking by pausing any natural playback on desktop
    video.pause();

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  return (
    <div className="relative bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-[#EAECE9] dark:selection:bg-[#1C2E1E] selection:text-[#1C2E1E] dark:selection:text-[#EAECE9] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
      
      {/* Background Video Component */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 dark:bg-black lg:bg-transparent dark:lg:bg-transparent">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right lg:object-right-bottom opacity-90 dark:opacity-70"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4"
        />
      </div>

      {/* Interactive Navbar */}
      <header className="fixed top-0 inset-x-0 z-20 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        {/* Logo */}
        <div className="flex flex-row gap-3 items-center">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black dark:text-white font-medium select-none">
            Mainframe&reg;
          </span>
          <span className="text-[25px] sm:text-[30px] text-black dark:text-white select-none tracking-[-0.02em] font-medium leading-none mb-1">
            &#10033;
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex flex-row text-[23px] text-black dark:text-white items-center">
          {["Labs", "Studio", "Openings", "Shop"].map((item, idx, arr) => (
            <span key={item} className="flex items-center">
              <Link href="#" className="hover:opacity-60 transition-opacity">
                {item}
              </Link>
              {idx < arr.length - 1 && <span className="opacity-40">,&nbsp;</span>}
            </span>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link href="#" className="hidden md:block text-[23px] text-black dark:text-white underline underline-offset-2 hover:opacity-60 transition-opacity">
          Get in touch
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden relative z-30 w-6 h-6 flex flex-col justify-center gap-[5px]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`w-6 h-[2px] bg-black dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-6 h-[2px] bg-black dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-[2px] bg-black dark:bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 z-10 bg-white/95 dark:bg-black/95 backdrop-blur-sm transition-opacity duration-300 flex flex-col items-center justify-center ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} md:hidden`}
      >
        <nav className="flex flex-col gap-6 text-center text-3xl font-medium text-black dark:text-white">
          <Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Labs</Link>
          <Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Studio</Link>
          <Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Openings</Link>
          <Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="underline underline-offset-4 mt-4">Get in touch</Link>
        </nav>
      </div>

      {/* Content Layout Container */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white dark:bg-transparent lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen pt-24 lg:pt-0">
        <main id="spade-hero" className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
          
          {/* Headline with Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black dark:text-white leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-black dark:bg-white align-middle ml-[2px] animate-[blink_1s_step-end_infinite]" />
              )}
            </h1>
          </motion.div>

          {/* Secondary Description Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-[#5A635A] dark:text-[#a3b3a3] leading-relaxed font-normal mb-14 max-w-2xl">
              Whether you have questions, feedback, <br /> drop us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Interactive Multi-Select Service Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-medium tracking-tight mb-2 text-black dark:text-white">What sort of service?</h2>
            <p className="opacity-85 text-[#738273] dark:text-[#91a391] mb-8">Select all that apply</p>
            
            <div className="flex flex-wrap gap-3">
              {["Brand", "Digital", "Campaign", "Other"].map((service) => {
                const isActive = selectedServices.includes(service);
                return (
                  <motion.button
                    key={service}
                    onClick={() => toggleService(service)}
                    whileHover={{ scale: isActive ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[#1C2E1E] dark:bg-[#EAECE9] text-white dark:text-[#1C2E1E] shadow-md shadow-emerald-950/5 dark:shadow-emerald-50/5"
                        : "bg-white dark:bg-[#1a1a1a] text-[#1C2E1E] dark:text-white border border-[#F1F3F1] dark:border-[#333] hover:bg-[#F1F3F1]/55 dark:hover:bg-[#333]/55"
                    }`}
                  >
                    {service}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0, width: 0, marginLeft: 0 }}
                          animate={{ scale: 1, opacity: 1, width: "auto", marginLeft: 4 }}
                          exit={{ scale: 0, opacity: 0, width: 0, marginLeft: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Check size={16} strokeWidth={3} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Contingent Feedback Status Banner */}
          <AnimatePresence mode="wait">
            {selectedServices.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="italic text-xs text-[#1C2E1E] dark:text-white h-12 flex items-center"
              >
                Please click to select services above.
              </motion.div>
            ) : (
              <motion.div
                key="active"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#FAFBF9] dark:bg-[#1a1a1a] border border-[#F1F3F1] dark:border-[#333] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-sm font-medium text-[#1C2E1E] dark:text-white">
                    Ready to inquire about: <span className="text-[#4D6D47] dark:text-[#7ba972]">{selectedServices.join(", ")}</span>
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[#4D6D47] dark:text-[#7ba972] uppercase text-xs font-bold tracking-wider px-4 py-2 rounded-full bg-[#4D6D47]/10 dark:bg-[#7ba972]/10 hover:bg-[#4D6D47]/20 dark:hover:bg-[#7ba972]/20 transition-colors"
                  >
                    Let's Go &rarr;
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </div>

      {/* Global CSS for blink animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}} />
    </div>
  );
}
