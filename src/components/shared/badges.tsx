import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    Ongoing: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    Successful: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    Resolved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    Verified: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    Completed: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
    Approved: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
    Pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    InProgress: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    "In Discussion": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    "In Progress": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    Upcoming: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    Planned: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    Failed: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    Inactive: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    Closed: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    "On Hold": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    New: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
    "Follow-up": "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  };
  const normalized = status.replace(/\s+/g, "").toLowerCase();
  const key = Object.keys(colorMap).find(
    (k) => k.replace(/\s+/g, "").toLowerCase() === normalized
  );
  const cls = key ? colorMap[key] : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        cls
      )}
    >
      {status}
    </span>
  );
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string): string {
  if (!date) return "—";
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
