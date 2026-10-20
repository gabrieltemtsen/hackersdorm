"use client";

import React, { useState } from "react";
import { Hackathon, Team } from "@/types";
import { useHackersDorm } from "@/context/HackersDormContext";
import {
  Users,
  UserPlus,
  Copy,
  Check,
  Search,
  Sparkles,
  Shield,
  Layers,
} from "lucide-react";

export function TeamFinder({ hackathon }: { hackathon: Hackathon }) {
  const { teams, createTeam, joinTeam, currentUser } = useHackersDorm();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [skillFilter, setSkillFilter] = useState("all");

  // Create team state
  const [teamName, setTeamName] = useState("");
  const [teamTagline, setTeamTagline] = useState("");
  const [neededSkills, setNeededSkills] = useState<string[]>([
    "Frontend (Next.js)",
    "Backend (Convex)",
  ]);
  const [skillInput, setSkillInput] = useState("");

  const hackathonTeams = teams.filter((t) => t.hackathonId === hackathon.id);

  const availableSkills = Array.from(
    new Set(hackathonTeams.flatMap((t) => t.lookingForSkills))
  );

  const filteredTeams = hackathonTeams.filter((t) => {
    if (skillFilter === "all") return true;
    return t.lookingForSkills.includes(skillFilter);
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    createTeam(hackathon.id, teamName.trim(), teamTagline.trim(), neededSkills);
    setShowCreateModal(false);
    setTeamName("");
    setTeamTagline("");
  };

  const addNeededSkill = () => {
    if (skillInput.trim() && !neededSkills.includes(skillInput.trim())) {
      setNeededSkills([...neededSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-dark-800 bg-dark-900/70 p-6 shadow-xl backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="h-4 w-4" />
            <span>Teammate Matchmaking Hub</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Find Your Hackathon Squad</h3>
          <p className="text-xs text-dark-300 mt-1">
            Connect with developers, designers, and domain experts or recruit for your team. Max team size: {hackathon.maxTeamSize} members.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-dark-950 shadow-md transition-all hover:bg-amber-400 shrink-0"
        >
          <UserPlus className="h-4 w-4" />
          <span>Create a Squad</span>
        </button>
      </div>

      {/* Filter by skill */}
      {availableSkills.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-medium text-dark-400 mr-1">Looking for:</span>
          <button
            onClick={() => setSkillFilter("all")}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
              skillFilter === "all"
                ? "bg-dark-800 text-primary font-bold border border-dark-700"
                : "text-dark-400 hover:text-white"
            }`}
          >
            All Roles
          </button>
          {availableSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSkillFilter(skill)}
              className={`rounded-lg px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors ${
                skillFilter === skill
                  ? "bg-primary/20 text-primary border border-primary/40 font-bold"
                  : "bg-dark-900/60 text-dark-300 hover:text-white border border-dark-800"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      )}

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTeams.map((team) => {
          const isMember = team.members.some((m) => m.userId === currentUser.id);
          const isFull = team.members.length >= hackathon.maxTeamSize;

          return (
            <div
              key={team.id}
              className="glass-card flex flex-col justify-between rounded-2xl border-dark-800/80 p-5 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-white tracking-tight">{team.name}</h4>
                  <button
                    onClick={() => handleCopyCode(team.joinCode)}
                    className="flex items-center gap-1.5 rounded-lg bg-dark-800 border border-dark-700/80 px-2.5 py-1 text-[11px] font-mono text-dark-300 hover:text-white hover:border-dark-600 transition-colors"
                    title="Copy join code to share"
                  >
                    <span>{team.joinCode}</span>
                    {copiedCode === team.joinCode ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3 text-dark-400" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-dark-300 leading-relaxed">{team.tagline}</p>

                {/* Looking for badges */}
                {team.lookingForSkills.length > 0 && (
                  <div className="mt-4">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-dark-400 mb-1.5">
                      Actively Seeking:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {team.lookingForSkills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-amber-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Current Roster */}
                <div className="mt-4 border-t border-dark-800/80 pt-3">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-dark-400 mb-2">
                    Squad Roster ({team.members.length}/{hackathon.maxTeamSize})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {team.members.map((m) => (
                      <div
                        key={m.userId + m.name}
                        className="flex items-center gap-1.5 rounded-lg border border-dark-800 bg-dark-950 px-2.5 py-1 text-xs"
                      >
                        <div className="h-4 w-4 rounded-full bg-primary/20 text-[9px] font-bold flex items-center justify-center text-primary">
                          {m.name.charAt(0)}
                        </div>
                        <span className="text-dark-200">{m.name}</span>
                        {m.isLeader && (
                          <span className="text-[9px] font-bold text-primary">★</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-dark-800/80">
                {isMember ? (
                  <div className="w-full text-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 py-2 text-xs font-semibold text-emerald-400">
                    ✓ You are a member of this squad
                  </div>
                ) : isFull ? (
                  <div className="w-full text-center rounded-xl bg-dark-850/60 border border-dark-800/80 py-2 text-xs font-medium text-dark-400">
                    Squad is full ({hackathon.maxTeamSize} max)
                  </div>
                ) : (
                  <button
                    onClick={() => joinTeam(team.id)}
                    className="w-full rounded-xl bg-dark-800 border border-dark-700 py-2.5 text-xs font-bold text-white transition-all hover:bg-primary hover:text-dark-950 hover:border-primary"
                  >
                    Join Squad
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Team Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl border border-dark-800 bg-dark-900 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white tracking-tight">Create a New Squad</h3>
            <p className="text-xs text-dark-300 mt-1">
              Start a team for {hackathon.title} and recruit collaborators.
            </p>

            <form onSubmit={handleCreateTeamSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-dark-300 mb-1">
                  Squad Name *
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Apex Engineering"
                  className="w-full rounded-xl border border-dark-800 bg-dark-950 px-4 py-2.5 text-xs text-white placeholder-dark-500 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-dark-300 mb-1">
                  Tagline / Mission *
                </label>
                <input
                  type="text"
                  required
                  value={teamTagline}
                  onChange={(e) => setTeamTagline(e.target.value)}
                  placeholder="What is your squad building?"
                  className="w-full rounded-xl border border-dark-800 bg-dark-950 px-4 py-2.5 text-xs text-white placeholder-dark-500 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-dark-300 mb-1">
                  Skills You Need
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {neededSkills.map((s) => (
                    <span
                      key={s}
                      className="rounded bg-primary/10 border border-primary/30 px-2 py-0.5 text-xs text-primary flex items-center gap-1"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => setNeededSkills(neededSkills.filter((x) => x !== s))}
                        className="text-primary hover:text-white"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="e.g. UI/UX Designer, Distributed Systems..."
                    className="flex-1 rounded-xl border border-dark-800 bg-dark-950 px-3 py-2 text-xs text-white placeholder-dark-500 focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addNeededSkill}
                    className="rounded-xl bg-dark-800 border border-dark-700 px-4 py-2 text-xs font-semibold text-dark-200 hover:text-white"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 pt-4 border-t border-dark-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-xl border border-dark-800 bg-dark-950 px-4 py-2 text-xs font-semibold text-dark-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-dark-950 hover:bg-amber-400 shadow-md transition-all"
                >
                  Confirm & Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
