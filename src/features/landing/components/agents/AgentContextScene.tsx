'use client';

import { useEffect, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { cn } from '@/shared/utils/cn';
import { prefersReducedMotion, useInView } from '@/shared/hooks/useInView';
import { MINI_CARD_SHADOW } from './miniShadow';

// Datos del campo de ejemplo (La Esperanza, el mismo del tablero).
const RECORDS = 1248;
const SOURCES = [
  { key: 'Lotes', value: '12 lotes · 1.180 ha' },
  { key: 'Campaña', value: '2026/27 · 3 cultivos' },
  { key: 'Labores', value: '48 actividades' },
  { key: 'Historial', value: '3 campañas' },
];

const COUNT_MS = 1400;
const NUMBER = new Intl.NumberFormat('es-AR');

/**
 * Contexto: lo que conoce el agente, como el "Posts analysed" de buzzabout. La cifra cuenta hasta el total al verse y
 * las fuentes se van conectando una por una.
 */
export function AgentContextScene() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [count, setCount] = useState(0);
  const [connected, setConnected] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setCount(RECORDS);
      setConnected(SOURCES.length);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - (1 - t) ** 3;
      setCount(Math.round(RECORDS * eased));
      setConnected(Math.min(SOURCES.length, Math.floor(t * (SOURCES.length + 1))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <div ref={ref} aria-hidden className="w-full max-w-80">
      <p className="text-muted-foreground font-mono text-[11px] tracking-[0.14em] uppercase">Registros del campo</p>
      <p className="text-pine mt-3 text-[40px] leading-10 tracking-[-0.02em] tabular-nums">{NUMBER.format(count)}</p>

      <div className={cn('mt-3 rounded-lg bg-white px-4 py-3.5', MINI_CARD_SHADOW)}>
        <p className="text-muted-foreground mb-1 font-mono text-[10.5px] tracking-[0.12em] uppercase">
          Fuentes conectadas
        </p>
        <ul>
          {SOURCES.map((source, i) => (
            <li
              key={source.key}
              className="border-border grid grid-cols-[72px_1fr_auto] items-center gap-2.5 border-t py-2.5 first:border-t-0"
            >
              <span className="text-muted-foreground font-mono text-[10px] tracking-[0.08em] uppercase">
                {source.key}
              </span>
              <span className="text-body-sm text-pine truncate">{source.value}</span>
              <MdCheckCircle
                className={cn(
                  'size-4 transition-[color,opacity] duration-300',
                  i < connected ? 'text-status-green opacity-100' : 'text-sage-300 opacity-60'
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
