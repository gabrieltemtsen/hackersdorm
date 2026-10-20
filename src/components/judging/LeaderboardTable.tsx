"use client";

import React, { useState } from "react";
import { Hackathon } from "@/types";
import { useHackersDorm } from "@/context/HackersDormContext";
import { Trophy, Star, Heart, Award, ArrowRight, ExternalLink } from "lucide-react";

export function LeaderboardTable({ hackathon }: { hackathon: Hackathon }) {
  const { submissions } = useHackersDorm();
  const [selectedTrack, setSelectedTrack] = useState("all");

  const hackathonSubmissions = submissions.filter((s) => s.hackathonId === hackathon.id);

  const filtered = hackathonSubmissions
    .filter((s) => selectedTrack === "all" || s.track === selectedTrack)
    .sort((a, b) => {
      // Sort by averageScore first, then votesCount
      const scoreA = a.averageScore || 0;
      const scoreB = b.averageScore || 0;
      if (scoreB !== scoreA) return scoreB - scoreA;
      return b.votesCount - a.votesCount;
    });

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 text-xs">
            🥇
          </span>
        );
      case 1:
        return (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-300/20 text-slate-300 font-bold border border-slate-400/30 text-xs">
            🥈
          </span>
        );
      case 2:
        return (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-700/20 text-amber-600 font-bold border border-amber-700/30 text-xs">
            🥉
          </span>
        );
      default:
        return (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-dark-900 border border-dark-800 text-dark-300 font-mono text-xs font-semibold">
            #{index + 1}
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Track filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Hackathon Leaderboard
          </h3>
          <p className="text-xs text-dark-300">
            Calculated from verified judge weighted scores and community recognition.
          </p>
        </div>

        <select
          value={selectedTrack}
          onChange={(e) => setSelectedTrack(e.target.value)}
          className="rounded-xl border border-dark-800 bg-dark-900 px-3 py-1.5 text-xs text-dark-200 focus:outline-none focus:border-primary/50"
        >
          <option value="all">All Tracks</option>
          {hackathon.tracks.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dark-800/80 bg-dark-900/40 p-8 text-center text-xs text-dark-400">
          No projects in this track yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-dark-800/80 bg-dark-900/40 shadow-xl backdrop-blur-sm -mx-1 sm:mx-0">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead className="border-b border-dark-800 bg-dark-950/80 text-dark-300 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3.5 pl-4 pr-2">Rank</th>
                <th className="py-3.5 px-4">Project</th>
                <th className="py-3.5 px-4">Track</th>
                <th className="py-3.5 px-4 text-center">Judge Score</th>
                <th className="py-3.5 px-4 text-center">Community Votes</th>
                <th className="py-3.5 pr-4 text-right">Award</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800/60 font-sans">
              {filtered.map((sub, idx) => (
                <tr key={sub.id} className="hover:bg-dark-850/50 transition-colors">
                  <td className="py-4 pl-4 pr-2">{getRankBadge(idx)}</td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-white text-sm tracking-tight">{sub.title}</div>
                    <div className="text-[11px] text-dark-300 line-clamp-1 max-w-md">
                      {sub.tagline}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="rounded-md bg-dark-800/80 border border-dark-700/80 px-2 py-0.5 text-[11px] font-medium text-dark-200">
                      {sub.track}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {sub.averageScore ? (
                      <span className="font-mono text-sm font-bold text-primary tabular-nums">
                        {sub.averageScore.toFixed(1)} / 10
                      </span>
                    ) : (
                      <span className="text-dark-500 italic">Pending</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center gap-1 font-bold text-rose-400/90 font-mono text-xs">
                      <Heart className="h-3.5 w-3.5 fill-rose-500" />
                      {sub.votesCount}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    {sub.prizeAwarded ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/30 px-2.5 py-1 text-[11px] font-bold text-primary">
                        <Award className="h-3 w-3" /> {sub.prizeAwarded}
                      </span>
                    ) : (
                      <span className="text-dark-600">&mdash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
