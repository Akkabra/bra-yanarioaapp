import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultData, uid } from "./defaults";
import { configureAudio } from "./audio";
import type { BraData, Category, GameRun, Participant, Question, Settings } from "./types";

const KEY = "bra-yanario:v1";

type Ctx = {
  data: BraData;
  ready: boolean;
  saveQuestion: (q: Question) => void;
  deleteQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
  newQuestion: () => Question;
  saveCategory: (c: Category) => void;
  deleteCategory: (id: string) => void;
  saveParticipant: (p: Participant) => void;
  deleteParticipant: (id: string) => void;
  saveSettings: (s: Partial<Settings>) => void;
  addRun: (r: GameRun) => void;
  resetAll: () => void;
};

const BraContext = createContext<Ctx | null>(null);

export function BraProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BraData>(() => defaultData());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as BraData;
        setData({ ...defaultData(), ...parsed, settings: { ...defaultData().settings, ...parsed.settings } });
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
    configureAudio(data.settings.soundEnabled, data.settings.volume);
  }, [data, ready]);

  const update = useCallback((fn: (d: BraData) => BraData) => setData((d) => fn(d)), []);

  const value = useMemo<Ctx>(
    () => ({
      data,
      ready,
      newQuestion: () => ({
        id: uid(),
        text: "",
        answers: ["", "", "", ""],
        correct: 0,
        explanation: "",
        categoryId: null,
        difficulty: "facil",
        prize: null,
        timeLimit: null,
        order: 0,
        tags: [],
        active: true,
        createdAt: new Date().toISOString(),
      }),
      saveQuestion: (q) =>
        update((d) => {
          const exists = d.questions.some((x) => x.id === q.id);
          return {
            ...d,
            questions: exists ? d.questions.map((x) => (x.id === q.id ? q : x)) : [...d.questions, q],
          };
        }),
      deleteQuestion: (id) => update((d) => ({ ...d, questions: d.questions.filter((q) => q.id !== id) })),
      duplicateQuestion: (id) =>
        update((d) => {
          const q = d.questions.find((x) => x.id === id);
          if (!q) return d;
          return {
            ...d,
            questions: [
              ...d.questions,
              { ...q, id: uid(), text: `${q.text} (copia)`, createdAt: new Date().toISOString() },
            ],
          };
        }),
      saveCategory: (c) =>
        update((d) => ({
          ...d,
          categories: d.categories.some((x) => x.id === c.id)
            ? d.categories.map((x) => (x.id === c.id ? c : x))
            : [...d.categories, c],
        })),
      deleteCategory: (id) => update((d) => ({ ...d, categories: d.categories.filter((c) => c.id !== id) })),
      saveParticipant: (p) =>
        update((d) => ({
          ...d,
          participants: d.participants.some((x) => x.id === p.id)
            ? d.participants.map((x) => (x.id === p.id ? p : x))
            : [...d.participants, p],
        })),
      deleteParticipant: (id) => update((d) => ({ ...d, participants: d.participants.filter((p) => p.id !== id) })),
      saveSettings: (s) => update((d) => ({ ...d, settings: { ...d.settings, ...s } })),
      addRun: (r) => update((d) => ({ ...d, runs: [r, ...d.runs] })),
      resetAll: () => setData(defaultData()),
    }),
    [data, ready, update],
  );

  return <BraContext.Provider value={value}>{children}</BraContext.Provider>;
}

export const useBra = () => {
  const c = useContext(BraContext);
  if (!c) throw new Error("useBra debe usarse dentro de BraProvider");
  return c;
};

export const money = (n: number) => "$" + n.toLocaleString("es-CO");

export const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
