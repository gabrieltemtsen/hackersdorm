export type HackathonStatus = 'draft' | 'upcoming' | 'registering' | 'hacking' | 'submission_closed' | 'judging' | 'ended';

export type HackathonFormat = 'online' | 'in-person' | 'hybrid';

export interface PrizeTrack {
  id: string;
  name: string;
  description: string;
  amount: string; // e.g. "$10,000"
  winnerSubmissionId?: string;
}

export interface JudgingCriteria {
  id: string;
  name: string;
  description: string;
  weight: number; // e.g. 25 (%)
  maxScore: number; // e.g. 10 or 5
}

export interface ScheduleItem {
  id: string;
  title: string;
  description?: string;
  timestamp: string; // ISO or human readable
  type: 'workshop' | 'deadline' | 'ceremony' | 'mentorship';
}

export interface Hackathon {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  bannerUrl: string;
  logoUrl?: string;
  organizerName: string;
  organizerEmail: string;
  organizerAvatar?: string;
  format: HackathonFormat;
  location?: string;
  status: HackathonStatus;
  totalPrizePool: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  submissionDeadline: string;
  tracks: string[]; // e.g. ["AI & Agents", "Web3 / DeFi", "Developer Tools", "Social Impact"]
  prizes: PrizeTrack[];
  judgingCriteria: JudgingCriteria[];
  schedule: ScheduleItem[];
  rules: string[];
  faq: { question: string; answer: string }[];
  minTeamSize: number;
  maxTeamSize: number;
  requireRepoUrl: boolean;
  requireDemoVideo: boolean;
  participantCount?: number;
  submissionCount?: number;
  featured?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'participant' | 'organizer' | 'judge';
  bio?: string;
  skills?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface TeamMember {
  userId: string;
  name: string;
  email: string;
  role: string; // e.g. "Lead Developer", "UI/UX Designer", "AI Specialist"
  avatarUrl?: string;
  isLeader: boolean;
}

export interface Team {
  id: string;
  hackathonId: string;
  name: string;
  tagline: string;
  joinCode: string;
  members: TeamMember[];
  lookingForSkills: string[];
  isRecruiting: boolean;
  submissionId?: string;
}

export interface SubmissionAttachment {
  id: string;
  title: string;
  url: string;
  type: 'image' | 'pdf' | 'document' | 'video';
}

export interface Submission {
  id: string;
  hackathonId: string;
  teamId?: string;
  userId: string; // Submitter
  title: string;
  tagline: string;
  description: string;
  track: string;
  builtWith: string[]; // Tech stack tags e.g. ["Next.js", "Convex", "Resend", "PyTorch"]
  logoUrl?: string;
  demoVideoUrl?: string;
  repoUrl?: string;
  liveDemoUrl?: string;
  pitchDeckUrl?: string;
  attachments?: SubmissionAttachment[];
  teamMembers: TeamMember[];
  submittedAt: string;
  updatedAt?: string;
  status: 'draft' | 'submitted' | 'under_review' | 'winner' | 'finalist';
  votesCount: number;
  averageScore?: number;
  judgingComplete?: boolean;
  prizeAwarded?: string;
}

export interface JudgeScore {
  id: string;
  hackathonId: string;
  submissionId: string;
  judgeId: string;
  judgeName: string;
  scores: Record<string, number>; // criteriaId -> score
  totalWeightedScore: number;
  feedback?: string;
  privateNotes?: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  hackathonId: string;
  title: string;
  content: string;
  category: 'general' | 'urgent' | 'workshop' | 'deadline';
  createdAt: string;
  sentBy: string;
}

export interface EmailLog {
  id: string;
  hackathonId?: string;
  to: string;
  subject: string;
  type: 'registration_confirmation' | 'submission_receipt' | 'judge_invitation' | 'winner_announcement' | 'broadcast';
  sentAt: string;
  status: 'sent' | 'simulated' | 'failed';
  contentPreview: string;
}
