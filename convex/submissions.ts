import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listByHackathon = query({
  args: { hackathonId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("submissions")
      .withIndex("by_hackathon", (q) => q.eq("hackathonId", args.hackathonId))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const submitProject = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const submissionId = await ctx.db.insert("submissions", {
      ...args,
      status: "submitted",
      votesCount: 0,
      submittedAt: new Date().toISOString(),
    });

    // Update hackathon submission count if possible
    try {
      const hackathon = await ctx.db
        .query("hackathons")
        .filter((q) => q.eq(q.field("_id"), args.hackathonId))
        .first();
      if (hackathon) {
        await ctx.db.patch(hackathon._id, {
          submissionCount: (hackathon.submissionCount || 0) + 1,
        });
      }
    } catch {
      // safe fallback
    }

    return submissionId;
  },
});

export const upvote = mutation({
  args: { id: v.id("submissions") },
  handler: async (ctx, args) => {
    const sub = await ctx.db.get(args.id);
    if (!sub) throw new Error("Submission not found");
    await ctx.db.patch(args.id, { votesCount: sub.votesCount + 1 });
  },
});

export const setAward = mutation({
  args: {
    id: v.id("submissions"),
    prizeAwarded: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      prizeAwarded: args.prizeAwarded,
      status: "winner",
    });
  },
});
