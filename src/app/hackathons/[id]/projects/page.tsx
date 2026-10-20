"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useHackersDorm } from "@/context/HackersDormContext";
import { SubmissionCard } from "@/components/submissions/SubmissionCard";
import { ArrowLeft, Code2, Search, Send, Trophy } from "lucide-react";

export default function HackathonProjectsGalleryPage() {
  const params = useParams();
  const hackathonSlug = params?.id as string;
  const { getHackathon, submissions } = useHackersDorm();

  const hackathon = getHackathon(hackathonSlug);
  const [search, setSearch] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");

  if (!hackathon) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white">Hackathon Not Found</h2>
        <Link
          href="/hackathons"
          className="mt-4 inline-block rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white"
        >
          Return to Hackathons Directory
        </Link>
      </div>
    );
  }

  const hackathonSubmissions = submissions.filter((s) => s.hackathonId === hackathon.id);

  const filtered = hackathonSubmissions.filter((sub) => {
    const matchesSearch =
      sub.title.toLowerCase().includes(search.toLowerCase()) ||
      sub.tagline.toLowerCase().includes(search.toLowerCase()) ||
      sub.builtWith.some((b) => b.toLowerCase().includes(search.toLowerCase()));

    const matchesTrack = selectedTrack === "all" || sub.track === selectedTrack;

    return matchesSearch && matchesTrack;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <Link
            href={`/hackathons/${hackathon.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to {hackathon.title}</span>
          </Link>
          <h1 className="text-3xl font-black text-white">Project Showcase Gallery</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse, explore, and upvote innovative projects built during {hackathon.title}.
          </p>
        </div>

        <Link
          href={`/hackathons/${hackathon.slug}/submit`}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:scale-105 transition-all shrink-0"
        >
          <Send className="h-4 w-4" />
          <span>Submit Project</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, tagline, or tech stack..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <select
          value={selectedTrack}
          onChange={(e) => setSelectedTrack(e.target.value)}
          className="rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2.5 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All Tracks ({hackathonSubmissions.length})</option>
          {hackathon.tracks.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
          <Code2 className="mx-auto h-12 w-12 text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-white">No projects found matching query</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search keywords or track filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((sub) => (
            <SubmissionCard key={sub.id} submission={sub} />
          ))}
        </div>
      )}
    </div>
  );
}
