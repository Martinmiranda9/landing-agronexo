import { MdOutlineMic, MdOutlinePhoneIphone, MdOutlineQuestionAnswer } from 'react-icons/md';
import { WhatsAppDemo } from './WhatsAppDemo';
import { GlowSpot } from '../GlowSpot';

const POINTS = [
  {
    icon: MdOutlineMic,
    title: 'Audios, fotos y texto',
    description: 'Como se habla en el campo: la IA entiende notas de voz, fotos y mensajes sueltos.',
  },
  {
    icon: MdOutlinePhoneIphone,
    title: 'Un WhatsApp por campo',
    description: 'Cada campo tiene su número y todos los que trabajan ahí cargan en el mismo lugar.',
  },
  {
    icon: MdOutlineQuestionAnswer,
    title: 'Consultas al instante',
    description: 'Preguntá cuánto se sembró o qué falta, y la respuesta llega con el dato del campo.',
  },
];

const RECORD_TYPES = ['Actividad', 'Siembra', 'Pulverización', 'Control de plagas', 'Fertilización', 'Trilla', 'Lluvia'];

/**
 * Carga por WhatsApp: el texto a la izquierda y el celular con el chat animado a la derecha, con la disposición de
 * "Con qué trabaja" de trama.so y el chat que se va mandando de treble.ai.
 */
export function WhatsAppSection() {
  return (
    <section
      id="whatsapp"
      data-story-scene="outline"
      aria-labelledby="whatsapp-title"
      className="relative z-1 py-30"
    >
      <GlowSpot className="top-1/2 right-[-12%] h-190 w-[min(900px,140vw)] -translate-y-1/2" />
      <div className="mx-auto grid max-w-350 items-center gap-12 px-6 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div>
          <span className="border-border text-muted-foreground mb-6 inline-block rounded-full border bg-white/80 px-2.75 py-1.25 font-mono text-[11.5px] tracking-[0.1em] uppercase">
            03 · AgroNexo en WhatsApp
          </span>
          <h2
            id="whatsapp-title"
            className="mb-3 text-[clamp(32px,3.4vw,52px)] leading-[1.08] font-medium tracking-[-0.04em]"
          >
            Cargá tu campo con un mensaje.
            <span className="text-sage-400 block">Consultalo con otro.</span>
          </h2>
          <p className="text-muted-foreground max-w-140 text-[17px] leading-[1.5]">
            Quienes trabajan en el campo mandan un audio, una foto o un texto, y la IA lo convierte en un registro
            ordenado en el lote y la campaña que corresponden.
          </p>

          <ul className="mt-10 flex flex-col gap-6">
            {POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <li key={point.title} className="flex gap-4">
                  <span className="text-pine border-border flex size-10 shrink-0 items-center justify-center rounded-full border bg-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="text-pine block text-[17px] leading-snug font-medium tracking-[-0.2px]">
                      {point.title}
                    </span>
                    <span className="text-body-sm text-muted-foreground mt-1 block leading-[1.55]">
                      {point.description}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <ul aria-label="Qué se puede cargar" className="mt-10 flex flex-wrap gap-1.5">
            {RECORD_TYPES.map((type) => (
              <li
                key={type}
                className="text-pine border-sage-100 rounded-full border bg-white/85 px-2.5 py-1 font-mono text-[10.5px] tracking-[0.05em] uppercase"
              >
                {type}
              </li>
            ))}
          </ul>
        </div>

        <WhatsAppDemo />
      </div>
    </section>
  );
}
