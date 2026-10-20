import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listByHackathon = query({
  args: { hackathonId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("teams")
      .withIndex("by_hackathon", (q) => q.eq("hackathonId", args.hackathonId))
      .collect();
  },
});

export const getByJoinCode = query({
  args: { joinCode: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("teams")
      .withIndex("by_join_code", (q) => q.eq("joinCode", args.joinCode))
      .first();
  },
});

export const createTeam = mutation({
  args: {
    hackathonId: v.string(),
    name: v.string(),
    tagline: v.string(),
    lookingForSkills: v.array(v.string()),
    isRecruiting: v.boolean(),
    creator: v.object({
      userId: v.string(),
      name: v.string(),
      email: v.string(),
      role: v.string(),
      avatarUrl: v.optional(v.string()),
      isLeader: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    return await ctx.db.insert("teams", {
      hackathonId: args.hackathonId,
      name: args.name,
      tagline: args.tagline,
      joinCode,
      lookingForSkills: args.lookingForSkills,
      isRecruiting: args.isRecruiting,
      members: [{ ...args.creator, isLeader: true }],
    });
  },
});

export const joinTeam = mutation({
  args: {
    teamId: v.id("teams"),
    member: v.object({
      userId: v.string(),
      name: v.string(),
      email: v.string(),
      role: v.string(),
      avatarUrl: v.optional(v.string()),
      isLeader: v.boolean(),
    }),
  },
  handler: async (ctx, args) => {
    const team = await ctx.db.get(args.teamId);
    if (!team) throw new Error("Team not found");

    const alreadyJoined = team.members.some((m) => m.userId === args.member.userId);
    if (alreadyJoined) return team._id;

    await ctx.db.patch(args.teamId, {
      members: [...team.members, args.member],
    });
    return team._id;
  },
});
