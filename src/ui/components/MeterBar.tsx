import * as React from 'react';
import { cn } from '@/shared/utils/cn';

/*
 * AgroNexo MeterBar: barra horizontal partida en tramos sobre un total, para lo que `Progress` (un solo valor) no
 * cubre: hecho + pendiente de una labor, o la superficie de cada cultivo. Toma la forma del carril de Cashmere
 * Progress (pill, plano). Los tonos son la escala de la marca para datos; `pending` es el rayado verde campo de
 * "lo que falta". `inverse` es el carril claro sobre pine.
 */

type MeterTone =
  | 'pine'
  | 'field-700'
  | 'field-500'
  | 'field-400'
  | 'field-300'
  | 'field-200'
  | 'muted'
  | 'pending';

const TONES: Record<MeterTone, string> = {
  pine: 'bg-pine',
  'field-700': 'bg-field-700',
  'field-500': 'bg-field-500',
  'field-400': 'bg-field-400',
  'field-300': 'bg-field-300',
  'field-200': 'bg-field-200',
  muted: 'bg-sage-200',
  pending:
    'bg-[repeating-linear-gradient(135deg,var(--color-field-300)_0_3px,var(--color-field-100)_3px_6px)]',
};

const SIZES = { sm: 'h-1.5', default: 'h-2', lg: 'h-2.5' } as const;

interface MeterSegment {
  value: number;
  tone: MeterTone;
}

interface MeterBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  segments: MeterSegment[];
  /** Total de la barra; sin él, la suma de los tramos. */
  max?: number;
  size?: keyof typeof SIZES;
  /** Separa los tramos con una línea fina (superficie por cultivo). */
  gap?: boolean;
  /** Carril claro sobre fondo pine. */
  inverse?: boolean;
}

function MeterBar({
  segments,
  max,
  size = 'default',
  gap = false,
  inverse = false,
  className,
  ...props
}: MeterBarProps) {
  const total = max ?? segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <div
      role="img"
      data-slot="meter-bar"
      className={cn(
        'flex w-full overflow-hidden rounded-full',
        SIZES[size],
        gap ? 'gap-0.5' : '',
        inverse ? 'bg-sage-50/15' : 'bg-muted',
        className
      )}
      {...props}
    >
      {total > 0 &&
        segments
          .filter((segment) => segment.value > 0)
          .map((segment, index) => (
            <span
              key={index}
              className={cn(
                'h-full shrink-0 transition-[width] duration-500 ease-out motion-reduce:transition-none',
                TONES[segment.tone]
              )}
              style={{ width: `${(Math.min(segment.value, total) / total) * 100}%` }}
            />
          ))}
    </div>
  );
}

/** Muestra del color de un tramo, para la leyenda. */
function MeterSwatch({
  tone,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone: MeterTone }) {
  return (
    <span
      aria-hidden
      data-slot="meter-swatch"
      className={cn('size-2.5 shrink-0 rounded-[3px]', TONES[tone], className)}
      {...props}
    />
  );
}

export { MeterBar, MeterSwatch };
export type { MeterTone, MeterSegment };
