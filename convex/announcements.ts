import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listByHackathon = query({
  args: { hackathonId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("announcements")
      .withIndex("by_hackathon", (q) => q.eq("hackathonId", args.hackathonId))
      .order("desc")
      .collect();
  },
});

export const createAnnouncement = mutation({
  args: {
    hackathonId: v.string(),
    title: v.string(),
    content: v.string(),
    category: v.union(
      v.literal("general"),
      v.literal("urgent"),
      v.literal("workshop"),
      v.literal("deadline")
    ),
    sentBy: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("announcements", {
      ...args,
      createdAt: new Date().toISOString(),
    });
  },
});
