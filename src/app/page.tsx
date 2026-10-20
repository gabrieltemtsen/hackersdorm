"use client";

import React from "react";
import Link from "next/link";
import { useHackersDorm } from "@/context/HackersDormContext";
import { HackathonCard } from "@/components/hackathons/HackathonCard";
import {
  Rocket,
  Code2,
  Trophy,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Layers,
  Zap,
  Globe2,
  Sliders,
  Scale,
  Award,
} from "lucide-react";

export default function HomePage() {
  const { hackathons } = useHackersDorm();

  const activeHackathons = hackathons.slice(0, 3);

  const sponsors = [
    { name: "Google Cloud", icon: "🌐" },
    { name: "Convex", icon: "⚡" },
    { name: "Resend", icon: "✉️" },
    { name: "Anthropic", icon: "🧠" },
    { name: "GitHub", icon: "🐙" },
    { name: "Vercel", icon: "▲" },
    { name: "Supabase", icon: "⚡" },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-24 md:pb-28">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[650px] rounded-full bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-pink-500/10 blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle Enterprise Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/90 px-4 py-1.5 text-xs font-semibold text-slate-300 shadow-inner mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Powering Global Tech Summits & University Hackathons</span>
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.08]">
            The Operating System for{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Modern Hackathons
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg leading-relaxed">
            Host high-impact developer competitions with custom bounty tracks, frictionless multi-step submissions, real-time reactive leaderboards, and weighted rubric judging.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/hackathons"
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Competitions</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/create"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-8 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:border-slate-600 hover:bg-slate-800"
            >
              <Rocket className="h-4 w-4 text-indigo-400" />
              <span>Host a Hackathon</span>
            </Link>
          </div>

          {/* Metrics Row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-800/80 pt-10 text-left">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
              <div className="text-2xl font-black text-white">$140,000+</div>
              <div className="text-xs text-slate-400 mt-0.5">Active Prize Bounties</div>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
              <div className="text-2xl font-black text-indigo-400">1,200+</div>
              <div className="text-xs text-slate-400 mt-0.5">Participating Engineers</div>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
              <div className="text-2xl font-black text-emerald-400">99.8%</div>
              <div className="text-xs text-slate-400 mt-0.5">On-Time Submissions</div>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
              <div className="text-2xl font-black text-pink-400">&lt; 300ms</div>
              <div className="text-xs text-slate-400 mt-0.5">Live Realtime Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Ecosystem Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 block mb-4">
            Trusted by Technology Leaders & Developer Communities
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70 grayscale transition-all hover:grayscale-0">
            {sponsors.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hackathons Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Active Sprints</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Trending Competitions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Join active sprints, discover squad mates, and compete for verified prize bounties.
            </p>
          </div>

          <Link
            href="/hackathons"
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <span>View All Competitions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeHackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      </section>

      {/* Enterprise Platform Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Comprehensive Feature Suite
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
            Engineered for Flawless Execution
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Every layer of the platform is designed to eliminate organizer friction and give developers the best possible shipping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-card rounded-2xl border-slate-800 p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Seamless Multi-Step Submission</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Guided 4-step wizard with built-in GitHub repository verification, video demo embed support, interactive tech stack tags, squad attribution, and instant celebration.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Automated draft state preservation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Instant timestamped email proof of submission
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-2xl border-slate-800 p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Scale className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Weighted Rubric Judging</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom scoring dimensions (Innovation, Technical Execution, UI/UX, Impact) with custom weight percentages, private deliberation notes, and Olympic average score calculations.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" /> Blind scoring & tie-breaker algorithms
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" /> Real-time leaderboard synchronization
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-2xl border-slate-800 p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Squad Teammate Finder</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Connect solo hackers with teams looking for specific competencies. Generate 6-digit squad join codes and enforce team size minimums and maximums.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" /> Skill-based matchmaking filters
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" /> 1-click squad join and invite codes
              </li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="glass-card rounded-2xl border-slate-800 p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Host Command Console</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete control over the hackathon lifecycle. Transition from registration to live hacking, lock submissions, dispatch broadcasts, and export full JSON/CSV datasets.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-card rounded-2xl border-slate-800 p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Sub-Second Live Reactivity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time reactive state updates ensure that when a judge scores a project or an organizer makes a broadcast announcement, all participants see it immediately.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-card rounded-2xl border-slate-800 p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Public Showcase Gallery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Permanent project profiles with embedded video walkthroughs, repository links, community upvotes, track tags, and winner ribbons for portfolio showcase.
            </p>
          </div>
        </div>
      </section>

      {/* Host CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-dark-950 p-8 sm:p-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                Ready to Organize Your Competition?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                Launch Your Hackathon on HackersDorm
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Configure your prize tracks, establish custom judging rubrics, and deliver a seamless submission experience for your builders.
              </p>
            </div>

            <Link
              href="/create"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:scale-105"
            >
              <Rocket className="h-4 w-4" />
              <span>Create Hackathon</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
