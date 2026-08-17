import { useMemo } from "react";

export function Confetti({ count = 60 }: { count?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 37) % 100,
        delay: ((i * 11) % 30) / 10,
        duration: 2.6 + ((i * 7) % 20) / 10,
        w: 4 + (i % 4),
        h: 8 + (i % 6),
        red: i % 3 !== 0,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {bits.map((b, i) => (
        <span
          key={i}
          className={b.red ? "absolute bg-primary" : "absolute bg-foreground"}
          style={{
            left: `${b.left}%`,
            top: 0,
            width: b.w,
            height: b.h,
            opacity: 0.9,
            animation: `bra-confetti ${b.duration}s linear ${b.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
