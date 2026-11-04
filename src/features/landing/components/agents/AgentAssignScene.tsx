'use client';

import { useEffect, useState } from 'react';
import { MdAutoAwesome, MdCheck } from 'react-icons/md';
import { InitialsAvatar } from '@/ui/components/Avatar';
import { cn } from '@/shared/utils/cn';
import { prefersReducedMotion, useInView } from '@/shared/hooks/useInView';
import { MINI_CARD_SHADOW, MINI_PILL_SHADOW } from './miniShadow';

// Las cuatro áreas, cada una con un profesional de ejemplo; flotan alrededor como los tags de buzzabout.
const AREAS = [
  { area: 'Agronomía', person: 'Lucía Ferrero', role: 'Ingeniera agrónoma', initials: 'LF', position: 'top-[12%] left-[5%]' },
  { area: 'Contabilidad', person: 'Pablo Sosa', role: 'Contador', initials: 'PS', position: 'top-[20%] right-[4%]' },
  { area: 'Legales', person: 'Carla Méndez', role: 'Abogada', initials: 'CM', position: 'bottom-[30%] left-[3%]' },
  { area: 'Inversión', person: 'Martín Ríos', role: 'Asesor de inversión', initials: 'MR', position: 'bottom-[24%] right-[5%]' },
] as const;

const CYCLE_MS = 2400;

/**
 * Asignación: el profesional del centro recibe el agente de su área. Al verse, va pasando por las cuatro áreas, así
 * ninguna profesión es la protagonista. Con "reducir movimiento" queda fija la primera.
 */
export function AgentAssignScene() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const current = AREAS[index];

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % AREAS.length), CYCLE_MS);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0">
      {AREAS.map((item, i) => (
        <span
          key={item.area}
          className={cn(
            'absolute flex items-center gap-1.5 rounded-full px-2.5 py-1.25 text-[10px] transition-colors duration-300',
            MINI_PILL_SHADOW,
            item.position,
            i === index ? 'bg-pine text-sage-50' : 'text-pine bg-white'
          )}
        >
          <span
            className={cn(
              'font-mono text-[8.5px] tracking-[0.08em] uppercase',
              i === index ? 'text-sage-50/70' : 'text-muted-foreground'
            )}
          >
            Área
          </span>
          <span className={i === index ? 'text-sage-50/40' : 'text-sage-300'}>|</span>
          {item.area}
        </span>
      ))}

      <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center">
        <div className={cn('flex w-52 items-center gap-2.5 rounded-lg bg-white px-3.5 py-3', MINI_CARD_SHADOW)}>
          <InitialsAvatar initials={current.initials} size="sm" tone="tint" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-body-sm text-pine truncate font-semibold">{current.person}</span>
            <span className="text-caption text-muted-foreground truncate">{current.role}</span>
          </span>
        </div>

        {/* La conexión: una línea de puntos que baja hasta el agente. */}
        <span className="border-field-400 h-7 border-l-2 border-dotted" />

        <div
          className={cn(
            'bg-pine text-sage-50 flex items-center gap-2 rounded-full py-2 pr-4 pl-2.5 text-[13px] font-medium',
            MINI_PILL_SHADOW
          )}
        >
          <span className="bg-sage-50/15 flex size-6 items-center justify-center rounded-full">
            <MdAutoAwesome className="size-3.5" />
          </span>
          Agente de {current.area}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <span
          className={cn(
            'text-pine flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[12.5px] backdrop-blur-sm',
            MINI_PILL_SHADOW
          )}
        >
          <span className="bg-field-700 flex size-4 items-center justify-center rounded-full text-white">
            <MdCheck className="size-3" />
          </span>
          Agente activo con sus permisos
        </span>
      </div>
    </div>
  );
}
