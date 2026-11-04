import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/components/Accordion';
import { FAQ_ITEMS } from './faq-data';
import { GlowSpot } from '../GlowSpot';

/**
 * Preguntas frecuentes, con la disposición de "Questions & answers" de buzzabout.ai: el encabezado fijo a la
 * izquierda y la lista de preguntas a la derecha, en una sola columna en celular. La primera arranca abierta.
 */
export function FaqSection() {
  return (
    <section id="preguntas" aria-labelledby="faq-title" className="relative z-1 overflow-x-clip py-30">
      <div className="mx-auto grid max-w-350 gap-10 px-6 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <header className="relative lg:sticky lg:top-28 lg:self-start">
          {/* La luz va centrada en el encabezado y lo acompaña cuando queda fijo. */}
          <GlowSpot clip={false} className="top-1/2 left-1/2 h-150 w-[min(820px,150vw)] -translate-1/2" />
          <span className="border-border text-muted-foreground mb-6 inline-block rounded-full border bg-white/80 px-2.75 py-1.25 font-mono text-[11.5px] tracking-[0.1em] uppercase">
            06 · Preguntas frecuentes
          </span>
          <h2
            id="faq-title"
            className="mb-3 text-[clamp(32px,3.4vw,52px)] leading-[1.08] font-medium tracking-[-0.04em]"
          >
            Lo que suelen
            <span className="text-sage-400 block">preguntarnos.</span>
          </h2>
          <p className="text-muted-foreground max-w-110 text-[17px] leading-[1.5]">
            Cómo funciona la búsqueda, quién ve tus datos y qué pasa con tu campo cuando armás el equipo.
          </p>
        </header>

        <div className="border-border rounded-xl border bg-white px-6 py-2 md:px-8 [box-shadow:var(--shadow-xs)]">
          <Accordion defaultValue={[FAQ_ITEMS[0].id]}>
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
