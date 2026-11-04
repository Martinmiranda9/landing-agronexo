import type { ReactNode } from 'react';

interface AgentStepProps {
  eyebrow: string;
  title: string;
  description: string;
  /** La mini escena de la app que va dentro de la tarjeta gris. */
  children: ReactNode;
}

/**
 * Una columna de la sección de agentes, con la estructura de `.hwv-cell` de buzzabout: etiqueta mono, tarjeta gris de
 * 408px con la mini escena centrada, título y bajada.
 */
export function AgentStep({ eyebrow, title, description, children }: AgentStepProps) {
  return (
    <li className="flex flex-col gap-5">
      <span className="text-muted-foreground font-mono text-[11px] tracking-[0.18em] uppercase">{eyebrow}</span>
      <div className="bg-sage-50 relative flex h-102 items-center justify-center overflow-hidden rounded-xl p-6">
        {children}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-pine text-[19px] leading-[1.3] font-medium tracking-[-0.3px]">{title}</h3>
        <p className="text-body-sm text-muted-foreground leading-[1.55]">{description}</p>
      </div>
    </li>
  );
}
