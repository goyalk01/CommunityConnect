"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Sparkles, BarChart3, ShieldCheck, Zap, Globe2, Building2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FADE_UP_SPRING, FADE_IN, STAGGER_CONTAINER } from "@/lib/animations";

const FEATURES = [
  {
    icon: <Users size={20} className="text-foreground" />,
    title: "Smart Volunteer Management",
    description: "Organize volunteers, track availability, and manage skills seamlessly in one unified dashboard."
  },
  {
    icon: <BarChart3 size={20} className="text-foreground" />,
    title: "Real-time Analytics",
    description: "Gain deep insights into community engagement with interactive charts and automated reporting."
  },
  {
    icon: <Zap size={20} className="text-foreground" />,
    title: "Lightning Fast Engine",
    description: "Built for speed. Experience zero friction when scaling your operations to thousands of users."
  },
  {
    icon: <ShieldCheck size={20} className="text-foreground" />,
    title: "Enterprise Grade Security",
    description: "Enterprise-grade security ensures your community data is protected and accessible 24/7."
  }
];

const STATS = [
  { label: "Active Communities", value: "2,000+" },
  { label: "Volunteers Managed", value: "1.5M" },
  { label: "Hours Tracked", value: "45M+" },
  { label: "Platform Uptime", value: "99.99%" }
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* SaaS Gradient Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[25%] -left-[10%] w-[70%] h-[70%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[15%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 flex flex-col items-center">
        {/* HERO SECTION */}
        <section className="w-full flex flex-col items-center justify-center pt-32 pb-24 px-5 text-center min-h-[85vh]">
          <motion.div 
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center max-w-4xl w-full"
          >
            {/* Badge */}
            <motion.div variants={FADE_UP_SPRING}>
              <Badge variant="outline" className="mb-8 px-4 py-1.5 text-sm gap-2 backdrop-blur-md">
                <Sparkles size={14} className="text-accent" />
                <span>CommunityConnect v2.0 is live</span>
              </Badge>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={FADE_UP_SPRING}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-tight text-foreground mb-8 text-balance"
            >
              Unify Your Community.<br/>
              <span className="text-muted-foreground">Amplify Your Impact.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={FADE_UP_SPRING}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed text-balance"
            >
              The all-in-one platform designed to streamline volunteer management, foster engagement, and drive real-world change effortlessly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={FADE_UP_SPRING}
              className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto"
            >
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base">
                  Start Deploying Today
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/programs" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base">
                  Explore Features
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* LOGO CLOUD */}
        <motion.section
          variants={FADE_IN}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full py-12 border-y border-border bg-surface-hover/30 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-5 text-center flex flex-col items-center">
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground mb-8">
              Trusted by innovative organizations worldwide
            </p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {[Globe2, Building2, Heart, Users, Sparkles].map((Icon, i) => (
                <div key={i} className="flex items-center gap-3 font-heading text-xl font-bold text-foreground">
                  <Icon size={24} />
                  Organization {i + 1}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* DASHBOARD PREVIEW MOCKUP */}
        <section className="w-full py-24 px-5 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-surface/50 p-2 shadow-2xl backdrop-blur-lg"
          >
            <div className="rounded-xl overflow-hidden border border-border bg-background aspect-video flex items-center justify-center relative">
              {/* Fake dashboard UI representation */}
              <div className="absolute inset-0 flex flex-col p-6 gap-6 opacity-30 pointer-events-none">
                <div className="flex gap-4">
                  <div className="w-64 h-8 bg-border rounded-md" />
                  <div className="flex-1" />
                  <div className="w-32 h-8 bg-border rounded-md" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {[1,2,3,4].map(i => <div key={i} className="h-24 bg-border rounded-xl" />)}
                </div>
                <div className="flex-1 bg-border rounded-xl" />
              </div>
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-border">
                  <BarChart3 size={32} className="text-foreground" />
                </div>
                <p className="font-medium text-muted-foreground font-mono text-sm">Interactive Dashboard Preview</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURES GRID */}
        <section className="w-full py-24 px-5 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6 tracking-tight">Everything you need to scale</h2>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Stop juggling spreadsheets. We provide powerful, integrated tools to manage your entire community lifecycle.
            </p>
          </div>

          <motion.div 
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {FEATURES.map((feat, idx) => (
              <motion.div key={feat.title} variants={FADE_UP_SPRING}>
                <Card hoverable className="p-8 h-full flex flex-col gap-4 border-border/50 bg-surface/50">
                  <div className="w-12 h-12 rounded-lg bg-surface-hover flex items-center justify-center border border-border mb-2">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground tracking-tight">{feat.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feat.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* STATS COUNTERS */}
        <section className="w-full py-24 border-y border-border bg-background">
          <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {STATS.map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <span className="font-heading text-4xl md:text-5xl text-foreground tracking-tighter">
                    {stat.value}
                  </span>
                  <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
