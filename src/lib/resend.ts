import { Resend } from "resend";

// Resend client initialization
const resendApiKey = process.env.RESEND_API_KEY;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const SENDER_EMAIL = process.env.RESEND_FROM_EMAIL || "HackersDorm <notifications@hackersdorm.com>";

export interface EmailPayload {
  to: string;
  subject: string;
  type: 'registration_confirmation' | 'submission_receipt' | 'team_invite' | 'judge_invite' | 'winner_announcement' | 'broadcast';
  hackathonTitle: string;
  data: Record<string, any>;
}

export function generateEmailHtml(payload: EmailPayload): string {
  const { type, hackathonTitle, data } = payload;

  switch (type) {
    case 'registration_confirmation':
      return `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #131b2e; border: 1px solid #1e293b; border-radius: 12px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px;">
              <span style="font-size: 24px; font-weight: bold; color: #6366f1;">⚡ HackersDorm</span>
            </div>
            <h1 style="font-size: 24px; color: #ffffff; margin-bottom: 12px;">You're Registered for ${hackathonTitle}!</h1>
            <p style="color: #94a3b8; line-height: 1.6;">Hello <strong>${data.userName || 'Hacker'}</strong>, your spot is confirmed. Get ready to build, collaborate, and compete for the prize pool.</p>
            
            <div style="background-color: #0d1322; border: 1px solid #27354f; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <p style="margin: 4px 0; color: #cbd5e1;"><strong>Role:</strong> ${data.role || 'Participant'}</p>
              <p style="margin: 4px 0; color: #cbd5e1;"><strong>Hacking Starts:</strong> ${data.startDate || 'Check Schedule'}</p>
              <p style="margin: 4px 0; color: #cbd5e1;"><strong>Submission Deadline:</strong> ${data.submissionDeadline || 'Check Schedule'}</p>
            </div>

            <p style="color: #94a3b8; line-height: 1.6;">Next steps:</p>
            <ul style="color: #cbd5e1; padding-left: 20px; line-height: 1.8;">
              <li>Join or form a squad in the <strong>Team Finder</strong></li>
              <li>Review the track bounties and judging rubric</li>
              <li>Test your local dev environment & libraries</li>
            </ul>

            <div style="margin-top: 32px; text-align: center;">
              <a href="${data.hackathonUrl || 'http://localhost:3000'}" style="background-color: #6366f1; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">Go to Hackathon Hub</a>
            </div>

            <hr style="border: none; border-top: 1px solid #1e293b; margin: 32px 0;" />
            <p style="font-size: 12px; color: #64748b; text-align: center;">HackersDorm Platform &bull; Global Developer Competitions</p>
          </div>
        </div>
      `;

    case 'submission_receipt':
      return `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #131b2e; border: 1px solid #1e293b; border-radius: 12px; padding: 32px;">
            <div style="margin-bottom: 24px;">
              <span style="font-size: 24px; font-weight: bold; color: #10b981;">🚀 Project Submitted Successfully!</span>
            </div>
            <h2 style="font-size: 22px; color: #ffffff; margin-bottom: 8px;">"${data.projectTitle}"</h2>
            <p style="color: #94a3b8; line-height: 1.6;">Congratulations on shipping! Your project for <strong>${hackathonTitle}</strong> has been safely recorded.</p>
            
            <div style="background-color: #0d1322; border: 1px solid #10b98144; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <p style="margin: 4px 0; color: #cbd5e1;"><strong>Track:</strong> ${data.track}</p>
              <p style="margin: 4px 0; color: #cbd5e1;"><strong>Submitted By:</strong> ${data.userName}</p>
              <p style="margin: 4px 0; color: #cbd5e1;"><strong>Repository:</strong> <a href="${data.repoUrl}" style="color: #6366f1;">${data.repoUrl}</a></p>
              <p style="margin: 4px 0; color: #cbd5e1;"><strong>Submission Timestamp:</strong> ${new Date().toUTCString()}</p>
            </div>

            <p style="color: #94a3b8; font-size: 14px;">The judges will evaluate your project against the official rubric once the deadline closes. You can view your project on the Community Gallery.</p>
            
            <div style="margin-top: 28px; text-align: center;">
              <a href="${data.projectUrl || 'http://localhost:3000'}" style="background-color: #10b981; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">View Live Submission</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #1e293b; margin: 32px 0;" />
            <p style="font-size: 12px; color: #64748b; text-align: center;">HackersDorm Platform &bull; Good luck with judging!</p>
          </div>
        </div>
      `;

    case 'judge_invite':
      return `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #131b2e; border: 1px solid #1e293b; border-radius: 12px; padding: 32px;">
            <h2 style="font-size: 22px; color: #f59e0b; margin-bottom: 8px;">⚖️ Judging Portal Access: ${hackathonTitle}</h2>
            <p style="color: #cbd5e1; line-height: 1.6;">Hello ${data.judgeName}, you have been invited to evaluate submissions as an official judge.</p>
            <p style="color: #94a3b8;">Review submissions side-by-side with video demos and submit weighted rubric scores directly through our streamlined judging interface.</p>
            <div style="margin-top: 24px; text-align: center;">
              <a href="${data.judgingUrl || 'http://localhost:3000'}" style="background-color: #f59e0b; color: #000; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; display: inline-block;">Open Judging Portal</a>
            </div>
          </div>
        </div>
      `;

    default:
      return `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 30px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #131b2e; border-radius: 10px; padding: 24px;">
            <h2 style="color: #6366f1;">${hackathonTitle} Update</h2>
            <p style="color: #cbd5e1;">${data.message || data.content || ''}</p>
          </div>
        </div>
      `;
  }
}
