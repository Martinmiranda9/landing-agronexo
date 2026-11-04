import { MdPlayArrow } from 'react-icons/md';

// Alturas de la onda del audio (0–1), fijas para que se vea igual en cada vuelta.
const WAVE = [0.3, 0.55, 0.8, 0.45, 0.9, 0.6, 0.35, 0.7, 1, 0.5, 0.65, 0.4, 0.85, 0.55, 0.3, 0.6, 0.75, 0.45, 0.35, 0.5];

/** Nota de voz del trabajador: play, la onda y la duración. */
export function AudioNote({ duration }: { duration: string }) {
  return (
    <span className="flex w-44 items-center gap-2 py-1">
      <MdPlayArrow className="text-sage-600 size-6 shrink-0" />
      <span className="flex h-6 flex-1 items-center gap-0.5">
        {WAVE.map((height, i) => (
          <span key={i} className="bg-sage-500/70 w-0.5 rounded-full" style={{ height: `${height * 100}%` }} />
        ))}
      </span>
      <span className="text-sage-500 text-[10px] tabular-nums">{duration}</span>
    </span>
  );
}
