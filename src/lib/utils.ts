import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: string | number): string {
  if (typeof amount === 'string' && amount.startsWith('$')) return amount;
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

export function getStatusBadge(status: string) {
  switch (status) {
    case 'hacking':
      return { label: 'Hacking Live', color: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' };
    case 'registering':
      return { label: 'Registration Open', color: 'bg-primary/10 text-primary border-primary/30' };
    case 'upcoming':
      return { label: 'Upcoming', color: 'bg-dark-800 text-slate-300 border-dark-700' };
    case 'submission_closed':
    case 'judging':
      return { label: 'Judging In Progress', color: 'bg-amber-950/40 text-amber-300 border-amber-500/30' };
    case 'ended':
      return { label: 'Completed', color: 'bg-dark-850 text-slate-400 border-dark-750' };
    default:
      return { label: status, color: 'bg-dark-800 text-slate-300 border-dark-700' };
  }
}

export function getTimeRemaining(targetDate: string) {
  const total = Date.parse(targetDate) - Date.now();
  const seconds = Math.max(0, Math.floor((total / 1000) % 60));
  const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
  const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
  const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
    isExpired: total <= 0,
  };
}
