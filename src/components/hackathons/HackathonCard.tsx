import React from "react";
import Link from "next/link";
import { Hackathon } from "@/types";
import { formatDate, getStatusBadge } from "@/lib/utils";
import {
  Trophy,
  Calendar,
  Users,
  Code2,
  MapPin,
  ArrowRight,
  Globe2,
} from "lucide-react";

export function HackathonCard({ hackathon }: { hackathon: Hackathon }) {
  const statusBadge = getStatusBadge(hackathon.status);

  return (
    <div className="glass-card glass-card-hover group relative flex flex-col overflow-hidden rounded-2xl">
      {/* Banner Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <img
          src={hackathon.bannerUrl}
          alt={hackathon.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${statusBadge.color}`}
          >
            {statusBadge.label}
          </span>
          <span className="flex items-center gap-1 rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-slate-300 backdrop-blur-md">
            {hackathon.format === "online" ? (
              <>
                <Globe2 className="h-3 w-3 text-cyan-400" /> Virtual
              </>
            ) : (
              <>
                <MapPin className="h-3 w-3 text-pink-400" /> {hackathon.format}
              </>
            )}
          </span>
        </div>

        {/* Prize Pool Floating Badge */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-slate-950/90 px-3 py-1 text-amber-400 shadow-md">
            <Trophy className="h-4 w-4" />
            <span className="font-bold text-sm">{hackathon.totalPrizePool}</span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 text-xs font-medium text-slate-400">
          Hosted by <span className="text-slate-200">{hackathon.organizerName}</span>
        </div>

        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-indigo-400">
          {hackathon.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs text-slate-300 leading-relaxed">
          {hackathon.tagline}
        </p>

        {/* Tracks / Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {hackathon.tracks.slice(0, 3).map((track) => (
            <span
              key={track}
              className="rounded-md border border-slate-800 bg-slate-900/80 px-2 py-0.5 text-[11px] font-medium text-slate-300"
            >
              {track}
            </span>
          ))}
          {hackathon.tracks.length > 3 && (
            <span className="rounded-md border border-slate-800 bg-slate-900/80 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
              +{hackathon.tracks.length - 3}
            </span>
          )}
        </div>

        {/* Footer info: Dates & Participants */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            <span>{formatDate(hackathon.startDate)}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-indigo-400" />
              <span>{hackathon.participantCount || 0} hackers</span>
            </div>
            {hackathon.submissionCount !== undefined && hackathon.submissionCount > 0 && (
              <div className="flex items-center gap-1">
                <Code2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>{hackathon.submissionCount} projects</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-4">
          <Link
            href={`/hackathons/${hackathon.slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800/80 py-2.5 text-xs font-semibold text-white transition-colors group-hover:bg-indigo-600"
          >
            <span>View Hackathon</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
