'use client';

import { useEffect, useRef, useState } from 'react';
import { GlowSpot } from './GlowSpot';

const SAMPLE_NEED = 'Necesito un ingeniero agrónomo para planificar soja en Río Cuarto, Córdoba';

/**
 * Búsqueda asistida, copiada de la escena "You direct" de buzzabout.ai: escena de una pantalla de alto cuyo texto
 * entra al verse; el campo lo arman los puntos de `StoryDots` y aparece con `--reveal`. El pedido se escribe cada
 * vez que la escena entra.
 */
export function TeamSearch() {
  const sceneRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      clearTimeout(timer);
      let i = 0;
      const step = () => {
        setTyped(SAMPLE_NEED.slice(0, i));
        i++;
        if (i <= SAMPLE_NEED.length) timer = setTimeout(step, 55 + Math.random() * 40);
      };
      step();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (entry.intersectionRatio >= 0.4) setInView(true);
          if (entry.intersectionRatio >= 0.5) type();
        }
      },
      { threshold: [0.2, 0.4, 0.5, 0.6] }
    );
    observer.observe(scene);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      id="como-funciona"
      data-story-scene="outline"
      aria-labelledby="team-search-title"
      className="relative z-1 flex min-h-dvh items-center justify-center px-6 py-24 md:px-12"
    >
      <GlowSpot className="top-1/2 left-1/2 h-150 w-[min(1100px,140vw)] -translate-1/2" />
      <div
        data-in-view={inView}
        className="flex max-w-170 translate-y-5 flex-col items-center text-center opacity-0 transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] data-[in-view=true]:translate-y-0 data-[in-view=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      >
        <span className="border-border text-muted-foreground mb-6 inline-block rounded-full border bg-white/80 px-2.75 py-1.25 font-mono text-[11.5px] tracking-[0.1em] uppercase backdrop-blur-sm">
          01 · Búsqueda asistida
        </span>

        <h2
          id="team-search-title"
          className="mb-5.5 text-[clamp(24px,3.6vw,52px)] leading-[1.08] font-medium tracking-[-0.04em]"
        >
          ¿Todavía no tenés equipo?
          {/* Segunda línea en gris medio, como el acento de buzzabout; en un solo renglón desde tablet (puede
              pasar el ancho del texto: queda centrada). */}
          <span className="text-sage-400 block sm:whitespace-nowrap">Encontrá profesionales cerca de tu campo.</span>
        </h2>

        <div
          data-story-target
          data-story-reveal
          className="border-border mt-2 mb-7 flex w-full items-start gap-3.5 rounded-[100px] border bg-white px-5.5 py-4.5 text-left [box-shadow:0_20px_40px_-18px_color-mix(in_oklch,var(--color-pine)_18%,transparent),var(--shadow-xs)]"
        >
          <span aria-hidden className="bg-primary ring-primary/10 mt-2.25 size-2 shrink-0 rounded-full ring-6" />
          {/* El texto completo invisible reserva el alto, así el campo no salta al pasar a dos líneas en celular. */}
          <span className="text-pine grid min-w-0 flex-1 text-[17px] leading-[1.5] tracking-[-0.3px]">
            <span className="invisible col-start-1 row-start-1">{SAMPLE_NEED}</span>
            <span aria-hidden className="col-start-1 row-start-1">
              {typed}
            </span>
          </span>
          <span className="sr-only">{SAMPLE_NEED}</span>
        </div>

        <p className="text-body text-sage-700 max-w-[52ch]">
          Contalo con tus palabras. La IA arma la ficha de lo que necesitás y te muestra los profesionales de tu zona,
          ordenados por especialidad, cercanía y puntaje.
        </p>
      </div>
    </section>
  );
}
