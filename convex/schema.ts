import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  hackathons: defineTable({
    slug: v.string(),
    title: v.string(),
    tagline: v.string(),
    description: v.string(),
    bannerUrl: v.string(),
    logoUrl: v.optional(v.string()),
    organizerName: v.string(),
    organizerEmail: v.string(),
    organizerAvatar: v.optional(v.string()),
    format: v.union(v.literal("online"), v.literal("in-person"), v.literal("hybrid")),
    location: v.optional(v.string()),
    status: v.string(),
    totalPrizePool: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    registrationDeadline: v.string(),
    submissionDeadline: v.string(),
    tracks: v.array(v.string()),
    prizes: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        description: v.string(),
        amount: v.string(),
        winnerSubmissionId: v.optional(v.string()),
      })
    ),
    judgingCriteria: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        description: v.string(),
        weight: v.number(),
        maxScore: v.number(),
      })
    ),
    schedule: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        description: v.optional(v.string()),
        timestamp: v.string(),
        type: v.union(
          v.literal("workshop"),
          v.literal("deadline"),
          v.literal("ceremony"),
          v.literal("mentorship")
        ),
      })
    ),
    rules: v.array(v.string()),
    faq: v.array(v.object({ question: v.string(), answer: v.string() })),
    minTeamSize: v.number(),
    maxTeamSize: v.number(),
    requireRepoUrl: v.boolean(),
    requireDemoVideo: v.boolean(),
    participantCount: v.optional(v.number()),
    submissionCount: v.optional(v.number()),
    featured: v.optional(v.boolean()),
    createdAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),

  submissions: defineTable({
    hackathonId: v.string(),
    teamId: v.optional(v.string()),
    userId: v.string(),
    title: v.string(),
    tagline: v.string(),
    description: v.string(),
    track: v.string(),
    builtWith: v.array(v.string()),
    logoUrl: v.optional(v.string()),
    demoVideoUrl: v.optional(v.string()),
    repoUrl: v.optional(v.string()),
    liveDemoUrl: v.optional(v.string()),
    pitchDeckUrl: v.optional(v.string()),
    teamMembers: v.array(
      v.object({
        userId: v.string(),
        name: v.string(),
        email: v.string(),
        role: v.string(),
        avatarUrl: v.optional(v.string()),
        isLeader: v.boolean(),
      })
    ),
    status: v.string(),
    votesCount: v.number(),
    averageScore: v.optional(v.number()),
    judgingComplete: v.optional(v.boolean()),
    prizeAwarded: v.optional(v.string()),
    submittedAt: v.string(),
    updatedAt: v.optional(v.string()),
  })
    .index("by_hackathon", ["hackathonId"])
    .index("by_user", ["userId"]),

  teams: defineTable({
    hackathonId: v.string(),
    name: v.string(),
    tagline: v.string(),
    joinCode: v.string(),
    lookingForSkills: v.array(v.string()),
    isRecruiting: v.boolean(),
    submissionId: v.optional(v.string()),
    members: v.array(
      v.object({
        userId: v.string(),
        name: v.string(),
        email: v.string(),
        role: v.string(),
        avatarUrl: v.optional(v.string()),
        isLeader: v.boolean(),
      })
    ),
  })
    .index("by_hackathon", ["hackathonId"])
    .index("by_join_code", ["joinCode"]),

  judgeScores: defineTable({
    hackathonId: v.string(),
    submissionId: v.string(),
    judgeId: v.string(),
    judgeName: v.string(),
    scores: v.any(), // record criteriaId -> number
    totalWeightedScore: v.number(),
    feedback: v.optional(v.string()),
    privateNotes: v.optional(v.string()),
    createdAt: v.string(),
  })
    .index("by_hackathon", ["hackathonId"])
    .index("by_submission", ["submissionId"])
    .index("by_judge_and_submission", ["judgeId", "submissionId"]),

  registrations: defineTable({
    hackathonId: v.string(),
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    role: v.string(), // "developer" | "designer" | "pm" | "ai"
    status: v.string(), // "registered" | "checked_in"
    registeredAt: v.string(),
  })
    .index("by_hackathon", ["hackathonId"])
    .index("by_user_and_hackathon", ["userId", "hackathonId"]),

  announcements: defineTable({
    hackathonId: v.string(),
    title: v.string(),
    content: v.string(),
    category: v.union(
      v.literal("general"),
      v.literal("urgent"),
      v.literal("workshop"),
      v.literal("deadline")
    ),
    createdAt: v.string(),
    sentBy: v.string(),
  }).index("by_hackathon", ["hackathonId"]),

  emailLogs: defineTable({
    hackathonId: v.optional(v.string()),
    to: v.string(),
    subject: v.string(),
    type: v.string(),
    sentAt: v.string(),
    status: v.string(),
    contentPreview: v.string(),
  }),
});
