"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, TrendingUp, Calendar, Lock, Eye, EyeOff, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EASE_OUT } from "@/lib/motion";

interface Volunteer {
  id: number;
  name: string;
  email: string;
  phone: string;
  skills: string;
  availability: string;
  area_of_interest: string;
  created_at: string;
}

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin2024";

const skillColors: Record<string, string> = {
  Teaching: "#4F46E5",
  Coding: "#7C3AED",
  Design: "#EC4899",
  Healthcare: "#059669",
  Legal: "#D97706",
  Marketing: "#0EA5E9",
  Photography: "#F59E0B",
};

function getSkillColor(skill: string) {
  return skillColors[skill] || "#6B7280";
}

function SkillBar({ skill, count, max }: { skill: string; count: number; max: number }) {
  const pct = Math.round((count / max) * 100);
  const color = getSkillColor(skill);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs" style={{ color: "rgba(25,40,55,0.65)" }}>
        <span className="font-medium" style={{ color: "var(--color-text)" }}>{skill}</span>
        <span>{count} volunteers</span>
      </div>
      <div className="rounded-full overflow-hidden" style={{ height: 8, background: "rgba(25,40,55,0.07)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          style={{ height: "100%", background: color, borderRadius: 9999 }}
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [pwdError, setPwdError] = useState("");
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVolunteers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_URL}/api/volunteers.php`);
      const data = await res.json();
      if (data.success) {
        setVolunteers(data.volunteers || []);
      } else {
        setError(data.message || "Failed to fetch data.");
      }
    } catch {
      setError("Cannot connect to backend. Make sure PHP server is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchVolunteers();
  }, [authed, fetchVolunteers]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwdError("");
    } else {
      setPwdError("Incorrect password. Please try again.");
    }
  };

  // Compute skill distribution
  const skillDist: Record<string, number> = {};
  volunteers.forEach((v) => {
    if (!v.skills) return;
    v.skills.split(",").forEach((s) => {
      const sk = s.trim();
      if (sk) skillDist[sk] = (skillDist[sk] || 0) + 1;
    });
  });
  const sortedSkills = Object.entries(skillDist)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  const maxSkillCount = sortedSkills[0]?.[1] || 1;

  // Recent 5
  const recent = [...volunteers].reverse().slice(0, 5);

  // Area distribution
  const areaDist: Record<string, number> = {};
  volunteers.forEach((v) => {
    if (v.area_of_interest) areaDist[v.area_of_interest] = (areaDist[v.area_of_interest] || 0) + 1;
  });

  if (!authed) {
    return (
      <div className="flex flex-col min-h-screen" style={{ background: "var(--color-bg)" }}>
        <div className="relative z-10">
          <Navbar />
        </div>
        <main className="flex-1 flex items-center justify-center px-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="w-full max-w-sm"
          >
            <div
              className="rounded-3xl p-8"
              style={{ background: "#fff", border: "1px solid rgba(25,40,55,0.1)", boxShadow: "0 8px 40px rgba(25,40,55,0.08)" }}
            >
              <div className="flex flex-col items-center mb-7">
                <div
                  className="flex items-center justify-center rounded-2xl mb-4"
                  style={{ width: 56, height: 56, background: "rgba(79,70,229,0.1)", border: "1.5px solid rgba(79,70,229,0.2)" }}
                >
                  <Lock size={24} color="#4F46E5" />
                </div>
                <h1
                  style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--color-text)", textAlign: "center" }}
                >
                  Admin Dashboard
                </h1>
                <p className="text-sm mt-1 text-center" style={{ color: "rgba(25,40,55,0.55)" }}>
                  Enter admin password to continue
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    id="dashboard-password"
                    type={showPwd ? "text" : "password"}
                    placeholder="Admin password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm pr-11 outline-none"
                    style={{
                      background: "rgba(25,40,55,0.05)",
                      border: `1.5px solid ${pwdError ? "rgba(220,38,38,0.4)" : "rgba(25,40,55,0.12)"}`,
                      color: "var(--color-text)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Toggle password visibility"
                  >
                    {showPwd ? <EyeOff size={16} color="rgba(25,40,55,0.45)" /> : <Eye size={16} color="rgba(25,40,55,0.45)" />}
                  </button>
                </div>

                {pwdError && (
                  <p className="text-xs" style={{ color: "#DC2626" }}>
                    {pwdError}
                  </p>
                )}

                <motion.button
                  id="dashboard-login-btn"
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-white font-semibold rounded-full py-3"
                  style={{ background: "#4F46E5", fontSize: "0.9rem" }}
                >
                  Access Dashboard
                </motion.button>
              </form>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-bg)" }}>
      <div className="relative z-10">
        <Navbar />
      </div>

      <main
        className="flex-1 relative z-10 py-12 px-5"
        style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "var(--color-text)",
                lineHeight: 1.1,
              }}
            >
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm" style={{ color: "rgba(25,40,55,0.55)" }}>
              VolunteerHub AI · Community Platform
            </p>
          </div>
          <motion.button
            id="dashboard-refresh"
            onClick={fetchVolunteers}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: "#fff",
              border: "1.5px solid rgba(25,40,55,0.12)",
              color: "var(--color-text)",
              boxShadow: "0 2px 8px rgba(25,40,55,0.06)",
            }}
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </motion.button>
        </div>

        {error && (
          <div
            className="px-4 py-3 rounded-xl text-sm mb-8"
            style={{ background: "rgba(220,38,38,0.08)", border: "1.5px solid rgba(220,38,38,0.2)", color: "#DC2626" }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Volunteers", value: volunteers.length, color: "#4F46E5" },
            { icon: UserCheck, label: "This Month", value: volunteers.filter((v) => new Date(v.created_at).getMonth() === new Date().getMonth()).length, color: "#059669" },
            { icon: TrendingUp, label: "Skills Offered", value: Object.keys(skillDist).length, color: "#7C3AED" },
            { icon: Calendar, label: "Active Areas", value: Object.keys(areaDist).length, color: "#D97706" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE_OUT }}
                className="rounded-2xl p-5"
                style={{ background: "#fff", border: "1px solid rgba(25,40,55,0.08)", boxShadow: "0 2px 12px rgba(25,40,55,0.05)" }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-3"
                  style={{ width: 40, height: 40, background: `${stat.color}12` }}
                >
                  <Icon size={18} color={stat.color} />
                </div>
                <p
                  style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", color: "var(--color-text)", lineHeight: 1 }}
                >
                  {loading ? "—" : stat.value}
                </p>
                <p className="mt-1 text-xs" style={{ color: "rgba(25,40,55,0.5)" }}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Registrations */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="lg:col-span-2 rounded-2xl"
            style={{ background: "#fff", border: "1px solid rgba(25,40,55,0.08)", boxShadow: "0 2px 12px rgba(25,40,55,0.05)" }}
          >
            <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(25,40,55,0.07)" }}>
              <h2 className="font-semibold" style={{ fontSize: "0.95rem", color: "var(--color-text)" }}>
                Recent Registrations
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "rgba(25,40,55,0.02)" }}>
                    {["Name", "Email", "Area", "Joined"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left font-medium"
                        style={{ color: "rgba(25,40,55,0.45)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-sm" style={{ color: "rgba(25,40,55,0.4)" }}>
                        Loading...
                      </td>
                    </tr>
                  ) : recent.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-sm" style={{ color: "rgba(25,40,55,0.4)" }}>
                        No volunteers registered yet.
                      </td>
                    </tr>
                  ) : (
                    recent.map((v) => (
                      <tr key={v.id} className="border-t transition-colors hover:bg-gray-50/60" style={{ borderColor: "rgba(25,40,55,0.06)" }}>
                        <td className="px-6 py-4 font-medium" style={{ color: "var(--color-text)" }}>{v.name}</td>
                        <td className="px-6 py-4" style={{ color: "rgba(25,40,55,0.6)" }}>{v.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ background: "rgba(79,70,229,0.1)", color: "#4F46E5" }}
                          >
                            {v.area_of_interest || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs" style={{ color: "rgba(25,40,55,0.5)" }}>
                          {new Date(v.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Skill Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="rounded-2xl"
            style={{ background: "#fff", border: "1px solid rgba(25,40,55,0.08)", boxShadow: "0 2px 12px rgba(25,40,55,0.05)" }}
          >
            <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(25,40,55,0.07)" }}>
              <h2 className="font-semibold" style={{ fontSize: "0.95rem", color: "var(--color-text)" }}>
                Skill Distribution
              </h2>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              {loading ? (
                <p className="text-sm text-center py-4" style={{ color: "rgba(25,40,55,0.4)" }}>Loading...</p>
              ) : sortedSkills.length === 0 ? (
                <p className="text-sm text-center py-4" style={{ color: "rgba(25,40,55,0.4)" }}>No skill data yet.</p>
              ) : (
                sortedSkills.map(([skill, count]) => (
                  <SkillBar key={skill} skill={skill} count={count} max={maxSkillCount} />
                ))
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
