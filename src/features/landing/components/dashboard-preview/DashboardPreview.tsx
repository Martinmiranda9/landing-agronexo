'use client';

import { useEffect, useRef, useState } from 'react';
import { PreviewDashboard } from './PreviewDashboard';

// Ventana del mismo tamaño que la demo de buzzabout.ai (1192 × 720); en pantallas más chicas se achica entera.
const WINDOW_WIDTH = 1192;
const WINDOW_HEIGHT = 720;
// Ancho de escritorio al que se arma el tablero (la tabla de actividades necesita ~1440 px); entra en la ventana a escala.
const SCREEN_WIDTH = 1440;
const SCREEN_SCALE = WINDOW_WIDTH / SCREEN_WIDTH;

/**
 * Ventana con el tablero del campo adentro. El tablero es HTML con los componentes reales (se ve nítido a cualquier
 * tamaño y toma la paleta de los tokens). Es solo para mirar: no recibe foco ni clics y el lector de pantalla lee la
 * descripción.
 */
export function DashboardPreview() {
  const sizerRef = useRef<HTMLDivElement>(null);
  // Se guarda el ancho crudo y la escala se calcula al renderizar, así sigue a las constantes si cambian.
  const [available, setAvailable] = useState<number | null>(null);
  const scale = available ? Math.min(1, available / WINDOW_WIDTH) : 1;

  useEffect(() => {
    const sizer = sizerRef.current;
    if (!sizer) return;
    const measure = () => setAvailable(sizer.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(sizer);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="mx-auto w-full" style={{ maxWidth: WINDOW_WIDTH }}>
      <div
        ref={sizerRef}
        data-ready={available !== null}
        className="relative transition-opacity duration-300 data-[ready=false]:opacity-0"
        style={{ height: WINDOW_HEIGHT * scale }}
      >
        {/* Marco de vidrio alrededor de la ventana, con el borde fino en degradé verde (`frame-glow`). */}
        <span aria-hidden className="frame-glow absolute -inset-1.5 rounded-[14px] backdrop-blur-sm md:-inset-2.5 md:rounded-[18px]" />
        <div
          inert
          aria-hidden
          className="border-border bg-canvas absolute top-0 left-0 origin-top-left overflow-hidden rounded-lg border [box-shadow:0_24px_60px_-20px_color-mix(in_oklch,var(--color-pine)_18%,transparent),0_8px_24px_-12px_color-mix(in_oklch,var(--color-pine)_10%,transparent)]"
          style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT, transform: `scale(${scale})` }}
        >
          <div className="origin-top-left" style={{ width: SCREEN_WIDTH, transform: `scale(${SCREEN_SCALE})` }}>
            <PreviewDashboard />
          </div>
        </div>
      </div>

      <figcaption className="sr-only">
        Tablero de un campo en AgroNexo: la campaña en curso, la superficie, los cultivos, las actividades del equipo y
        el avance de las labores.
      </figcaption>
    </figure>
  );
}
