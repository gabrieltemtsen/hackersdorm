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
        <h2 className="text-2xl font-bold text-white">Hackathon Not Found</h2>
        <p className="mt-2 text-sm text-slate-400">
          The event you are looking for does not exist or has been relocated.
        </p>
        <Link
          href="/hackathons"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white"
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
      <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950">
        <img
          src={hackathon.bannerUrl}
          alt={hackathon.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${statusBadge.color}`}
              >
                {statusBadge.label}
              </span>
              <span className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-slate-300">
                {hackathon.format === "online" ? (
                  <>
                    <Globe2 className="h-3 w-3 text-cyan-400" /> Virtual Worldwide
                  </>
                ) : (
                  <>
                    <MapPin className="h-3 w-3 text-pink-400" /> {hackathon.location || hackathon.format}
                  </>
                )}
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">
                <Trophy className="inline h-3.5 w-3.5 mr-1" /> {hackathon.totalPrizePool} Prize Pool
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white">{hackathon.title}</h1>
            <p className="mt-2 max-w-3xl text-sm sm:text-base text-slate-300 leading-relaxed">
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
            <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-3 scrollbar-none">
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
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
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
                <div className="glass-card rounded-2xl border-slate-800 p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl font-bold text-white">About the Event</h3>
                  <div className="whitespace-pre-line text-sm text-slate-300 leading-relaxed">
                    {hackathon.description}
                  </div>
                </div>

                {/* Tracks Overview */}
                <div className="glass-card rounded-2xl border-slate-800 p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl font-bold text-white">Competition Tracks</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {hackathon.tracks.map((track, i) => (
                      <div
                        key={track}
                        className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/20 text-indigo-400 text-xs font-bold">
                            #{i + 1}
                          </span>
                          <h4 className="text-sm font-bold text-white">{track}</h4>
                        </div>
                        <p className="text-xs text-slate-400">
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
              <div className="glass-card rounded-2xl border-slate-800 p-6 sm:p-8 animate-in fade-in">
                <h3 className="text-xl font-bold text-white mb-6">Event Timeline & Agenda</h3>
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
                  <h3 className="text-xl font-bold text-white">
                    Submitted Projects ({hackathonSubmissions.length})
                  </h3>
                  <Link
                    href={`/hackathons/${hackathon.slug}/submit`}
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                  >
                    <Send className="h-3.5 w-3.5" /> Submit Project
                  </Link>
                </div>

                {hackathonSubmissions.length === 0 ? (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
                    <Code2 className="mx-auto h-12 w-12 text-slate-600 mb-3" />
                    <h3 className="text-base font-bold text-white">No Projects Submitted Yet</h3>
                    <p className="text-xs text-slate-500 mt-1">
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
              <div className="glass-card rounded-2xl border-slate-800 p-6 sm:p-8 animate-in fade-in">
                <LeaderboardTable hackathon={hackathon} />
              </div>
            )}

            {/* TAB: Rules & FAQ */}
            {activeTab === "rules" && (
              <div className="space-y-6 animate-in fade-in">
                <div className="glass-card rounded-2xl border-slate-800 p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-indigo-400" />
                    Official Rules & Integrity
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {hackathon.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card rounded-2xl border-slate-800 p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-pink-400" />
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    {hackathon.faq.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                      >
                        <h4 className="text-sm font-bold text-white">{item.question}</h4>
                        <p className="mt-1 text-xs text-slate-400 leading-relaxed">
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
            <div className="glass-card rounded-2xl border-slate-800 p-6 space-y-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
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
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-primary py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isRegistering ? "Registering..." : "Register for Free"}</span>
                </button>
              )}

              {/* Direct Submit CTA */}
              <Link
                href={`/hackathons/${hackathon.slug}/submit`}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-emerald-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                <span>Submit Your Project</span>
              </Link>

              <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-2.5">
                <div className="flex justify-between">
                  <span>Starts:</span>
                  <span className="text-slate-200 font-medium">{formatDate(hackathon.startDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ends:</span>
                  <span className="text-slate-200 font-medium">{formatDate(hackathon.endDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Squad Size:</span>
                  <span className="text-slate-200 font-medium">
                    {hackathon.minTeamSize} - {hackathon.maxTeamSize} members
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Participants:</span>
                  <span className="text-indigo-400 font-bold">{hackathon.participantCount || 0} enrolled</span>
                </div>
              </div>
            </div>

            {/* Organizer Card */}
            <div className="glass-card rounded-2xl border-slate-800 p-5">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Event Host
              </span>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
                  {hackathon.organizerName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{hackathon.organizerName}</h4>
                  <span className="text-xs text-slate-400">{hackathon.organizerEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
