import React from "react";
import Link from "next/link";
import { Code2, Heart, ExternalLink, Sparkles, Terminal, Shield, Globe2, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-dark-750 bg-dark-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-700 via-primary to-amber-300 shadow-md border border-primary/40">
                <Code2 className="h-5 w-5 text-dark-950 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black tracking-tight text-white font-heading">
                Hackers<span className="text-primary">Dorm</span>
              </span>
            </div>
            <p className="max-w-md text-sm text-slate-400 leading-relaxed">
              The premier platform for developer hackathons, engineering summits, and technical innovation. Enabling organizers to host world-class competitions with custom bounties, real-time leaderboards, and weighted rubric judging.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 rounded-md border border-dark-700 bg-dark-900/80 px-2.5 py-1 text-slate-300">
                <Shield className="h-3.5 w-3.5 text-primary" /> Enterprise Grade Reliability
              </span>
              <span className="flex items-center gap-1.5 rounded-md border border-dark-700 bg-dark-900/80 px-2.5 py-1 text-slate-300">
                <Globe2 className="h-3.5 w-3.5 text-secondary" /> Global Participant Reach
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/hackathons" className="transition-colors hover:text-primary">
                  Browse Hackathons
                </Link>
              </li>
              <li>
                <Link href="/create" className="transition-colors hover:text-primary">
                  Host a Competition
                </Link>
              </li>
              <li>
                <Link href="/hackathons/nrs-internal-hackathon-2026/projects" className="transition-colors hover:text-primary">
                  Project Gallery
                </Link>
              </li>
              <li>
                <Link href="/hackathons/nrs-internal-hackathon-2026" className="transition-colors hover:text-primary">
                  Live Event Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Standards */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Integrity & Standards
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Verified Code Repository Auditing
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Blind Rubric Evaluation
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Cryptographic Timestamp Verification
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> Transparent Community Voting
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-dark-750 pt-8 sm:flex-row text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HackersDorm Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Notice</span>
            <span className="hover:text-slate-400 cursor-pointer">Organizer Code of Conduct</span>
            <span className="hover:text-slate-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
