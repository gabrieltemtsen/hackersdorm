import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getScoresByHackathon = query({
  args: { hackathonId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("judgeScores")
      .withIndex("by_hackathon", (q) => q.eq("hackathonId", args.hackathonId))
      .collect();
  },
});

export const submitJudgeScore = mutation({
  args: {
    hackathonId: v.string(),
    submissionId: v.string(),
    judgeId: v.string(),
    judgeName: v.string(),
    scores: v.any(),
    totalWeightedScore: v.number(),
    feedback: v.optional(v.string()),
    privateNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if score already exists from this judge
    const existing = await ctx.db
      .query("judgeScores")
      .withIndex("by_judge_and_submission", (q) =>
        q.eq("judgeId", args.judgeId).eq("submissionId", args.submissionId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        scores: args.scores,
        totalWeightedScore: args.totalWeightedScore,
        feedback: args.feedback,
        privateNotes: args.privateNotes,
      });
      return existing._id;
    }

    return await ctx.db.insert("judgeScores", {
      ...args,
      createdAt: new Date().toISOString(),
    });
  },
});
