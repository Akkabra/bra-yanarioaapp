import { Phone, Users, Scissors } from "lucide-react";
import type { Lifeline } from "@/lib/bra/types";
import { cn } from "@/lib/utils";

const icons: Record<string, typeof Phone> = { "5050": Scissors, publico: Users, amigo: Phone };

export function Lifelines({
  lifelines,
  used,
  disabled,
  onUse,
}: {
  lifelines: Lifeline[];
  used: string[];
  disabled: boolean;
  onUse: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {lifelines
        .filter((l) => l.enabled)
        .map((l) => {
          const Icon = icons[l.id] ?? Users;
          const spent = used.includes(l.id);
          return (
            <button
              key={l.id}
              type="button"
              title={l.description}
              disabled={spent || disabled}
              onClick={() => onUse(l.id)}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-200",
                spent
                  ? "border-border/60 text-muted-foreground/50 line-through"
                  : "border-primary/40 text-foreground hover:-translate-y-0.5 hover:border-primary hover:shadow-[var(--glow-red)]",
                disabled && !spent && "opacity-50",
              )}
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              {l.name}
            </button>
          );
        })}
    </div>
  );
}
