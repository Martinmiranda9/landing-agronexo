import * as React from 'react';
import { cn } from '@/shared/utils/cn';

/*
 * Cashmere SectionHeader (registro `cashmere/section-header`): título, bajada y acciones a la derecha. AgroNexo suma
 * `as` para usarlo como título de página (`h1`, en la escala heading-lg de AgroNexo) o de sección (`h2`, la original),
 * `titleAside` para un control pegado al título (la campaña del campo) y `eyebrowTone="muted"` para una línea gris
 * común arriba del título (el saludo), en vez de la etiqueta verde en mayúsculas.
 */

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  eyebrowTone?: 'primary' | 'muted';
  titleAside?: React.ReactNode;
  actions?: React.ReactNode;
  as?: 'h1' | 'h2';
}

const TITLE = {
  h1: 'text-heading-lg tracking-heading text-foreground',
  h2: 'text-xl font-semibold tracking-tight text-foreground',
} as const;

const EYEBROW = {
  primary: 'text-primary mb-2 text-xs font-semibold tracking-wider uppercase',
  muted: 'text-muted-foreground mb-1.5 text-sm',
} as const;

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      className,
      title,
      description,
      eyebrow,
      eyebrowTone = 'primary',
      titleAside,
      actions,
      as: Heading = 'h2',
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      data-slot="section-header"
      className={cn('flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', className)}
      {...props}
    >
      <div className="min-w-0 flex-1">
        {eyebrow && <div className={EYEBROW[eyebrowTone]}>{eyebrow}</div>}
        {titleAside ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Heading className={cn(TITLE[Heading], 'text-balance')}>{title}</Heading>
            {titleAside}
          </div>
        ) : (
          <Heading className={TITLE[Heading]}>{title}</Heading>
        )}
        {description && (
          <div className="text-muted-foreground mt-1.5 max-w-2xl text-sm leading-relaxed">
            {description}
          </div>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
);
SectionHeader.displayName = 'SectionHeader';

export { SectionHeader };
