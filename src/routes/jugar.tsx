import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Home, RotateCcw, Trophy, X } from "lucide-react";
import { Particles } from "@/components/bra/Particles";
import { PrizeLadder } from "@/components/bra/PrizeLadder";
import { Timer } from "@/components/bra/Timer";
import { Confetti } from "@/components/bra/Confetti";
import { Lifelines } from "@/components/bra/Lifelines";
import { money, useBra } from "@/lib/bra/store";
import { uid } from "@/lib/bra/defaults";
import { sfx } from "@/lib/bra/audio";
import type { PlayedAnswer, Question } from "@/lib/bra/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/jugar")({
  head: () => ({
    meta: [
      { title: "En vivo — ¿Quién quiere ser BRA-YANARIO?" },
      { name: "description", content: "El escenario de BRA-YANARIO: responde, usa comodines y sube la escalera de premios." },
      { property: "og:title", content: "En vivo — BRA-YANARIO" },
      { property: "og:description", content: "El concurso está en marcha. ¿Hasta dónde llegarás?" },
    ],
  }),
  component: GamePage,
});

const LETTERS = ["A", "B", "C", "D"] as const;

type Phase = "playing" | "reveal" | "over";

function GamePage() {
  const { data, addRun } = useBra();
  const s = data.settings;

  const questions = useMemo(() => {
    const list = data.questions.filter((q) => q.active).sort((a, b) => a.order - b.order);
    return list.slice(0, Math.max(1, Math.min(s.questionCount, s.ladder.length)));
  }, [data.questions, s.questionCount, s.ladder.length]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("playing");
  const [hidden, setHidden] = useState<number[]>([]);
  const [used, setUsed] = useState<string[]>([]);
  const [audience, setAudience] = useState<number[] | null>(null);
  const [friend, setFriend] = useState<string | null>(null);
  const [log, setLog] = useState<PlayedAnswer[]>([]);
  const [won, setWon] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const savedRef = useRef(false);

  const q: Question | undefined = questions[index];
  const limit = q?.timeLimit ?? s.defaultTime;
  const [left, setLeft] = useState<number>(limit ?? 0);

  useEffect(() => {
    setLeft(limit ?? 0);
  }, [index, limit]);

  const finish = useCallback(
    (didWin: boolean, entries: PlayedAnswer[], prizeIdx: number) => {
      setWon(didWin);
      setPhase("over");
      if (savedRef.current) return;
      savedRef.current = true;
      const prize = prizeIdx >= 0 ? (s.ladder[Math.min(prizeIdx, s.ladder.length - 1)] ?? 0) : 0;
      addRun({
        id: uid(),
        participantId: data.participants[0]?.id ?? null,
        participantName: s.participantName,
        date: new Date().toISOString(),
        answers: entries,
        correctCount: entries.filter((e) => e.correct).length,
        wrongCount: entries.filter((e) => !e.correct).length,
        totalSeconds: entries.reduce((a, e) => a + e.seconds, 0),
        lifelinesUsed: used,
        prize,
        result: didWin ? "ganada" : "perdida",
      });
      if (didWin) sfx.win();
      else sfx.lose();
    },
    [addRun, data.participants, s.ladder, s.participantName, used],
  );

  const answer = useCallback(
    (choice: number | null) => {
      if (!q || phase !== "playing") return;
      const spent = (limit ?? 0) > 0 ? (limit as number) - left : elapsed;
      const correct = choice !== null && choice === q.correct;
      setSelected(choice);
      setPhase("reveal");
      const entry: PlayedAnswer = { questionId: q.id, selected: choice, correct, seconds: spent };
      const entries = [...log, entry];
      setLog(entries);
      window.setTimeout(() => {
        if (correct) sfx.correct();
        else sfx.wrong();
      }, 450);
      if (!correct) {
        window.setTimeout(() => finish(false, entries, index - 1), 2200);
      }
    },
    [elapsed, finish, index, left, limit, log, phase, q],
  );

  // temporizador
  useEffect(() => {
    if (phase !== "playing" || !limit) return;
    const t = window.setInterval(() => {
      setElapsed((e) => e + 1);
      setLeft((v) => {
        if (v <= 1) {
          window.clearInterval(t);
          return 0;
        }
        if (v <= 6) sfx.tick();
        return v - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [phase, limit, index]);

  useEffect(() => {
    if (phase === "playing" && limit && left === 0) answer(null);
  }, [left, limit, phase, answer]);

  const next = () => {
    if (index + 1 >= questions.length) {
      finish(true, log, index);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setHidden([]);
    setAudience(null);
    setFriend(null);
    setPhase("playing");
  };

  const useLifeline = (id: string) => {
    if (!q) return;
    sfx.lifeline();
    setUsed((u) => [...u, id]);
    if (id === "5050") {
      const wrong = [0, 1, 2, 3].filter((i) => i !== q.correct).sort(() => Math.random() - 0.5);
      setHidden(wrong.slice(0, 2));
    } else if (id === "publico") {
      const base = [0, 0, 0, 0].map(() => 5 + Math.random() * 15);
      base[q.correct] = 45 + Math.random() * 35;
      const total = base.reduce((a, b) => a + b, 0);
      setAudience(base.map((v) => Math.round((v / total) * 100)));
    } else if (id === "amigo") {
      const sure = Math.random() > 0.25;
      const pick = sure ? q.correct : Math.floor(Math.random() * 4);
      setFriend(
        sure
          ? `Uy, esa me la sé: es la ${LETTERS[pick]}. Estoy casi seguro, ve con esa.`
          : `Mmm… no estoy seguro, pero yo diría que la ${LETTERS[pick]}. Cualquier cosa no me culpes.`,
      );
    }
  };

  const restart = () => {
    savedRef.current = false;
    setIndex(0);
    setSelected(null);
    setHidden([]);
    setUsed([]);
    setAudience(null);
    setFriend(null);
    setLog([]);
    setPhase("playing");
    setElapsed(0);
    setWon(false);
  };

  if (!q && phase !== "over") {
    return (
      <main className="stage-bg grid min-h-screen place-items-center px-6 text-center">
        <div className="panel max-w-md rounded-lg p-10">
          <h1 className="font-display text-2xl uppercase tracking-wide">Sin preguntas activas</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Entra al backstage y crea preguntas para que empiece el show.
          </p>
          <Link
            to="/admin/preguntas"
            className="mt-6 inline-flex rounded-md bg-[image:var(--gradient-red)] px-6 py-2.5 font-display text-sm uppercase tracking-[0.2em] text-primary-foreground"
          >
            Ir al backstage
          </Link>
        </div>
      </main>
    );
  }

  if (phase === "over") {
    const prizeIdx = won ? questions.length - 1 : index - 1;
    const prize = prizeIdx >= 0 ? (s.ladder[Math.min(prizeIdx, s.ladder.length - 1)] ?? 0) : 0;
    const lost = questions[index];
    return (
      <main className="stage-bg relative grid min-h-screen place-items-center overflow-hidden px-6 py-16">
        {won ? <Confetti /> : <Particles count={10} />}
        <div className="relative z-10 w-full max-w-2xl animate-rise text-center">
          <p className="font-display text-[11px] uppercase tracking-[0.5em] text-primary">
            {won ? "Resultado final" : "Fin del juego"}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold uppercase tracking-tight text-glow sm:text-6xl">
            {won ? `¡${s.participantName.split(" ")[0]} es BRA-YANARIA!` : `¡Casi, ${s.participantName.split(" ")[0]}!`}
          </h1>
          <div className="panel mt-8 rounded-lg p-8">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">Premio conseguido</p>
            <p className="mt-2 font-display text-5xl font-semibold text-primary text-glow tabular-nums">{money(prize)}</p>

            {!won && lost && (
              <div className="mt-8 space-y-3 border-t border-border pt-6 text-left">
                <p className="text-sm text-muted-foreground">Pregunta donde se detuvo:</p>
                <p className="text-base font-medium">{lost.text}</p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Respuesta correcta: </span>
                  <span className="font-semibold text-primary">
                    {LETTERS[lost.correct]} — {lost.answers[lost.correct]}
                  </span>
                </p>
                {s.showExplanation && lost.explanation && (
                  <p className="text-sm leading-relaxed text-muted-foreground">{lost.explanation}</p>
                )}
              </div>
            )}

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border pt-6 text-center">
              <Stat label="Correctas" value={String(log.filter((l) => l.correct).length)} />
              <Stat label="Comodines" value={String(used.length)} />
              <Stat label="Tiempo" value={`${log.reduce((a, b) => a + b.seconds, 0)}s`} />
            </div>
          </div>
          <p className="mt-6 text-sm italic text-muted-foreground">{s.finalMessage}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-red)] px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--glow-red)]"
            >
              <RotateCcw className="h-4 w-4" /> Jugar de nuevo
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <Home className="h-4 w-4" /> Inicio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const question = q!;

  return (
    <main className="stage-bg relative min-h-screen overflow-hidden">
      <Particles count={10} />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1fr_260px] lg:px-8 lg:py-10">
        <div className="order-2 lg:order-1">
          <header className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.4em] text-primary">
                Pregunta {index + 1} de {questions.length}
              </p>
              <p className="mt-1 font-display text-2xl tabular-nums text-foreground">
                {money(s.ladder[Math.min(index, s.ladder.length - 1)] ?? 0)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {limit ? <Timer left={left} total={limit} /> : <span className="text-xs uppercase tracking-widest text-muted-foreground">Sin límite</span>}
              <Link to="/" className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground" aria-label="Salir">
                <X className="h-4 w-4" />
              </Link>
            </div>
          </header>

          <div className="panel mt-6 rounded-lg p-6 sm:p-8">
            {question.image?.url && (
              <img
                src={question.image.url}
                alt=""
                className="mx-auto mb-6 max-h-56 w-auto rounded-md border border-border object-contain"
              />
            )}
            {question.audio?.url && <audio controls src={question.audio.url} className="mb-6 w-full" />}
            {question.video?.url && (
              <video controls src={question.video.url} className="mb-6 max-h-64 w-full rounded-md border border-border" />
            )}
            <p className="text-balance text-center text-xl font-medium leading-snug sm:text-2xl">{question.text}</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {question.answers.map((a, i) => {
              const isHidden = hidden.includes(i);
              const isCorrect = phase === "reveal" && i === question.correct;
              const isWrongPick = phase === "reveal" && selected === i && i !== question.correct;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={phase !== "playing" || isHidden}
                  onClick={() => {
                    sfx.select();
                    answer(i);
                  }}
                  className={cn(
                    "group relative flex min-h-[64px] items-center gap-4 rounded-md border px-5 py-4 text-left transition-all duration-300",
                    isHidden && "pointer-events-none opacity-20",
                    !isHidden && phase === "playing" && "border-border bg-card/60 hover:-translate-y-0.5 hover:border-primary/70 hover:shadow-[var(--glow-red)]",
                    selected === i && phase === "reveal" && !isCorrect && "animate-shake",
                    isCorrect && "border-primary bg-[image:var(--gradient-red)] text-primary-foreground shadow-[var(--glow-strong)]",
                    isWrongPick && "border-destructive/70 bg-destructive/20",
                    phase === "reveal" && !isCorrect && !isWrongPick && "opacity-50",
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-lg font-semibold",
                      isCorrect ? "text-primary-foreground" : "text-primary",
                    )}
                  >
                    {LETTERS[i]}
                  </span>
                  <span className="flex-1 text-sm sm:text-base">{a}</span>
                  {audience && phase === "playing" && (
                    <span className="font-display text-xs tabular-nums text-muted-foreground">{audience[i]}%</span>
                  )}
                </button>
              );
            })}
          </div>

          {audience && (
            <div className="panel mt-4 rounded-lg p-4">
              <p className="mb-3 font-display text-[10px] uppercase tracking-[0.3em] text-muted-foreground">El público opina</p>
              <div className="flex items-end gap-3">
                {audience.map((v, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t bg-[image:var(--gradient-red)] transition-all duration-700"
                      style={{ height: `${Math.max(6, v * 1.1)}px` }}
                    />
                    <span className="font-display text-xs text-muted-foreground">{LETTERS[i]} · {v}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {friend && (
            <div className="panel mt-4 flex items-start gap-3 rounded-lg p-4">
              <span className="mt-0.5 h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" />
              <p className="text-sm italic text-muted-foreground">“{friend}”</p>
            </div>
          )}

          {phase === "reveal" && selected === question.correct && (
            <div className="mt-4 animate-rise text-center">
              {s.showExplanation && question.explanation && (
                <p className="mb-4 text-sm text-muted-foreground">{question.explanation}</p>
              )}
              <button
                onClick={next}
                className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-red)] px-8 py-3 font-display text-sm uppercase tracking-[0.2em] text-primary-foreground shadow-[var(--glow-red)]"
              >
                {index + 1 >= questions.length ? (
                  <>
                    <Trophy className="h-4 w-4" /> Ver resultado
                  </>
                ) : (
                  <>
                    Siguiente <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-6">
            <Lifelines lifelines={s.lifelines} used={used} disabled={phase !== "playing"} onUse={useLifeline} />
          </div>
        </div>

        <aside className="order-1 lg:order-2">
          <PrizeLadder ladder={s.ladder.slice(0, questions.length)} currentIndex={index} className="lg:sticky lg:top-6" />
        </aside>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-xl tabular-nums text-foreground">{value}</p>
      <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
    </div>
  );
}
