"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useHackersDorm } from "@/context/HackersDormContext";
import { SubmissionWizard } from "@/components/submissions/SubmissionWizard";
import { ArrowLeft, Rocket } from "lucide-react";

export default function SubmitProjectPage() {
  const params = useParams();
  const hackathonSlug = params?.id as string;
  const { getHackathon } = useHackersDorm();

  const hackathon = getHackathon(hackathonSlug);

  if (!hackathon) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">Hackathon Not Found</h2>
        <Link
          href="/hackathons"
          className="mt-4 inline-block rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-dark-950 hover:bg-amber-400 transition-all shadow-md"
        >
          Return to Hackathons Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button & Breadcrumb */}
      <div>
        <Link
          href={`/hackathons/${hackathon.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-dark-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {hackathon.title}</span>
        </Link>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-inner">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Submit Your Project</h1>
            <p className="text-xs text-dark-300">
              Targeting: <span className="text-primary font-bold">{hackathon.title}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 4-Step Interactive Submission Wizard */}
      <SubmissionWizard hackathon={hackathon} />
    </div>
  );
}
