'use client';

import { useEffect, useState } from 'react';
import { MdAutoAwesome } from 'react-icons/md';
import { Badge, BadgeDot } from '@/ui/components/Badge';
import { Button } from '@/ui/components/Button';
import { cn } from '@/shared/utils/cn';
import { prefersReducedMotion, useInView } from '@/shared/hooks/useInView';
import { MINI_CARD_SHADOW } from './miniShadow';

const MESSAGE =
  'La pulverización del Lote 7 vence el jueves. Preparé la orden con los datos del último monitoreo.';
const SOURCES = ['Monitoreo · 20 oct', 'Lote 7'];

/**
 * Asistencia: el agente escribe un aviso con su borrador y las fuentes, y abajo queda la confirmación (como el brief
 * "Ready" de buzzabout). El mensaje se escribe al verse; con "reducir movimiento" aparece completo.
 */
export function AgentAssistScene() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [typed, setTyped] = useState('');
  const done = typed.length === MESSAGE.length;

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setTyped(MESSAGE);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      i++;
      setTyped(MESSAGE.slice(0, i));
      if (i < MESSAGE.length) timer = setTimeout(step, 22 + Math.random() * 22);
    };
    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <div ref={ref} aria-hidden className="flex w-full max-w-75 flex-col gap-4">
      <div className={cn('rounded-lg bg-white px-4.5 py-4', MINI_CARD_SHADOW)}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground flex items-center gap-1.5 font-mono text-[10.5px] tracking-[0.12em] uppercase">
            <MdAutoAwesome className="text-field-700 size-3.5" />
            Agente
          </span>
          <Badge variant={done ? 'success' : 'secondary'} className="font-mono text-[10.5px] font-medium">
            <BadgeDot />
            {done ? 'Borrador listo' : 'Escribiendo'}
          </Badge>
        </div>
        {/* El texto completo invisible reserva el alto, así la tarjeta no crece mientras se escribe. */}
        <p className="text-pine mt-3 grid text-[15px] leading-[1.45]">
          <span className="invisible col-start-1 row-start-1">{MESSAGE}</span>
          <span className="col-start-1 row-start-1">{typed}</span>
        </p>
        <div
          className={cn(
            'mt-3 flex flex-wrap gap-1.5 transition-opacity duration-300',
            done ? 'opacity-100' : 'opacity-0'
          )}
        >
          {SOURCES.map((source) => (
            <span
              key={source}
              className="bg-sage-50 border-border text-muted-foreground rounded-full border px-2 py-0.5 font-mono text-[10px]"
            >
              {source}
            </span>
          ))}
        </div>
      </div>

      <div className={cn('flex items-center justify-between gap-3 rounded-lg bg-white px-4.5 py-3', MINI_CARD_SHADOW)}>
        <span className="text-muted-foreground font-mono text-[10.5px] tracking-[0.12em] uppercase">Vos decidís</span>
        <Button size="xs" tabIndex={-1}>
          Confirmar orden
        </Button>
      </div>
    </div>
  );
}
