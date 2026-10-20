"use client";

import React, { useState } from "react";
import { useHackersDorm } from "@/context/HackersDormContext";
import { Mail, CheckCircle2, AlertCircle, X, Send, Eye, ShieldCheck, RefreshCw } from "lucide-react";

export function EmailLogsModal({ onClose }: { onClose: () => void }) {
  const { emailLogs, triggerEmailNotification, currentUser } = useHackersDorm();
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(
    emailLogs[0]?.id || null
  );
  const [testEmailAddress, setTestEmailAddress] = useState(currentUser.email);
  const [isSendingTest, setIsSendingTest] = useState(false);

  const selectedEmail = emailLogs.find((e) => e.id === selectedEmailId) || emailLogs[0];

  const handleSendTestEmail = async () => {
    setIsSendingTest(true);
    await triggerEmailNotification({
      to: testEmailAddress,
      subject: `[Test] Welcome to HackersDorm Platform!`,
      type: "registration_confirmation",
      hackathonTitle: "NexusAI Global Hackathon 2026",
      data: {
        userName: currentUser.name,
        role: "Lead Fullstack Hacker",
        startDate: "October 18, 2026",
        submissionDeadline: "October 21, 2026",
        hackathonUrl: "http://localhost:3000",
      },
    });
    setIsSendingTest(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div className="relative flex h-[85vh] w-full max-w-5xl flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Notification Outbox & Email Logs</h3>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Delivery Service Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Inspect transactional receipts, registrations, and live email template previews.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content body split view */}
        <div className="grid flex-1 grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Column: Email list */}
          <div className="border-r border-slate-800 bg-slate-950/60 p-4 md:col-span-5 flex flex-col overflow-y-auto">
            {/* Quick Test Action */}
            <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/80 p-3.5">
              <span className="block text-xs font-semibold text-slate-300 mb-1.5">
                Dispatch Test Transactional Email
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={testEmailAddress}
                  onChange={(e) => setTestEmailAddress(e.target.value)}
                  placeholder="recipient@example.com"
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={handleSendTestEmail}
                  disabled={isSendingTest}
                  className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                >
                  {isSendingTest ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                  Send
                </button>
              </div>
            </div>

            {/* Email list */}
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 px-1">
              Outgoing Email Queue ({emailLogs.length})
            </div>

            {emailLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <Mail className="h-8 w-8 text-slate-600 mb-2" />
                <p className="text-xs">No emails sent yet in this session.</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Register for a hackathon, submit a project, or click &quot;Send&quot; above!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {emailLogs.map((log) => {
                  const isSelected = selectedEmail?.id === log.id;
                  return (
                    <button
                      key={log.id}
                      onClick={() => setSelectedEmailId(log.id)}
                      className={`w-full text-left rounded-xl p-3 border transition-all ${
                        isSelected
                          ? "border-indigo-500/60 bg-indigo-500/10 text-white"
                          : "border-slate-800/80 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs truncate max-w-[200px] text-indigo-300">
                          {log.to}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {new Date(log.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="text-xs font-medium truncate mb-1 text-slate-200">
                        {log.subject}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 capitalize">
                          {log.type.replace(/_/g, " ")}
                        </span>
                        <span
                          className={`text-[10px] font-medium ${
                            log.status === "sent" ? "text-emerald-400" : "text-amber-400"
                          }`}
                        >
                          &bull; {log.status === "sent" ? "Delivered" : "Simulated"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Email Preview */}
          <div className="flex flex-col md:col-span-7 bg-slate-900 p-6 overflow-y-auto">
            {selectedEmail ? (
              <div className="flex flex-col h-full">
                <div className="border-b border-slate-800 pb-4 mb-4">
                  <div className="text-xs text-slate-400 mb-1">Subject</div>
                  <h4 className="text-base font-bold text-white mb-2">{selectedEmail.subject}</h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500">To:</span> {selectedEmail.to}
                    </div>
                    <div>
                      <span className="text-slate-500">From:</span> HackersDorm Notifications &lt;notifications@hackersdorm.com&gt;
                    </div>
                    <div>
                      <span className="text-slate-500">Sent:</span> {new Date(selectedEmail.sentAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* HTML Render Container */}
                <div className="flex-1 rounded-xl border border-slate-800 bg-dark-950 p-2 overflow-auto">
                  <div
                    dangerouslySetInnerHTML={{ __html: selectedEmail.contentPreview }}
                    className="email-render-preview"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center text-slate-500 text-sm">
                Select an email from the left pane to view rendered template preview.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
