import { Button } from '@/ui/components/Button';
import { DEMO_URL, SIGNUP_URL } from '@/shared/constants/links';
import { TypedWord } from './TypedWord';

const PROFESSIONALS = ['ingenieros agrónomos', 'contadores', 'abogados', 'inversores'] as const;

export function Hero() {
  return (
    // El resplandor arranca detrás de la barra fija: el hero sube su alto con un margen negativo.
    // Sin posición propia: el fondo queda debajo del lienzo de puntos y el contenido (z-1), encima.
    // Una pantalla de alto, como las escenas de buzzabout: los botones quedan arriba cuando los puntos empiezan a caer.
    <section data-story-scene="chips" className="-mt-18 min-h-dvh overflow-hidden pt-18 pb-28 [background:var(--hero-glow)]">
      <div className="relative z-1 mx-auto flex max-w-300 flex-col items-center gap-7 px-6 pt-24 text-center">
        <span className="border-border text-body-sm text-sage-800 inline-flex h-8.5 items-center rounded-full border bg-white px-4 font-medium [box-shadow:var(--shadow-xs)]">
          Para productores agropecuarios
        </span>

        <h1 className="max-w-275 text-[clamp(40px,6.6vw,88px)] leading-[1.04] font-semibold tracking-[-0.045em]">
          Tu campo, conectado con tus
          <TypedWord words={PROFESSIONALS} />
          <span className="sr-only">{PROFESSIONALS.slice(0, -1).join(', ')} e {PROFESSIONALS.at(-1)}</span>
        </h1>

        <p className="text-body-lg text-muted-foreground max-w-130 sm:text-[19px] sm:leading-[30px]">
          Trabajan juntos en el mismo espacio, con los lotes, las órdenes y la campaña a la vista de todos.
        </p>

        {/* De estos botones salen los puntos que arman el campo de la sección siguiente. */}
        <div data-story-target className="flex flex-wrap justify-center gap-3.5">
          <Button size="lg" asChild>
            <a href={SIGNUP_URL}>Empezá gratis</a>
          </Button>
          <Button size="lg" variant="surface" asChild>
            <a href={DEMO_URL}>Agendar demo</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
