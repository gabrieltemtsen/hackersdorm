"use client";

import React, { useState } from "react";
import { Submission } from "@/types";
import { useHackersDorm } from "@/context/HackersDormContext";
import {
  Heart,
  Github,
  Video,
  Globe,
  Award,
  Users,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { SubmissionDetailModal } from "./SubmissionDetailModal";

export function SubmissionCard({ submission }: { submission: Submission }) {
  const { upvoteSubmission } = useHackersDorm();
  const [hasVoted, setHasVoted] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasVoted) {
      upvoteSubmission(submission.id);
      setHasVoted(true);
    }
  };

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="glass-card glass-card-hover group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border-slate-800/80 p-5"
      >
        <div>
          {/* Top Row: Track & Winner Badge & Upvote */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-xs font-semibold text-indigo-400">
              {submission.track}
            </span>

            <div className="flex items-center gap-2">
              {submission.prizeAwarded && (
                <span className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-bold text-amber-400">
                  <Award className="h-3 w-3" /> Winner
                </span>
              )}

              <button
                onClick={handleVote}
                className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold transition-all ${
                  hasVoted
                    ? "border-pink-500/50 bg-pink-500/20 text-pink-400"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:border-pink-500/40 hover:text-pink-400"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 ${hasVoted ? "fill-pink-500 text-pink-500" : ""}`} />
                <span>{submission.votesCount}</span>
              </button>
            </div>
          </div>

          {/* Project Title & Tagline */}
          <h3 className="text-base font-bold text-white transition-colors group-hover:text-indigo-400">
            {submission.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-slate-300 leading-relaxed">
            {submission.tagline}
          </p>

          {/* Tech Stack Pills */}
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {submission.builtWith.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded bg-slate-800/90 px-2 py-0.5 text-[10px] font-medium text-slate-300"
              >
                {tech}
              </span>
            ))}
            {submission.builtWith.length > 4 && (
              <span className="rounded bg-slate-800/90 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                +{submission.builtWith.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer: Team & Quick Links */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-slate-500" />
            <span>{submission.teamMembers.length} {submission.teamMembers.length === 1 ? 'member' : 'members'}</span>
          </div>

          <div className="flex items-center gap-2">
            {submission.repoUrl && (
              <a
                href={submission.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                title="View GitHub Repository"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {submission.demoVideoUrl && (
              <a
                href={submission.demoVideoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-cyan-400 hover:bg-slate-800"
                title="Watch Demo Video"
              >
                <Video className="h-4 w-4" />
              </a>
            )}
            {submission.liveDemoUrl && (
              <a
                href={submission.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded p-1 text-emerald-400 hover:bg-slate-800"
                title="Visit Live Application"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {showDetail && (
        <SubmissionDetailModal
          submission={submission}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
}
