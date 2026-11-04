import { cn } from '@/shared/utils/cn';

interface GlowSpotProps {
  /** Posición y tamaño de la luz dentro de la sección (`left-1/2 top-1/2 h-140 w-250 -translate-1/2`). */
  className: string;
  /**
   * `true` (por defecto): se recorta a la caja de la sección, para que no genere scroll horizontal. `false`: se
   * centra sobre un elemento más chico (un encabezado) sin cortarse en sus bordes; el recorte lo pone la sección.
   */
  clip?: boolean;
}

/**
 * Zona de gradiente detrás de una sección, como los `trama-spot-glow` de trama.so: una elipse verde campo que se
 * apaga en sus bordes. Va dentro de un elemento posicionado: queda debajo de su contenido.
 */
export function GlowSpot({ className, clip = true }: GlowSpotProps) {
  if (!clip) {
    return (
      <span aria-hidden className={cn('pointer-events-none absolute -z-1 [background:var(--glow-spot)]', className)} />
    );
  }
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 -z-1 overflow-hidden">
      <span className={cn('absolute [background:var(--glow-spot)]', className)} />
    </span>
  );
}
