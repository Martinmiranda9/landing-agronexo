import { DashboardPreview } from './dashboard-preview/DashboardPreview';

/**
 * El producto en grande: el tablero del campo, después de las escenas de puntos. Mismas medidas que la demo de
 * buzzabout.ai: 120px arriba y abajo, contenedor de 1240px con 24px a los costados.
 */
export function ProductPreview() {
  return (
    <section id="producto" aria-label="El tablero del campo" className="relative z-1 py-30">
      <div className="mx-auto max-w-310 px-6">
        <DashboardPreview />
      </div>
    </section>
  );
}
