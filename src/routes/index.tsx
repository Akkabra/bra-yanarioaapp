import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings2, Play } from "lucide-react";
import { Particles } from "@/components/bra/Particles";
import { useBra } from "@/lib/bra/store";
import { sfx } from "@/lib/bra/audio";
import logo from "@/assets/bra-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "¿Quién quiere ser BRA-YANARIO? — Edición Sindy Marin" },
      {
        name: "description",
        content:
          "Entra al escenario de BRA-YANARIO: 15 niveles de premios, comodines, temporizador y una edición especial para Sindy Marin.",
      },
      { property: "og:title", content: "¿Quién quiere ser BRA-YANARIO?" },
      {
        property: "og:description",
        content: "Edición especial Sindy Marin. Responde, avanza y llega al millón.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { data } = useBra();
  const s = data.settings;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="stage-bg relative min-h-screen overflow-hidden">
      <Particles />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[70vh] w-[80vw] -translate-x-1/2 opacity-40"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 0%, transparent 0deg, oklch(0.58 0.24 25 / 0.22) 30deg, transparent 60deg, transparent 300deg, oklch(0.58 0.24 25 / 0.18) 330deg, transparent 360deg)",
          filter: "blur(30px)",
        }}
      />

      <Link
        to="/admin"
        className="absolute right-4 top-4 z-20 inline-flex items-center gap-2 rounded-md border border-border/70 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
      >
        <Settings2 className="h-3.5 w-3.5" /> Backstage
      </Link>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <img
          src={logo.url}
          alt="Logotipo BRA"
          className={`h-20 w-auto transition-all duration-1000 sm:h-24 ${mounted ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
          style={{ filter: "drop-shadow(0 0 40px oklch(0.58 0.24 25 / 0.7))" }}
        />

        <p className="mt-10 animate-rise font-display text-[11px] uppercase tracking-[0.5em] text-primary [animation-delay:200ms]">
          {s.subtitle}: {s.participantName}
        </p>

        <h1 className="mt-4 animate-rise font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-foreground text-glow [animation-delay:350ms] sm:text-6xl md:text-7xl">
          {s.gameName}
        </h1>

        <p className="mt-8 max-w-xl animate-rise text-balance text-base leading-relaxed text-muted-foreground [animation-delay:550ms] sm:text-lg">
          {s.welcomeMessage}
        </p>

        <div className="mt-12 animate-rise [animation-delay:750ms]">
          <Link
            to="/jugar"
            onClick={() => sfx.start()}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-md bg-[image:var(--gradient-red)] px-10 py-4 font-display text-base font-semibold uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--glow-strong)] transition-transform duration-300 hover:scale-[1.03] active:scale-100"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 w-1/3 bg-white/20 blur-md"
              style={{ animation: "bra-sweep 3.2s ease-in-out infinite" }}
            />
            <Play className="h-4 w-4" />
            Comenzar juego
          </Link>
        </div>

        <p className="mt-10 animate-rise font-display text-[10px] uppercase tracking-[0.4em] text-muted-foreground/70 [animation-delay:900ms]">
          {data.questions.filter((q) => q.active).length} preguntas · {s.ladder.length} niveles ·{" "}
          {s.lifelines.filter((l) => l.enabled).length} comodines
        </p>
      </section>
    </main>
  );
}
