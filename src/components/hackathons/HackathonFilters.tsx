"use client";

import React from "react";
import { Search } from "lucide-react";

interface HackathonFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeStatus: string;
  setActiveStatus: (status: string) => void;
  selectedTrack: string;
  setSelectedTrack: (track: string) => void;
  availableTracks: string[];
}

export function HackathonFilters({
  searchQuery,
  setSearchQuery,
  activeStatus,
  setActiveStatus,
  selectedTrack,
  setSelectedTrack,
  availableTracks,
}: HackathonFiltersProps) {
  const statusTabs = [
    { id: "all", label: "All Hackathons" },
    { id: "hacking", label: "⚡ Live Hacking" },
    { id: "registering", label: "Registration Open" },
    { id: "judging", label: "In Judging" },
    { id: "ended", label: "Completed" },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar & Track Selector */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by hackathon name, tech stack, or topic..."
            className="w-full rounded-xl border border-dark-700 bg-dark-900 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Track Filter */}
        <div className="sm:w-64">
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="w-full rounded-xl border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-slate-300 focus:border-primary focus:outline-none"
          >
            <option value="all">All Tracks & Categories</option>
            {availableTracks.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Status Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {statusTabs.map((tab) => {
          const isActive = activeStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveStatus(tab.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-primary text-dark-950 font-bold shadow-md"
                  : "border border-dark-750 bg-dark-900/80 text-slate-400 hover:border-dark-700 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
