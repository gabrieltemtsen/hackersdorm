"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useHackersDorm } from "@/context/HackersDormContext";
import { formatDate, getStatusBadge } from "@/lib/utils";
import { CountdownTimer } from "@/components/hackathons/CountdownTimer";
import { PrizesList } from "@/components/hackathons/PrizesList";
import { ScheduleTimeline } from "@/components/hackathons/ScheduleTimeline";
import { TeamFinder } from "@/components/teams/TeamFinder";
import { LeaderboardTable } from "@/components/judging/LeaderboardTable";
import { JudgingDashboard } from "@/components/judging/JudgingDashboard";
import { OrganizerDashboard } from "@/components/organizer/OrganizerDashboard";
import { SubmissionCard } from "@/components/submissions/SubmissionCard";
import {
  Trophy,
  Calendar,
  Users,
  Code2,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
  FileText,
  HelpCircle,
  Scale,
  Shield,
  Layers,
  Globe2,
} from "lucide-react";

export default function HackathonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const hackathonSlug = params?.id as string;

  const {
    getHackathon,
    registerForHackathon,
    currentUser,
    userRole,
    submissions,
  } = useHackersDorm();

  const hackathon = getHackathon(hackathonSlug);
  const [activeTab, setActiveTab] = useState<
    "overview" | "prizes" | "schedule" | "teams" | "projects" | "rules" | "leaderboard" | "judging" | "manage"
  >("overview");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  if (!hackathon) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">Hackathon Not Found</h2>
        <p className="mt-2 text-sm text-dark-300">
          The event you are looking for does not exist or has been relocated.
        </p>
        <Link
          href="/hackathons"
          className="mt-6 inline-block rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-dark-950 hover:bg-amber-400 transition-all"
        >
          Return to Hackathons Directory
        </Link>
      </div>
    );
  }

  const statusBadge = getStatusBadge(hackathon.status);
  const hackathonSubmissions = submissions.filter((s) => s.hackathonId === hackathon.id);

  const handleRegister = async () => {
    setIsRegistering(true);
    await registerForHackathon(hackathon.id, "Fullstack Hacker");
    setIsRegistering(false);
    setRegistered(true);
  };

  return (
    <div className="min-h-screen space-y-8 pb-20">
      {/* Hero Banner Section */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-dark-950">
        <img
          src={hackathon.bannerUrl}
          alt={hackathon.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${statusBadge.color}`}
              >
                {statusBadge.label}
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-dark-700 bg-dark-900/90 px-3 py-1 text-xs font-semibold text-dark-200">
                {hackathon.format === "online" ? (
                  <>
                    <Globe2 className="h-3 w-3 text-secondary" /> Virtual Worldwide
                  </>
                ) : (
                  <>
                    <MapPin className="h-3 w-3 text-primary" /> {hackathon.location || hackathon.format}
                  </>
                )}
              </span>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold text-primary font-mono tabular-nums">
                <Trophy className="inline h-3.5 w-3.5 mr-1" /> {hackathon.totalPrizePool} Prize Pool
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">{hackathon.title}</h1>
            <p className="mt-2 max-w-3xl text-sm sm:text-base text-dark-200 leading-relaxed">
              {hackathon.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Content & Right Sidebar Actions */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Content Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Interactive Tabs Header */}
            <div className="flex items-center gap-2 overflow-x-auto border-b border-dark-800 pb-3 scrollbar-none">
              {[
                { id: "overview", label: "Overview" },
                { id: "prizes", label: `Prizes (${hackathon.prizes.length})` },
                { id: "schedule", label: "Schedule" },
                { id: "teams", label: "Team Finder" },
                { id: "projects", label: `Projects (${hackathonSubmissions.length})` },
                { id: "leaderboard", label: "Leaderboard" },
                { id: "rules", label: "Rules & FAQ" },
                ...(userRole === "judge" || userRole === "organizer"
                  ? [{ id: "judging", label: "⚖️ Judging" }]
                  : []),
                ...(userRole === "organizer"
                  ? [{ id: "manage", label: "👑 Host Console" }]
                  : []),
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-primary text-dark-950 shadow-md shadow-primary/20"
                        : "text-dark-400 hover:bg-dark-850 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB: Overview */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-in fade-in">
                {/* About Hackathon */}
                <div className="glass-card rounded-2xl border-dark-800/80 p-6 sm:p-8 space-y-4 shadow-lg">
                  <h3 className="text-xl font-bold text-white tracking-tight">About the Event</h3>
                  <div className="whitespace-pre-line text-sm text-dark-200 leading-relaxed">
                    {hackathon.description}
                  </div>
                </div>

                {/* Tracks Overview */}
                <div className="glass-card rounded-2xl border-dark-800/80 p-6 sm:p-8 space-y-4 shadow-lg">
                  <h3 className="text-xl font-bold text-white tracking-tight">Competition Tracks</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {hackathon.tracks.map((track, i) => (
                      <div
                        key={track}
                        className="rounded-xl border border-dark-800 bg-dark-950/80 p-4 space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/20 text-primary text-xs font-mono font-bold">
                            #{i + 1}
                          </span>
                          <h4 className="text-sm font-bold text-white">{track}</h4>
                        </div>
                        <p className="text-xs text-dark-400">
                          Build focused innovations in this track to compete for bounties.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Prizes */}
            {activeTab === "prizes" && (
              <div className="animate-in fade-in">
                <PrizesList
                  prizes={hackathon.prizes}
                  totalPrizePool={hackathon.totalPrizePool}
                />
              </div>
            )}

            {/* TAB: Schedule */}
            {activeTab === "schedule" && (
              <div className="glass-card rounded-2xl border-dark-800/80 p-6 sm:p-8 animate-in fade-in shadow-lg">
                <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Event Timeline & Agenda</h3>
                <ScheduleTimeline schedule={hackathon.schedule} />
              </div>
            )}

            {/* TAB: Team Finder */}
            {activeTab === "teams" && (
              <div className="animate-in fade-in">
                <TeamFinder hackathon={hackathon} />
              </div>
            )}

            {/* TAB: Projects Gallery */}
            {activeTab === "projects" && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Submitted Projects ({hackathonSubmissions.length})
                  </h3>
                  <Link
                    href={`/hackathons/${hackathon.slug}/submit`}
                    className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-dark-950 hover:bg-amber-400 transition-all shadow-md"
                  >
                    <Send className="h-3.5 w-3.5" /> Submit Project
                  </Link>
                </div>

                {hackathonSubmissions.length === 0 ? (
                  <div className="rounded-2xl border border-dark-800 bg-dark-900/40 p-12 text-center text-dark-400">
                    <Code2 className="mx-auto h-12 w-12 text-dark-600 mb-3" />
                    <h3 className="text-base font-bold text-white">No Projects Submitted Yet</h3>
                    <p className="text-xs text-dark-400 mt-1">
                      Be the first to submit a project for this hackathon!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {hackathonSubmissions.map((sub) => (
                      <SubmissionCard key={sub.id} submission={sub} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: Leaderboard */}
            {activeTab === "leaderboard" && (
              <div className="glass-card rounded-2xl border-dark-800/80 p-6 sm:p-8 animate-in fade-in shadow-lg">
                <LeaderboardTable hackathon={hackathon} />
              </div>
            )}

            {/* TAB: Rules & FAQ */}
            {activeTab === "rules" && (
              <div className="space-y-6 animate-in fade-in">
                <div className="glass-card rounded-2xl border-dark-800/80 p-6 sm:p-8 space-y-4 shadow-lg">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 tracking-tight">
                    <FileText className="h-5 w-5 text-primary" />
                    Official Rules & Integrity
                  </h3>
                  <ul className="space-y-2 text-xs text-dark-300">
                    {hackathon.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card rounded-2xl border-dark-800/80 p-6 sm:p-8 space-y-4 shadow-lg">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 tracking-tight">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    {hackathon.faq.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-dark-800 bg-dark-950/60 p-4"
                      >
                        <h4 className="text-sm font-bold text-white">{item.question}</h4>
                        <p className="mt-1 text-xs text-dark-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Judging (Accessible in Judge / Organizer mode) */}
            {activeTab === "judging" && (
              <div className="animate-in fade-in">
                <JudgingDashboard hackathon={hackathon} />
              </div>
            )}

            {/* TAB: Host Console (Accessible in Organizer mode) */}
            {activeTab === "manage" && (
              <div className="animate-in fade-in">
                <OrganizerDashboard hackathon={hackathon} />
              </div>
            )}
          </div>

          {/* Right Sticky Sidebar: Actions & Countdown */}
          <div className="lg:col-span-4 space-y-6">
            {/* Countdown Box */}
            <CountdownTimer
              targetDate={hackathon.submissionDeadline}
              label="Submission Deadline Countdown"
              subtitle={`Ends ${formatDate(hackathon.submissionDeadline)}`}
            />

            {/* Main Action CTAs */}
            <div className="glass-card rounded-2xl border-dark-800/80 p-6 space-y-4 shadow-lg">
              <span className="block text-xs font-bold uppercase tracking-wider text-dark-400">
                Participation Actions
              </span>

              {registered ? (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 text-center text-xs font-semibold text-emerald-400">
                  ✓ You are registered for this hackathon! Confirmation sent to your email.
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={isRegistering}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-dark-950 shadow-lg shadow-primary/20 transition-all hover:bg-amber-400 active:scale-[0.98] disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isRegistering ? "Registering..." : "Register for Free"}</span>
                </button>
              )}

              {/* Direct Submit CTA */}
              <Link
                href={`/hackathons/${hackathon.slug}/submit`}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-dark-800 border border-primary/40 py-3.5 text-xs font-bold uppercase tracking-wider text-primary shadow-lg transition-all hover:bg-primary hover:text-dark-950 active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                <span>Submit Your Project</span>
              </Link>

              <div className="pt-4 border-t border-dark-800/80 text-xs text-dark-400 space-y-2.5">
                <div className="flex justify-between">
                  <span>Starts:</span>
                  <span className="text-dark-200 font-medium">{formatDate(hackathon.startDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ends:</span>
                  <span className="text-dark-200 font-medium">{formatDate(hackathon.endDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Squad Size:</span>
                  <span className="text-dark-200 font-medium font-mono tabular-nums">
                    {hackathon.minTeamSize} - {hackathon.maxTeamSize} members
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Participants:</span>
                  <span className="text-primary font-bold font-mono tabular-nums">{hackathon.participantCount || 0} enrolled</span>
                </div>
              </div>
            </div>

            {/* Organizer Card */}
            <div className="glass-card rounded-2xl border-dark-800/80 p-5 shadow-lg">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-dark-400 mb-3">
                Event Host
              </span>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-amber-600 flex items-center justify-center font-bold text-dark-950 text-sm">
                  {hackathon.organizerName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{hackathon.organizerName}</h4>
                  <span className="text-xs text-dark-400">{hackathon.organizerEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
