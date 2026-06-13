"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { Users, UserCheck, Mail, Target, Lock, Eye, EyeOff, RefreshCw, Search, ChevronLeft, ChevronRight, Activity, AlertCircle, SearchX } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { FADE_UP_SPRING, FADE_IN, STAGGER_CONTAINER } from "@/lib/animations";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin2024";
const COLORS = ["#000000", "#3291FF", "#7928CA", "#F5A623", "#FF0080", "#50E3C2"];

interface Volunteer {
  id: number;
  name: string;
  email: string;
  area_of_interest: string;
  created_at: string;
}

interface DashboardStats {
  monthly_registrations: { name: string; volunteers: number }[];
  program_distribution: { name: string; value: number }[];
  recent_activity: Volunteer[];
}

interface KPIStats {
  total_volunteers: number;
  active_programs: number;
  contact_requests: number;
}

// Custom hook for animated counting
function AnimatedCounter({ value }: { value: number | string }) {
  const numValue = typeof value === "string" ? parseInt(value.toString().replace(/,/g, '')) || 0 : value;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(displayValue, numValue, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.floor(v)),
    });
    return controls.stop;
  }, [numValue]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [pwdError, setPwdError] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [kpis, setKpis] = useState<KPIStats | null>(null);

  // Table state
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const [statsRes, kpiRes] = await Promise.all([
        fetch(`${API_URL}/api/dashboard-stats.php`),
        fetch(`${API_URL}/api/stats.php`)
      ]);

      const statsData = await statsRes.json();
      const kpiData = await kpiRes.json();

      if (statsData.success && kpiData.success) {
        setStats(statsData.data);
        setKpis(kpiData.data);
      } else {
        setError("Failed to fetch dashboard data.");
      }
    } catch {
      setError("Cannot connect to backend. Make sure PHP server is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwdError("");
    } else {
      setPwdError("Incorrect admin password.");
    }
  };

  const filteredActivity = useMemo(() => {
    if (!stats?.recent_activity) return [];
    if (!searchQuery) return stats.recent_activity;
    const lowerQuery = searchQuery.toLowerCase();
    return stats.recent_activity.filter(
      v => v.name.toLowerCase().includes(lowerQuery) || 
           v.email.toLowerCase().includes(lowerQuery) || 
           (v.area_of_interest && v.area_of_interest.toLowerCase().includes(lowerQuery))
    );
  }, [stats, searchQuery]);

  const totalPages = Math.ceil(filteredActivity.length / itemsPerPage) || 1;
  const currentActivity = filteredActivity.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [searchQuery]);

  if (!authed) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-5 relative z-10">
          <motion.div variants={FADE_UP_SPRING} initial="hidden" animate="visible" className="w-full max-w-sm">
            <Card className="p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-surface-hover border border-border flex items-center justify-center mb-4">
                  <Lock size={20} className="text-foreground" />
                </div>
                <h1 className="font-heading text-2xl text-foreground text-center">Admin Access</h1>
                <p className="text-sm mt-1 text-muted-foreground text-center">Enter operator credentials</p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="relative">
                  <Input
                    id="dashboard-password" type={showPwd ? "text" : "password"}
                    label="Master Password" placeholder="••••••••"
                    value={pwd} onChange={(e) => setPwd(e.target.value)}
                    error={pwdError}
                  />
                  <button
                    type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <Button type="submit" className="w-full mt-2">Authenticate</Button>
              </form>
            </Card>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-5 py-24 mt-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
            <motion.h1 variants={FADE_UP_SPRING} className="font-heading text-3xl md:text-4xl tracking-tight mb-2">Operations Dashboard</motion.h1>
            <motion.p variants={FADE_UP_SPRING} className="text-muted-foreground font-mono text-sm uppercase tracking-widest flex items-center gap-2">
              <Activity size={14} className="text-success" /> Live System Metrics
            </motion.p>
          </motion.div>
          <motion.div variants={FADE_IN} initial="hidden" animate="visible">
            <Button variant="secondary" onClick={fetchData} isLoading={loading} leftIcon={<RefreshCw size={14}/>}>
              Sync Data
            </Button>
          </motion.div>
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl text-sm mb-8 bg-error/10 border border-error/20 text-error flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* KPIs */}
        <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Volunteers", value: kpis?.total_volunteers },
            { icon: UserCheck, label: "New This Month", value: stats?.monthly_registrations[stats.monthly_registrations.length-1]?.volunteers },
            { icon: Target, label: "Active Programs", value: kpis?.active_programs },
            { icon: Mail, label: "Contact Requests", value: kpis?.contact_requests },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={i} variants={FADE_UP_SPRING}>
                <Card hoverable className="p-6 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4 text-muted-foreground">
                    <span className="text-sm font-medium">{stat.label}</span>
                    <Icon size={16} />
                  </div>
                  <div className="font-heading text-3xl text-foreground">
                    {stat.value === undefined ? "—" : <AnimatedCounter value={stat.value} />}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts */}
        <motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div variants={FADE_UP_SPRING} className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="font-semibold text-sm">Volunteer Growth Trajectory</h2>
              </div>
              <div className="p-6 flex-1 min-h-[300px]">
                {stats?.monthly_registrations ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.monthly_registrations}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dx={-10} />
                      <Tooltip 
                        contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", boxShadow: "var(--shadow-md)" }}
                        itemStyle={{ color: "var(--foreground)", fontWeight: 600 }}
                      />
                      <Line type="monotone" dataKey="volunteers" stroke="var(--primary)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "var(--primary)", stroke: "var(--surface)", strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex flex-col justify-end gap-4 px-2 pb-6">
                    <Skeleton className="h-4/5 w-full rounded-xl" />
                    <div className="flex justify-between gap-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={FADE_UP_SPRING}>
            <Card className="h-full flex flex-col">
              <div className="px-6 py-4 border-b border-border">
                <h2 className="font-semibold text-sm">Program Distribution</h2>
              </div>
              <div className="p-6 flex-1 min-h-[300px]">
                {stats?.program_distribution ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.program_distribution}
                        cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value"
                      >
                        {stats.program_distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", boxShadow: "var(--shadow-md)" }}
                        itemStyle={{ color: "var(--foreground)", fontWeight: 600 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Skeleton className="w-48 h-48 rounded-full" />
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Data Table */}
        <motion.div variants={FADE_UP_SPRING} initial="hidden" animate="visible">
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-hover/30">
              <h2 className="font-semibold text-sm">Recent Volunteers Index</h2>
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text" placeholder="Search records..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg text-sm bg-surface border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-hover/50 border-b border-border text-muted-foreground">
                    <th className="px-6 py-3 text-left font-mono text-xs uppercase tracking-wider font-semibold">Name</th>
                    <th className="px-6 py-3 text-left font-mono text-xs uppercase tracking-wider font-semibold">Email</th>
                    <th className="px-6 py-3 text-left font-mono text-xs uppercase tracking-wider font-semibold">Sector</th>
                    <th className="px-6 py-3 text-left font-mono text-xs uppercase tracking-wider font-semibold">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={`skel-${i}`}>
                        <td className="px-6 py-4"><Skeleton className="h-5 w-32" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-5 w-48" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-6 w-24 rounded-full" /></td>
                        <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                      </tr>
                    ))
                  ) : currentActivity.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-16">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 rounded-2xl bg-surface-hover flex items-center justify-center mb-4">
                            <SearchX size={32} className="text-muted-foreground" />
                          </div>
                          <h3 className="font-heading text-lg text-foreground mb-2 tracking-tight">No records found</h3>
                          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                            We couldn't find any volunteers matching "{searchQuery}". Try adjusting your search query.
                          </p>
                          {searchQuery && (
                            <Button variant="outline" size="sm" className="mt-6" onClick={() => setSearchQuery("")}>
                              Clear search
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentActivity.map((v) => (
                      <tr key={v.id} className="transition-colors hover:bg-surface-hover">
                        <td className="px-6 py-4 font-medium text-foreground">{v.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{v.email}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline">{v.area_of_interest || "Unassigned"}</Badge>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-muted-foreground">
                          {new Date(v.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-3 border-t border-border flex items-center justify-between bg-surface-hover/30">
                <p className="text-xs text-muted-foreground font-mono">
                  Rows {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredActivity.length)} of {filteredActivity.length}
                </p>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                    <ChevronLeft size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
