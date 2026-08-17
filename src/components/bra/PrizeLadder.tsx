import { money } from "@/lib/bra/store";
import { cn } from "@/lib/utils";

export function PrizeLadder({
  ladder,
  currentIndex,
  className,
}: {
  ladder: number[];
  currentIndex: number;
  className?: string;
}) {
  return (
    <div className={cn("panel rounded-lg p-2", className)}>
      <p className="px-2 pb-2 pt-1 font-display text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        Escalera
      </p>
      <ol className="flex flex-col-reverse gap-1">
        {ladder.map((value, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          const milestone = (i + 1) % 5 === 0;
          return (
            <li
              key={i}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-1.5 text-sm transition-all duration-300",
                active && "animate-pulse-glow bg-[image:var(--gradient-red)] font-semibold text-primary-foreground",
                !active && done && "text-muted-foreground line-through decoration-primary/60",
                !active && !done && (milestone ? "text-foreground" : "text-muted-foreground"),
              )}
            >
              <span className="font-display text-xs tabular-nums opacity-70">{i + 1}</span>
              <span className={cn("font-display tabular-nums tracking-wide", milestone && !active && "text-primary")}>
                {money(value)}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
