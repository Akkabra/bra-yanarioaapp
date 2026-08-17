export type Difficulty = "facil" | "media" | "dificil" | "experta";

export const DIFFICULTIES: { id: Difficulty; label: string }[] = [
  { id: "facil", label: "Fácil" },
  { id: "media", label: "Media" },
  { id: "dificil", label: "Difícil" },
  { id: "experta", label: "Experta" },
];

export type Media = {
  kind: "image" | "audio" | "video";
  url: string;
  name?: string;
};

export type Question = {
  id: string;
  text: string;
  answers: [string, string, string, string];
  answerMedia?: (Media | null)[];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
  categoryId: string | null;
  difficulty: Difficulty;
  prize: number | null;
  timeLimit: number | null; // null = usa el global
  order: number;
  tags: string[];
  active: boolean;
  image?: Media | null;
  audio?: Media | null;
  video?: Media | null;
  backgroundImage?: boolean;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  active: boolean;
};

export type Participant = {
  id: string;
  name: string;
  photo?: string | null;
  description?: string;
  accent?: string;
  createdAt: string;
};

export type Lifeline = {
  id: "5050" | "publico" | "amigo" | string;
  name: string;
  description: string;
  enabled: boolean;
};

export type Settings = {
  gameName: string;
  participantName: string;
  subtitle: string;
  welcomeMessage: string;
  finalMessage: string;
  questionCount: number;
  defaultTime: number | null; // null = ilimitado
  allowRepeat: boolean;
  showExplanation: boolean;
  soundEnabled: boolean;
  volume: number;
  animationsEnabled: boolean;
  ladder: number[];
  lifelines: Lifeline[];
  backgroundImage?: string | null;
  logo?: string | null;
};

export type PlayedAnswer = {
  questionId: string;
  selected: number | null;
  correct: boolean;
  seconds: number;
};

export type GameRun = {
  id: string;
  participantId: string | null;
  participantName: string;
  date: string;
  answers: PlayedAnswer[];
  correctCount: number;
  wrongCount: number;
  totalSeconds: number;
  lifelinesUsed: string[];
  prize: number;
  result: "ganada" | "perdida" | "abandonada";
};

export type BraData = {
  questions: Question[];
  categories: Category[];
  participants: Participant[];
  runs: GameRun[];
  settings: Settings;
};
