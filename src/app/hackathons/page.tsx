"use client";

import React, { useState } from "react";
import { useHackersDorm } from "@/context/HackersDormContext";
import { HackathonCard } from "@/components/hackathons/HackathonCard";
import { HackathonFilters } from "@/components/hackathons/HackathonFilters";
import { Trophy, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function HackathonsDirectoryPage() {
  const { hackathons } = useHackersDorm();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [selectedTrack, setSelectedTrack] = useState("all");

  const allTracks = Array.from(new Set(hackathons.flatMap((h) => h.tracks)));

  const filteredHackathons = hackathons.filter((h) => {
    // Search match
    const matchesSearch =
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.tracks.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    // Status match
    const matchesStatus =
      activeStatus === "all" ||
      (activeStatus === "hacking" && h.status === "hacking") ||
      (activeStatus === "registering" && h.status === "registering") ||
      (activeStatus === "judging" && (h.status === "judging" || h.status === "submission_closed")) ||
      (activeStatus === "ended" && h.status === "ended");

    // Track match
    const matchesTrack =
      selectedTrack === "all" || h.tracks.includes(selectedTrack);

    return matchesSearch && matchesStatus && matchesTrack;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-dark-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Explore Hackathons</h1>
          <p className="text-xs sm:text-sm text-dark-300 mt-1">
            Discover global online and in-person hackathons, join squads, and submit your projects.
          </p>
        </div>

        <Link
          href="/create"
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-dark-950 transition-all hover:bg-amber-400 shrink-0 shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Host a Hackathon</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <HackathonFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
        availableTracks={allTracks}
      />

      {/* Grid of Results */}
      {filteredHackathons.length === 0 ? (
        <div className="rounded-2xl border border-dark-800 bg-dark-900/40 p-12 text-center text-dark-400">
          <Trophy className="mx-auto h-12 w-12 text-dark-600 mb-3" />
          <h3 className="text-base font-bold text-white">No hackathons matched your filters</h3>
          <p className="text-xs text-dark-500 mt-1">
            Try resetting your search query or switching to &ldquo;All Hackathons&rdquo;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      )}
    </div>
  );
}
