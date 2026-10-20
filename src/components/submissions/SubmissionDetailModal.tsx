"use client";

import React, { useState } from "react";
import { Submission } from "@/types";
import { useHackersDorm } from "@/context/HackersDormContext";
import {
  X,
  Github,
  Video,
  Globe,
  FileText,
  Heart,
  Award,
  Users,
  ExternalLink,
  Star,
  Play,
  Layers,
  Code2,
  CheckCircle2,
} from "lucide-react";

export function SubmissionDetailModal({
  submission,
  onClose,
}: {
  submission: Submission;
  onClose: () => void;
}) {
  const { upvoteSubmission, userRole, awardPrize, judgeScores } = useHackersDorm();
  const [hasVoted, setHasVoted] = useState(false);
  const [awardInput, setAwardInput] = useState("");
  const [showAwardForm, setShowAwardForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"story" | "demo" | "team" | "scores">("story");

  const handleVote = () => {
    if (!hasVoted) {
      upvoteSubmission(submission.id);
      setHasVoted(true);
    }
  };

  const handleAssignAward = () => {
    if (awardInput.trim()) {
      awardPrize(submission.id, awardInput.trim());
      setShowAwardForm(false);
    }
  };

  const relatedScores = judgeScores.filter((s) => s.submissionId === submission.id);

  // Helper to extract YouTube video ID if applicable
  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const ytEmbed = getYouTubeEmbedUrl(submission.demoVideoUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-400">
              {submission.track}
            </span>
            {submission.prizeAwarded && (
              <span className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-0.5 text-xs font-bold text-amber-400">
                <Award className="h-3.5 w-3.5" /> {submission.prizeAwarded}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Hero title bar */}
        <div className="border-b border-slate-800 bg-slate-950/40 px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white">{submission.title}</h2>
              <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                {submission.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleVote}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                  hasVoted
                    ? "border-pink-500/60 bg-pink-500/20 text-pink-400"
                    : "border-slate-800 bg-slate-800 text-slate-300 hover:border-pink-500/40 hover:text-pink-400"
                }`}
              >
                <Heart className={`h-4 w-4 ${hasVoted ? "fill-pink-500 text-pink-500" : ""}`} />
                <span>{submission.votesCount} Upvotes</span>
              </button>

              {userRole === "organizer" && (
                <button
                  onClick={() => setShowAwardForm(!showAwardForm)}
                  className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-400 hover:bg-amber-500/20"
                >
                  👑 Award Bounty
                </button>
              )}
            </div>
          </div>

          {/* Quick Award Input for Organizers */}
          {showAwardForm && (
            <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-2">
              <span className="text-xs font-bold text-amber-400">Award Hackathon Bounty to Project:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={awardInput}
                  onChange={(e) => setAwardInput(e.target.value)}
                  placeholder="e.g. Grand Champion ($20,000) or Best Agent Track"
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500"
                />
                <button
                  onClick={handleAssignAward}
                  className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400"
                >
                  Assign Award
                </button>
              </div>
            </div>
          )}

          {/* Modal Tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-slate-800/80 pt-3">
            {[
              { id: "story", label: "Project Story & Architecture", icon: FileText },
              { id: "demo", label: "Walkthrough & Links", icon: Video },
              { id: "team", label: `Squad (${submission.teamMembers.length})`, icon: Users },
              ...(relatedScores.length > 0 ? [{ id: "scores", label: `Evaluation (${relatedScores.length})`, icon: Star }] : []),
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-slate-800 text-indigo-400 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {activeTab === "story" && (
            <div className="space-y-6 animate-in fade-in">
              {/* External Links Bar */}
              <div className="flex flex-wrap gap-2.5">
                {submission.repoUrl && (
                  <a
                    href={submission.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white"
                  >
                    <Github className="h-4 w-4 text-slate-400" />
                    <span>GitHub Repository</span>
                    <ExternalLink className="h-3 w-3 text-slate-500" />
                  </a>
                )}
                {submission.liveDemoUrl && (
                  <a
                    href={submission.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 px-3.5 py-2 text-xs font-medium text-emerald-400 hover:bg-emerald-950/40"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Live Application</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {submission.demoVideoUrl && (
                  <button
                    onClick={() => setActiveTab("demo")}
                    className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-3.5 py-2 text-xs font-medium text-cyan-400 hover:bg-cyan-950/40"
                  >
                    <Video className="h-4 w-4" />
                    <span>Watch Video Demo</span>
                  </button>
                )}
              </div>

              {/* Built with tags */}
              <div>
                <span className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                  Built With
                </span>
                <div className="flex flex-wrap gap-2">
                  {submission.builtWith.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Story Narrative */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 space-y-4">
                <span className="block text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Project Description & Architecture
                </span>
                <div className="whitespace-pre-line text-sm text-slate-300 leading-relaxed font-sans">
                  {submission.description}
                </div>
              </div>
            </div>
          )}

          {activeTab === "demo" && (
            <div className="space-y-6 animate-in fade-in">
              {ytEmbed ? (
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black aspect-video w-full shadow-2xl">
                  <iframe
                    src={ytEmbed}
                    title="Demo Walkthrough"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-none"
                  />
                </div>
              ) : submission.demoVideoUrl ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-8 text-center space-y-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Video className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Video Walkthrough Available</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                      Hosted externally at: <span className="font-mono text-cyan-400">{submission.demoVideoUrl}</span>
                    </p>
                  </div>
                  <a
                    href={submission.demoVideoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-cyan-500 shadow-md"
                  >
                    <span>Watch Video on External Site</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-500 text-xs">
                  No video demo provided for this submission.
                </div>
              )}

              {/* Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {submission.repoUrl && (
                  <a
                    href={submission.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-slate-700 text-slate-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github className="h-5 w-5 text-slate-400" />
                      <div>
                        <div className="text-xs font-bold text-white">Source Code Repository</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[200px]">{submission.repoUrl}</div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-500" />
                  </a>
                )}
                {submission.liveDemoUrl && (
                  <a
                    href={submission.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-slate-700 text-slate-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="h-5 w-5 text-emerald-400" />
                      <div>
                        <div className="text-xs font-bold text-white">Live Production App</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[200px]">{submission.liveDemoUrl}</div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-500" />
                  </a>
                )}
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-4 animate-in fade-in">
              <span className="block text-xs font-semibold uppercase text-slate-400">
                Credited Creators & Collaborators
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {submission.teamMembers.map((m) => (
                  <div
                    key={m.userId + m.name}
                    className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3.5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 font-bold text-white text-sm shadow-md">
                      {m.name.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-white truncate">{m.name}</span>
                        {m.isLeader && (
                          <span className="rounded bg-indigo-500/20 px-1.5 py-0.2 text-[9px] font-bold text-indigo-400">
                            Lead
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 truncate block mt-0.5">{m.role}</span>
                      <span className="text-[10px] text-slate-500 truncate block">{m.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "scores" && (
            <div className="space-y-4 animate-in fade-in">
              <span className="block text-xs font-semibold uppercase text-slate-400">
                Official Judging Evaluations ({relatedScores.length})
              </span>
              <div className="space-y-3">
                {relatedScores.map((score) => (
                  <div
                    key={score.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{score.judgeName}</span>
                      <span className="font-mono text-xs font-bold text-amber-400">
                        Weighted Score: {score.totalWeightedScore.toFixed(1)} / 10
                      </span>
                    </div>
                    {score.feedback && (
                      <p className="text-xs text-slate-300 italic border-l-2 border-indigo-500 pl-3 py-1">
                        &ldquo;{score.feedback}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
