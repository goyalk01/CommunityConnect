"use client";

import { motion } from "framer-motion";
import { BookOpen, Leaf, HandHeart, ArrowRight, ArrowRightCircle, Users } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FADE_UP_SPRING, FADE_IN, STAGGER_CONTAINER } from "@/lib/animations";

const programs = [
  {
    id: "education",
    icon: BookOpen,
    title: "Education Initiative",
    category: "Youth",
    status: "Active",
    color: "bg-blue-500",
    colorText: "text-blue-500",
    colorBg: "bg-blue-500/10",
    description: "Bridge the education gap by mentoring underprivileged children, running after-school programs, and delivering digital literacy workshops.",
    impact: "2,400+ students",
    capacity: 85,
    highlights: ["After-school tutoring", "Digital literacy", "Scholarship guidance"],
  },
  {
    id: "environment",
    icon: Leaf,
    title: "Environment Action",
    category: "Climate",
    status: "Urgent Need",
    color: "bg-green-500",
    colorText: "text-green-500",
    colorBg: "bg-green-500/10",
    description: "Drive sustainable change through tree plantation drives, waste management campaigns, and eco-awareness programs.",
    impact: "5,000+ trees",
    capacity: 45,
    highlights: ["Tree plantation drives", "Waste management", "Eco-awareness camps"],
  },
  {
    id: "community",
    icon: HandHeart,
    title: "Community Support",
    category: "Relief",
    status: "Active",
    color: "bg-red-500",
    colorText: "text-red-500",
    colorBg: "bg-red-500/10",
    description: "Strengthen community bonds through health camps, women empowerment initiatives, and disaster relief support.",
    impact: "3,200+ families",
    capacity: 92,
    highlights: ["Health camps", "Women empowerment", "Senior outreach"],
  },
];

export default function ProgramsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-5 pt-32 pb-24">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.h1 variants={FADE_UP_SPRING} className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight mb-6">
              Impact Programs
            </motion.h1>
            <motion.p variants={FADE_UP_SPRING} className="text-lg text-muted-foreground leading-relaxed">
              Discover our flagship initiatives designed to address the most pressing needs of our communities. Every volunteer hour creates ripples of lasting change.
            </motion.p>
          </motion.div>
          <motion.div variants={FADE_IN} initial="hidden" animate="visible">
            <div className="flex gap-2">
              <Badge variant="outline" className="px-3 py-1">All Programs</Badge>
              <Badge variant="default" className="px-3 py-1 bg-surface border-transparent">Active Only</Badge>
            </div>
          </motion.div>
        </div>

        {/* Program Cards */}
        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <motion.div key={program.id} variants={FADE_UP_SPRING}>
                <Card hoverable className="h-full flex flex-col group relative overflow-hidden bg-surface">
                  {/* Subtle top border gradient mapping to the program color */}
                  <div className={`absolute top-0 inset-x-0 h-1 opacity-50 group-hover:opacity-100 transition-opacity ${program.color}`} />
                  
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${program.colorBg} ${program.colorText}`}>
                        <Icon size={24} />
                      </div>
                      <Badge variant={program.status === "Urgent Need" ? "error" : "success"}>
                        {program.status}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">{program.category}</p>
                      <h2 className="font-heading text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {program.title}
                      </h2>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                      {program.description}
                    </p>

                    {/* Progress / Capacity Indicator */}
                    <div className="mb-8">
                      <div className="flex justify-between text-xs font-medium mb-2">
                        <span className="text-muted-foreground flex items-center gap-1.5"><Users size={14}/> Volunteer Capacity</span>
                        <span className="text-foreground">{program.capacity}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${program.capacity}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${program.color}`}
                        />
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link href="/register" className="w-full block">
                        <Button variant="outline" className="w-full justify-between group-hover:border-primary group-hover:text-primary transition-colors">
                          Join Initiative <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={FADE_IN}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <Card glass className="max-w-2xl mx-auto p-12 bg-primary/5 border-primary/10 flex flex-col items-center text-center">
            <h2 className="font-heading text-2xl md:text-3xl mb-3 text-foreground tracking-tight">Ready to make a difference?</h2>
            <p className="text-muted-foreground mb-8">Join thousands of others making a real impact every day.</p>
            <Link href="/register">
              <Button size="lg" className="px-8">
                Create Volunteer Account
              </Button>
            </Link>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
