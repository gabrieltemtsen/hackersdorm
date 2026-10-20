"use client";

import React, { useState } from "react";
import { Hackathon, HackathonStatus } from "@/types";
import { useHackersDorm } from "@/context/HackersDormContext";
import {
  Shield,
  Users,
  Code2,
  Trophy,
  Mail,
  Send,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export function OrganizerDashboard({ hackathon }: { hackathon: Hackathon }) {
  const {
    submissions,
    updateHackathonStatus,
    postAnnouncement,
    triggerEmailNotification,
    currentUser,
  } = useHackersDorm();

  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastCategory, setBroadcastCategory] = useState<
    "general" | "urgent" | "workshop" | "deadline"
  >("general");
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [broadcastSentSuccess, setBroadcastSentSuccess] = useState(false);

  const hackathonSubmissions = submissions.filter((s) => s.hackathonId === hackathon.id);
  const totalSubmissions = hackathonSubmissions.length;
  const scoredSubmissions = hackathonSubmissions.filter((s) => s.averageScore !== undefined).length;

  const handleStatusChange = (newStatus: HackathonStatus) => {
    updateHackathonStatus(hackathon.id, newStatus);
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject.trim() || !broadcastMessage.trim()) return;

    setIsSendingBroadcast(true);

    // 1. Post to platform live announcements banner
    postAnnouncement(
      hackathon.id,
      broadcastSubject.trim(),
      broadcastMessage.trim(),
      broadcastCategory
    );

    // 2. Dispatch email notification via Resend
    await triggerEmailNotification({
      to: currentUser.email,
      subject: `[${hackathon.title}] ${broadcastSubject.trim()}`,
      type: "broadcast",
      hackathonTitle: hackathon.title,
      data: {
        content: broadcastMessage.trim(),
        sender: currentUser.name,
      },
    });

    setIsSendingBroadcast(false);
    setBroadcastSentSuccess(true);
    setBroadcastSubject("");
    setBroadcastMessage("");
    setTimeout(() => setBroadcastSentSuccess(false), 3500);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(hackathonSubmissions, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${hackathon.slug}-submissions.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-dark-800 bg-dark-900/60 p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-dark-400 text-xs mb-2">
            <span>Registered Hackers</span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{hackathon.participantCount || 0}</div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Active participants</span>
        </div>

        <div className="rounded-2xl border border-dark-800 bg-dark-900/60 p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-dark-400 text-xs mb-2">
            <span>Projects Submitted</span>
            <Code2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{totalSubmissions}</div>
          <span className="text-[11px] text-dark-400 mt-1 block">
            {scoredSubmissions}/{totalSubmissions} evaluated
          </span>
        </div>

        <div className="rounded-2xl border border-dark-800 bg-dark-900/60 p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-dark-400 text-xs mb-2">
            <span>Bounty Pool</span>
            <Trophy className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-black text-primary font-mono">{hackathon.totalPrizePool}</div>
          <span className="text-[11px] text-dark-400 mt-1 block">Across {hackathon.prizes.length} tiers</span>
        </div>

        <div className="rounded-2xl border border-dark-800 bg-dark-900/60 p-5 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between text-dark-400 text-xs mb-2">
            <span>Lifecycle State</span>
            <Clock className="h-4 w-4 text-secondary" />
          </div>
          <div className="text-lg font-bold text-white capitalize">{hackathon.status.replace("_", " ")}</div>
          <span className="text-[11px] text-primary/80 mt-1 block">Configurable below</span>
        </div>
      </div>

      {/* Lifecycle Stage Switcher */}
      <div className="rounded-2xl border border-dark-800 bg-dark-900/80 p-6 shadow-xl backdrop-blur-sm">
        <h3 className="text-base font-bold text-white mb-2 tracking-tight">
          Hackathon Lifecycle Management
        </h3>
        <p className="text-xs text-dark-300 mb-4">
          Control participant access, submission portal availability, and when final winners are published.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: "registering", label: "Registration Open", desc: "Allow hackers to join" },
            { id: "hacking", label: "Hacking Live", desc: "Teams build & submit" },
            { id: "judging", label: "In Judging", desc: "Lock submissions & score" },
            { id: "ended", label: "Winners Published", desc: "Display awards & showcase" },
          ].map((stage) => {
            const isCurrent = hackathon.status === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => handleStatusChange(stage.id as HackathonStatus)}
                className={`text-left rounded-xl p-3 border transition-all ${
                  isCurrent
                    ? "border-primary bg-primary/10 text-white shadow-md ring-1 ring-primary"
                    : "border-dark-800 bg-dark-950/60 text-dark-400 hover:border-dark-700 hover:text-dark-200"
                }`}
              >
                <div className="font-bold text-xs">{stage.label}</div>
                <div className="text-[10px] text-dark-400 mt-0.5">{stage.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Broadcast Email & Announcements */}
      <div className="rounded-2xl border border-dark-800 bg-dark-900/80 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 tracking-tight">
              <Mail className="h-4 w-4 text-primary" />
              Broadcast Announcement to Participants
            </h3>
            <p className="text-xs text-dark-300 mt-0.5">
              Dispatches an immediate alert to all registered hackers and publishes a banner alert.
            </p>
          </div>
        </div>

        <form onSubmit={handleSendBroadcast} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-dark-300 mb-1">
                Announcement Subject *
              </label>
              <input
                type="text"
                required
                value={broadcastSubject}
                onChange={(e) => setBroadcastSubject(e.target.value)}
                placeholder="e.g. Mentor Office Hours have started in Discord Room #3!"
                className="w-full rounded-xl border border-dark-800 bg-dark-950 px-4 py-2.5 text-xs text-white placeholder-dark-500 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-300 mb-1">
                Alert Category
              </label>
              <select
                value={broadcastCategory}
                onChange={(e) => setBroadcastCategory(e.target.value as any)}
                className="w-full rounded-xl border border-dark-800 bg-dark-950 px-3 py-2.5 text-xs text-dark-300 focus:border-primary focus:outline-none"
              >
                <option value="general">General</option>
                <option value="urgent">Urgent</option>
                <option value="workshop">Workshop</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-300 mb-1">
              Broadcast Message Content *
            </label>
            <textarea
              rows={3}
              required
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Detailed instructions or link for participants..."
              className="w-full rounded-xl border border-dark-800 bg-dark-950 p-3 text-xs text-white placeholder-dark-500 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {broadcastSentSuccess ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Broadcast published and notifications dispatched!
              </span>
            ) : (
              <div />
            )}

            <button
              type="submit"
              disabled={isSendingBroadcast}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-dark-950 transition-all hover:bg-amber-400 disabled:opacity-50 shadow-md"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isSendingBroadcast ? "Broadcasting..." : "Dispatch Broadcast"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Submissions Export & Overview */}
      <div className="rounded-2xl border border-dark-800 bg-dark-900/80 p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Submissions Database ({totalSubmissions})</h3>
            <p className="text-xs text-dark-300">Review all projects submitted for this hackathon.</p>
          </div>
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 rounded-xl border border-dark-800 bg-dark-950 px-3.5 py-2 text-xs font-semibold text-dark-300 hover:text-white hover:border-dark-700 transition-colors"
          >
            <Download className="h-4 w-4 text-dark-400" />
            <span>Export Submissions JSON</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-dark-800 bg-dark-950/40 -mx-1 sm:mx-0">
          <table className="w-full min-w-[580px] text-left text-xs">
            <thead className="border-b border-dark-800 bg-dark-950 text-dark-400 font-semibold">
              <tr>
                <th className="p-3">Project Title</th>
                <th className="p-3">Track</th>
                <th className="p-3">Submitter</th>
                <th className="p-3">Score</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800 font-sans">
              {hackathonSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-dark-900/40 transition-colors">
                  <td className="p-3 font-bold text-white">{sub.title}</td>
                  <td className="p-3 text-dark-300">{sub.track}</td>
                  <td className="p-3 text-dark-400">{sub.teamMembers[0]?.name || "Solo"}</td>
                  <td className="p-3 font-mono text-primary font-bold">
                    {sub.averageScore ? `${sub.averageScore} / 10` : "Pending"}
                  </td>
                  <td className="p-3">
                    <span className="rounded bg-dark-800 border border-dark-700 px-2 py-0.5 text-[10px] font-semibold text-dark-300 capitalize">
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
