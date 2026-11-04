import type { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';
import { MINI_CARD_SHADOW } from '../../agents/miniShadow';

interface MockCardProps {
  eyebrow: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Pieza blanca de los mockups por rol: etiqueta mono, título y contenido, con la sombra de las tarjetas de agentes. */
export function MockCard({ eyebrow, title, aside, children, className }: MockCardProps) {
  return (
    <div className={cn('w-full rounded-lg bg-white px-5 py-4.5', MINI_CARD_SHADOW, className)}>
      <div className="mb-3.5 flex items-start justify-between gap-3">
        <div>
          <p className="text-muted-foreground font-mono text-[10.5px] tracking-[0.12em] uppercase">{eyebrow}</p>
          <p className="text-pine mt-1 text-[17px] leading-tight font-semibold tracking-[-0.01em]">{title}</p>
        </div>
        {aside}
      </div>
      {children}
    </div>
  );
}
