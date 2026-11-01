import { SceneReveal } from './SceneReveal';

// Lo que el agente de cada miembro lee del campo. El punto va de pine a verde claro, como en las pills de buzzabout.
const FIELD_DATA = [
  { label: 'Lotes', dot: 'bg-pine' },
  { label: 'Cultivos', dot: 'bg-field-900' },
  { label: 'Campañas', dot: 'bg-field-800' },
  { label: 'Actividades', dot: 'bg-field-700' },
  { label: 'Órdenes', dot: 'bg-field-600' },
  { label: 'Costos', dot: 'bg-field-500' },
  { label: 'Equipo', dot: 'bg-field-400' },
  { label: 'Pendientes', dot: 'bg-field-300' },
  { label: 'Resumen semanal', dot: 'bg-field-200' },
] as const;

/**
 * Espacio de trabajo: qué pasa después del match. Estructura de la escena "Agents research" de buzzabout.ai; los
 * puntos salen del campo de búsqueda de la escena anterior y se acomodan dentro de los tags.
 */
export function Workspace() {
  return (
    <section
      id="espacio"
      data-story-scene="chips"
      aria-labelledby="workspace-title"
      className="relative z-1 flex min-h-dvh items-center justify-center px-5 py-24 md:px-12"
    >
      <SceneReveal>
        <span className="border-border text-muted-foreground mb-6 inline-block rounded-full border bg-white/80 px-2.75 py-1.25 font-mono text-[11.5px] tracking-[0.1em] uppercase backdrop-blur-sm">
          02 · Espacio de trabajo
        </span>

        <h2
          id="workspace-title"
          className="mb-5.5 text-[clamp(24px,3.6vw,52px)] leading-[1.08] font-medium tracking-[-0.04em]"
        >
          <span className="block sm:whitespace-nowrap">Con el equipo armado, todos ven el mismo campo.</span>
          <span className="text-sage-400 block sm:whitespace-nowrap">Cada uno trabaja con su agente.</span>
        </h2>

        <p className="text-sage-700 max-w-170 text-[15px] leading-normal md:text-body">
          Productor y profesionales comparten lotes, campañas y actividades en el mismo espacio. Cada miembro tiene un
          agente de IA que conoce solo lo de su rol: avisa lo pendiente, resume la semana y prepara borradores que vos
          confirmás.
        </p>

        <ul
          data-story-target
          data-story-reveal
          aria-label="Lo que lee el agente del campo"
          className="mt-5 flex max-w-160 flex-wrap justify-center gap-1.5 md:mt-7 md:gap-2"
        >
          {FIELD_DATA.map((item) => (
            <li
              key={item.label}
              className="text-pine inline-flex items-center gap-1.25 rounded-full border border-sage-100 bg-white/85 px-2.25 py-1.25 font-mono text-[9.5px] tracking-[0.04em] uppercase md:gap-1.5 md:px-3 md:py-1.75 md:text-[11px] md:tracking-[0.06em]"
            >
              <span aria-hidden className={`size-1.25 shrink-0 rounded-full md:size-1.75 ${item.dot}`} />
              {item.label}
            </li>
          ))}
        </ul>
      </SceneReveal>
    </section>
  );
}
