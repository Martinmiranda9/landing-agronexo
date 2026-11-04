import type { ReactNode } from 'react';
import { MdDoneAll } from 'react-icons/md';
import { cn } from '@/shared/utils/cn';

interface ChatBubbleProps {
  from: 'worker' | 'bot';
  time?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Burbuja del chat como en WhatsApp: la del trabajador a la derecha en el verde de los enviados (con el doble tilde
 * azul de leído) y la del bot a la izquierda en blanco, con la punta del lado de quien habla.
 */
export function ChatBubble({ from, time, className, children }: ChatBubbleProps) {
  const mine = from === 'worker';
  return (
    <div
      className={cn(
        'text-sage-950 relative max-w-[82%] rounded-lg px-2 pt-1.5 pb-1 text-[12.5px] leading-[1.35] [box-shadow:0_1px_0.5px_color-mix(in_oklch,var(--color-sage-950)_13%,transparent)]',
        mine ? 'bg-wa-outgoing self-end rounded-tr-none' : 'self-start rounded-tl-none bg-white',
        className
      )}
    >
      {/* La punta de la burbuja, del lado de quien habla. */}
      <span
        aria-hidden
        className={cn(
          'absolute top-0 size-2',
          mine
            ? 'bg-wa-outgoing -right-1.5 [clip-path:polygon(0_0,100%_0,0_100%)]'
            : '-left-1.5 bg-white [clip-path:polygon(0_0,100%_0,100%_100%)]'
        )}
      />
      {children}
      {time && (
        <span className="text-sage-500 float-right mt-1 ml-2 flex items-center gap-0.5 text-[9.5px] tabular-nums">
          {time}
          {mine && <MdDoneAll className="text-wa-read size-3.5" />}
        </span>
      )}
    </div>
  );
}
