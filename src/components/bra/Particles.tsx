import { useMemo } from "react";

export function Particles({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 97) % 100,
        size: 1 + ((i * 13) % 3),
        delay: (i * 1.7) % 14,
        duration: 14 + ((i * 5) % 12),
        opacity: 0.15 + ((i % 5) * 0.08),
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-10vh] rounded-full bg-primary"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: "blur(0.5px)",
            boxShadow: "0 0 10px var(--bra-red)",
            animation: `bra-float ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
