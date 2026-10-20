"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Hackathon,
  Submission,
  Team,
  JudgeScore,
  Announcement,
  EmailLog,
  UserProfile,
} from "@/types";
import {
  INITIAL_HACKATHONS,
  INITIAL_SUBMISSIONS,
  INITIAL_TEAMS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_JUDGE_SCORES,
} from "@/lib/mock-data";

interface HackersDormContextType {
  // Current user & role switcher
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  userRole: "participant" | "organizer" | "judge";
  setUserRole: (role: "participant" | "organizer" | "judge") => void;

  // Data sets
  hackathons: Hackathon[];
  submissions: Submission[];
  teams: Team[];
  announcements: Announcement[];
  judgeScores: JudgeScore[];
  emailLogs: EmailLog[];

  // Actions
  getHackathon: (idOrSlug: string) => Hackathon | undefined;
  createHackathon: (data: Omit<Hackathon, "id">) => Hackathon;
  updateHackathonStatus: (hackathonId: string, status: Hackathon["status"]) => void;
  registerForHackathon: (hackathonId: string, role?: string) => Promise<boolean>;
  submitProject: (data: Omit<Submission, "id" | "submittedAt" | "votesCount">) => Promise<Submission>;
  upvoteSubmission: (submissionId: string) => void;
  createTeam: (hackathonId: string, name: string, tagline: string, lookingForSkills: string[]) => Team;
  joinTeam: (teamId: string) => boolean;
  submitJudgeScore: (scoreData: Omit<JudgeScore, "id" | "createdAt">) => void;
  awardPrize: (submissionId: string, prizeName: string) => void;
  postAnnouncement: (hackathonId: string, title: string, content: string, category: Announcement["category"]) => void;
  triggerEmailNotification: (payload: {
    to: string;
    subject: string;
    type: EmailLog["type"];
    hackathonTitle: string;
    data: Record<string, any>;
  }) => Promise<void>;
}

const defaultUser: UserProfile = {
  id: "user-nrs-staff",
  name: "Ibrahim Sani",
  email: "i.sani@nrs.gov.ng",
  role: "participant",
  bio: "Tax Operations Specialist & Process Automation Advocate @ Nigeria Revenue Service",
  skills: ["Tax Operations", "Process Automation", "Compliance", "Python", "Service Design"],
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
};

const HackersDormContext = createContext<HackersDormContextType | undefined>(undefined);

export function HackersDormProvider({ children }: { children: React.ReactNode }) {
  const { user: clerkUser, isLoaded: isClerkLoaded, isSignedIn } = useUser();

  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultUser);
  const [userRole, setUserRole] = useState<"participant" | "organizer" | "judge">("participant");

  const [hackathons, setHackathons] = useState<Hackathon[]>(INITIAL_HACKATHONS);
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [judgeScores, setJudgeScores] = useState<JudgeScore[]>(INITIAL_JUDGE_SCORES);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Synchronize Clerk user identity
  useEffect(() => {
    if (isClerkLoaded && clerkUser && isSignedIn) {
      setCurrentUser((prev) => ({
        ...prev,
        id: clerkUser.id,
        name: clerkUser.fullName || clerkUser.username || clerkUser.firstName || "NRS Staff Member",
        email: clerkUser.primaryEmailAddress?.emailAddress || prev.email,
        avatarUrl: clerkUser.imageUrl || prev.avatarUrl,
      }));
    }
  }, [clerkUser, isClerkLoaded, isSignedIn]);

  // Hydrate from localStorage for realistic interactive persistence (version 2 with NRS hackathon)
  useEffect(() => {
    try {
      const storedHackathons = localStorage.getItem("hackersdorm_hackathons_nrs_v2");
      if (storedHackathons) {
        setHackathons(JSON.parse(storedHackathons));
      } else {
        // Clear previous dummy cache
        localStorage.removeItem("hackersdorm_hackathons");
        localStorage.removeItem("hackersdorm_submissions");
        localStorage.removeItem("hackersdorm_teams");
        localStorage.removeItem("hackersdorm_announcements");
        localStorage.removeItem("hackersdorm_scores");
        setHackathons(INITIAL_HACKATHONS);
        setSubmissions(INITIAL_SUBMISSIONS);
        setTeams(INITIAL_TEAMS);
        setAnnouncements(INITIAL_ANNOUNCEMENTS);
        setJudgeScores(INITIAL_JUDGE_SCORES);
      }

      const storedSubmissions = localStorage.getItem("hackersdorm_submissions_nrs_v2");
      if (storedSubmissions) setSubmissions(JSON.parse(storedSubmissions));

      const storedTeams = localStorage.getItem("hackersdorm_teams_nrs_v2");
      if (storedTeams) setTeams(JSON.parse(storedTeams));

      const storedAnnouncements = localStorage.getItem("hackersdorm_announcements_nrs_v2");
      if (storedAnnouncements) setAnnouncements(JSON.parse(storedAnnouncements));

      const storedScores = localStorage.getItem("hackersdorm_scores_nrs_v2");
      if (storedScores) setJudgeScores(JSON.parse(storedScores));

      const storedEmails = localStorage.getItem("hackersdorm_emails_nrs_v2");
      if (storedEmails) setEmailLogs(JSON.parse(storedEmails));

      const storedRole = localStorage.getItem("hackersdorm_role_nrs_v2");
      if (storedRole) setUserRole(storedRole as any);
    } catch {
      // ignore
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage upon mutation
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("hackersdorm_hackathons_nrs_v2", JSON.stringify(hackathons));
      localStorage.setItem("hackersdorm_submissions_nrs_v2", JSON.stringify(submissions));
      localStorage.setItem("hackersdorm_teams_nrs_v2", JSON.stringify(teams));
      localStorage.setItem("hackersdorm_announcements_nrs_v2", JSON.stringify(announcements));
      localStorage.setItem("hackersdorm_scores_nrs_v2", JSON.stringify(judgeScores));
      localStorage.setItem("hackersdorm_emails_nrs_v2", JSON.stringify(emailLogs));
      localStorage.setItem("hackersdorm_role_nrs_v2", userRole);
    } catch {
      // ignore
    }
  }, [hackathons, submissions, teams, announcements, judgeScores, emailLogs, userRole, isHydrated]);

  const getHackathon = (idOrSlug: string) => {
    return hackathons.find((h) => h.id === idOrSlug || h.slug === idOrSlug);
  };

  const createHackathon = (data: Omit<Hackathon, "id">) => {
    const newId = `hack-${Date.now()}`;
    const newHackathon: Hackathon = {
      ...data,
      id: newId,
      participantCount: 1,
      submissionCount: 0,
    };
    setHackathons((prev) => [newHackathon, ...prev]);

    triggerEmailNotification({
      to: currentUser.email,
      subject: `Hackathon Published: "${newHackathon.title}"`,
      type: "broadcast",
      hackathonTitle: newHackathon.title,
      data: {
        message: `Your hackathon "${newHackathon.title}" has been created and published on HackersDorm. Participants can now register and discover your tracks!`,
      },
    });

    return newHackathon;
  };

  const updateHackathonStatus = (hackathonId: string, status: Hackathon["status"]) => {
    setHackathons((prev) =>
      prev.map((h) => (h.id === hackathonId ? { ...h, status } : h))
    );
  };

  const registerForHackathon = async (hackathonId: string, role = "Developer"): Promise<boolean> => {
    const hack = hackathons.find((h) => h.id === hackathonId);
    if (!hack) return false;

    setHackathons((prev) =>
      prev.map((h) =>
        h.id === hackathonId ? { ...h, participantCount: (h.participantCount || 0) + 1 } : h
      )
    );

    // Fire Resend confirmation email
    await triggerEmailNotification({
      to: currentUser.email,
      subject: `Registration Confirmed: ${hack.title}`,
      type: "registration_confirmation",
      hackathonTitle: hack.title,
      data: {
        userName: currentUser.name,
        role,
        startDate: hack.startDate,
        submissionDeadline: hack.submissionDeadline,
        hackathonUrl: `/hackathons/${hack.slug}`,
      },
    });

    return true;
  };

  const submitProject = async (
    data: Omit<Submission, "id" | "submittedAt" | "votesCount">
  ): Promise<Submission> => {
    const newSubmission: Submission = {
      ...data,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      votesCount: 1,
      status: "submitted",
    };

    setSubmissions((prev) => [newSubmission, ...prev]);

    // Update submission count on hackathon
    setHackathons((prev) =>
      prev.map((h) =>
        h.id === data.hackathonId
          ? { ...h, submissionCount: (h.submissionCount || 0) + 1 }
          : h
      )
    );

    const hack = hackathons.find((h) => h.id === data.hackathonId);
    const hackTitle = hack ? hack.title : "Hackathon";

    // Trigger submission receipt via Resend
    await triggerEmailNotification({
      to: currentUser.email,
      subject: `Receipt: Project "${newSubmission.title}" submitted for ${hackTitle}!`,
      type: "submission_receipt",
      hackathonTitle: hackTitle,
      data: {
        projectTitle: newSubmission.title,
        track: newSubmission.track,
        userName: currentUser.name,
        repoUrl: newSubmission.repoUrl || "None provided",
        projectUrl: `/hackathons/${hack?.slug || hack?.id}/projects`,
      },
    });

    return newSubmission;
  };

  const upvoteSubmission = (submissionId: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId ? { ...sub, votesCount: sub.votesCount + 1 } : sub
      )
    );
  };

  const createTeam = (
    hackathonId: string,
    name: string,
    tagline: string,
    lookingForSkills: string[]
  ): Team => {
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      hackathonId,
      name,
      tagline,
      joinCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      lookingForSkills,
      isRecruiting: true,
      members: [
        {
          userId: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          role: "Team Lead",
          avatarUrl: currentUser.avatarUrl,
          isLeader: true,
        },
      ],
    };

    setTeams((prev) => [newTeam, ...prev]);
    return newTeam;
  };

  const joinTeam = (teamId: string): boolean => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return false;

    if (team.members.some((m) => m.userId === currentUser.id)) return true;

    const updatedMembers = [
      ...team.members,
      {
        userId: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: "Collaborator",
        avatarUrl: currentUser.avatarUrl,
        isLeader: false,
      },
    ];

    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, members: updatedMembers } : t))
    );

    return true;
  };

  const submitJudgeScore = (scoreData: Omit<JudgeScore, "id" | "createdAt">) => {
    const newScore: JudgeScore = {
      ...scoreData,
      id: `score-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setJudgeScores((prev) => {
      const filtered = prev.filter(
        (s) => !(s.judgeId === newScore.judgeId && s.submissionId === newScore.submissionId)
      );
      return [newScore, ...filtered];
    });

    // Update average score on submission
    setSubmissions((prev) =>
      prev.map((sub) => {
        if (sub.id === scoreData.submissionId) {
          return {
            ...sub,
            averageScore: scoreData.totalWeightedScore,
            judgingComplete: true,
          };
        }
        return sub;
      })
    );
  };

  const awardPrize = (submissionId: string, prizeName: string) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId
          ? { ...sub, prizeAwarded: prizeName, status: "winner" }
          : sub
      )
    );
  };

  const postAnnouncement = (
    hackathonId: string,
    title: string,
    content: string,
    category: Announcement["category"]
  ) => {
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      hackathonId,
      title,
      content,
      category,
      createdAt: new Date().toISOString(),
      sentBy: `${currentUser.name} (${userRole})`,
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const triggerEmailNotification = async (payload: {
    to: string;
    subject: string;
    type: EmailLog["type"];
    hackathonTitle: string;
    data: Record<string, any>;
  }) => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      const newLog: EmailLog = {
        id: `email-${Date.now()}`,
        hackathonId: payload.data?.hackathonId,
        to: payload.to,
        subject: payload.subject,
        type: payload.type,
        sentAt: new Date().toISOString(),
        status: resData.mode === "live_resend" ? "sent" : "simulated",
        contentPreview: resData.preview || payload.subject,
      };

      setEmailLogs((prev) => [newLog, ...prev]);
    } catch (e) {
      console.error("Email notification dispatch error:", e);
    }
  };

  return (
    <HackersDormContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userRole,
        setUserRole,
        hackathons,
        submissions,
        teams,
        announcements,
        judgeScores,
        emailLogs,
        getHackathon,
        createHackathon,
        updateHackathonStatus,
        registerForHackathon,
        submitProject,
        upvoteSubmission,
        createTeam,
        joinTeam,
        submitJudgeScore,
        awardPrize,
        postAnnouncement,
        triggerEmailNotification,
      }}
    >
      {children}
    </HackersDormContext.Provider>
  );
}

export function useHackersDorm() {
  const context = useContext(HackersDormContext);
  if (!context) {
    throw new Error("useHackersDorm must be used within a HackersDormProvider");
  }
  return context;
}
