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
    { name: "Nigeria Revenue Service (NRS)", icon: "🏛️" },
    { name: "Federal Ministry of Finance", icon: "🇳🇬" },
    { name: "Joint Tax Board (JTB)", icon: "⚖️" },
    { name: "NITDA", icon: "🌐" },
    { name: "Convex Cloud", icon: "⚡" },
    { name: "Resend", icon: "✉️" },
    { name: "Clerk Auth", icon: "🔒" },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 sm:pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 md:pt-20 md:pb-28">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] sm:h-[450px] w-[90vw] sm:w-[650px] rounded-full bg-gradient-to-tr from-primary/15 via-amber-600/10 to-bronze-500/10 blur-[100px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle Enterprise Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-dark-700/80 bg-dark-900/90 px-3.5 sm:px-4 py-1.5 text-xs font-semibold text-dark-200 shadow-inner mb-6 backdrop-blur-md max-w-[95%] text-left sm:text-center">
            <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse shrink-0" />
            <span className="truncate">NRS Internal Staff Hackathon & Innovation Challenge 2026</span>
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            Empowering Internal Talent to{" "}
            <span className="bg-gradient-to-r from-amber-200 via-primary to-amber-500 bg-clip-text text-transparent">
              Transform Revenue Administration
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-5 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-dark-200 leading-relaxed px-2">
            A level playing field featuring leveled Technical and Non-Technical Tracks. Multidisciplinary teams collaborate across IT, Tax Operations, Communications, Compliance, HR, and Legal to build working prototypes and viral taxpayer campaigns.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 px-4 sm:px-0">
            <Link
              href="/hackathons"
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-dark-950 shadow-lg shadow-primary/20 transition-all hover:bg-amber-400 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore NRS Challenge</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-dark-950" />
            </Link>

            <Link
              href="/create"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-dark-700 bg-dark-900/80 px-8 py-3.5 text-sm font-semibold text-dark-200 transition-all hover:border-primary/50 hover:bg-dark-850 hover:text-white"
            >
              <Rocket className="h-4 w-4 text-primary" />
              <span>Host Directorate Sprint</span>
            </Link>
          </div>

          {/* Metrics Row */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto border-t border-dark-800/80 pt-8 sm:pt-10 text-left">
            <div className="rounded-xl border border-dark-800/80 bg-dark-900/40 p-3.5 sm:p-4 shadow-sm backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">₦6,500,000</div>
              <div className="text-[11px] sm:text-xs text-dark-400 mt-0.5">Cash Awards Pool</div>
            </div>
            <div className="rounded-xl border border-dark-800/80 bg-dark-900/40 p-3.5 sm:p-4 shadow-sm backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-primary tabular-nums">2 Divisions</div>
              <div className="text-[11px] sm:text-xs text-dark-400 mt-0.5">Tech & Non-Tech Tracks</div>
            </div>
            <div className="rounded-xl border border-dark-800/80 bg-dark-900/40 p-3.5 sm:p-4 shadow-sm backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-secondary tabular-nums">Dec 14–18</div>
              <div className="text-[11px] sm:text-xs text-dark-400 mt-0.5">Sprint & Abuja Finale</div>
            </div>
            <div className="rounded-xl border border-dark-800/80 bg-dark-900/40 p-3.5 sm:p-4 shadow-sm backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300 tabular-nums">3–5 Staff</div>
              <div className="text-[11px] sm:text-xs text-dark-400 mt-0.5">Squad Team Limit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Ecosystem Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-dark-800/80 bg-dark-900/40 p-5 sm:p-6 text-center backdrop-blur-sm">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-dark-400 block mb-3 sm:mb-4">
            Under the Distinguished Auspices of Management & Executive Chairman
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 opacity-80 transition-all">
            {sponsors.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-dark-300 font-semibold text-xs sm:text-sm">
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hackathons Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Active Challenge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Innovation Sprints
            </h2>
            <p className="text-xs sm:text-sm text-dark-300 mt-1">
              Explore the leveled technical and non-technical challenge tracks, form multidisciplinary squads, and submit projects.
            </p>
          </div>

          <Link
            href="/hackathons"
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-amber-400 transition-colors shrink-0"
          >
            <span>View All Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link
            href="/hackathons"
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-amber-400 transition-colors"
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
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Comprehensive Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            Engineered for Flawless Execution
          </h2>
          <p className="text-xs sm:text-sm text-dark-300 mt-2">
            Every layer of the platform is designed to eliminate organizer friction and give developers the best possible shipping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-card rounded-2xl border-dark-800/80 p-6 space-y-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Seamless Multi-Step Submission</h3>
            <p className="text-xs text-dark-300 leading-relaxed">
              Guided 4-step wizard with built-in GitHub repository verification, video demo embed support, interactive tech stack tags, squad attribution, and instant celebration.
            </p>
            <ul className="text-xs text-dark-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary" /> Automated draft state preservation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary" /> Instant timestamped email proof of submission
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-2xl border-dark-800/80 p-6 space-y-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-primary border border-primary/20">
              <Scale className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Weighted Rubric Judging</h3>
            <p className="text-xs text-dark-300 leading-relaxed">
              Custom scoring dimensions (Innovation, Technical Execution, UI/UX, Impact) with custom weight percentages, private deliberation notes, and Olympic average score calculations.
            </p>
            <ul className="text-xs text-dark-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Blind scoring & tie-breaker algorithms
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Real-time leaderboard synchronization
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-2xl border-dark-800/80 p-6 space-y-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Squad Teammate Finder</h3>
            <p className="text-xs text-dark-300 leading-relaxed">
              Connect solo hackers with teams looking for specific competencies. Generate 6-digit squad join codes and enforce team size minimums and maximums.
            </p>
            <ul className="text-xs text-dark-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary" /> Skill-based matchmaking filters
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary" /> 1-click squad join and invite codes
              </li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="glass-card rounded-2xl border-dark-800/80 p-6 space-y-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Host Command Console</h3>
            <p className="text-xs text-dark-300 leading-relaxed">
              Complete control over the hackathon lifecycle. Transition from registration to live hacking, lock submissions, dispatch broadcasts, and export full JSON/CSV datasets.
            </p>
          </div>

          {/* Card 5 */}
          <div className="glass-card rounded-2xl border-dark-800/80 p-6 space-y-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Sub-Second Live Reactivity</h3>
            <p className="text-xs text-dark-300 leading-relaxed">
              Real-time reactive state updates ensure that when a judge scores a project or an organizer makes a broadcast announcement, all participants see it immediately.
            </p>
          </div>

          {/* Card 6 */}
          <div className="glass-card rounded-2xl border-dark-800/80 p-6 space-y-4 shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Public Showcase Gallery</h3>
            <p className="text-xs text-dark-300 leading-relaxed">
              Permanent project profiles with embedded video walkthroughs, repository links, community upvotes, track tags, and winner ribbons for portfolio showcase.
            </p>
          </div>
        </div>
      </section>

      {/* Host CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-dark-900 via-dark-950 to-dark-900 p-8 sm:p-12 text-center md:text-left shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Ready to Organize Your Competition?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
                Launch Your Hackathon on HackersDorm
              </h2>
              <p className="text-xs sm:text-sm text-dark-300 mt-2 leading-relaxed">
                Configure your prize tracks, establish custom judging rubrics, and deliver a seamless submission experience for your builders.
              </p>
            </div>

            <Link
              href="/create"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-dark-950 shadow-lg shadow-primary/25 transition-all hover:bg-amber-400 hover:scale-105"
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
