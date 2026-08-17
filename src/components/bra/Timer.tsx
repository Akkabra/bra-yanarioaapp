import { cn } from "@/lib/utils";

export function Timer({ left, total }: { left: number; total: number }) {
  const pct = total > 0 ? Math.max(0, Math.min(1, left / total)) : 1;
  const danger = left <= 5;
  const r = 26;
  const c = 2 * Math.PI * r;

  return (
    <div className={cn("relative grid h-16 w-16 place-items-center", danger && "animate-pulse")}>
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={r} className="fill-none stroke-border" strokeWidth="4" />
        <circle
          cx="32"
          cy="32"
          r={r}
          className={cn("fill-none transition-all duration-1000 ease-linear", danger ? "stroke-primary" : "stroke-foreground/70")}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={danger ? { filter: "drop-shadow(0 0 8px var(--bra-red))" } : undefined}
        />
      </svg>
      <span
        className={cn(
          "absolute font-display text-lg tabular-nums",
          danger ? "text-primary text-glow" : "text-foreground",
        )}
      >
        {left}
      </span>
    </div>
  );
}
