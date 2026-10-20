import { action, mutation } from "./_generated/server";
import { v } from "convex/values";

export const logEmail = mutation({
  args: {
    hackathonId: v.optional(v.string()),
    to: v.string(),
    subject: v.string(),
    type: v.string(),
    status: v.string(),
    contentPreview: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("emailLogs", {
      ...args,
      sentAt: new Date().toISOString(),
    });
  },
});

export const sendNotificationEmail = action({
  args: {
    to: v.string(),
    subject: v.string(),
    html: v.string(),
    type: v.string(),
    hackathonId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.log(`[RESEND SIMULATION] To: ${args.to} | Subject: ${args.subject}`);
      return { success: true, simulated: true };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || "HackersDorm <notifications@hackersdorm.com>",
          to: [args.to],
          subject: args.subject,
          html: args.html,
        }),
      });

      const data = await response.json();
      return { success: response.ok, data };
    } catch (error: any) {
      console.error("Resend API error:", error);
      return { success: false, error: error.message };
    }
  },
});
