import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("hackathons").order("desc").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("hackathons")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getById = query({
  args: { id: v.id("hackathons") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    tagline: v.string(),
    description: v.string(),
    bannerUrl: v.string(),
    logoUrl: v.optional(v.string()),
    organizerName: v.string(),
    organizerEmail: v.string(),
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("hackathons", {
      ...args,
      participantCount: 0,
      submissionCount: 0,
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("hackathons"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
