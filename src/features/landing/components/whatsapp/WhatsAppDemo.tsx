'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Iphone } from '@/ui/components/iphone';
import { cn } from '@/shared/utils/cn';
import { prefersReducedMotion, useInView } from '@/shared/hooks/useInView';
import { MINI_PILL_SHADOW } from '../agents/miniShadow';
import { CHAT_HOLD_MS, CHAT_SCRIPT, UNDERSTOOD, type ChatMessage } from './chat-script';
import { ChatScreen } from './ChatScreen';

// Dónde flotan los tags de "lo que entendió la IA", alrededor del celular (como los de buzzabout).
const PILL_POSITIONS = [
  'top-[20%] left-[3%]',
  'top-[33%] right-[2%]',
  'top-[52%] left-[1%]',
  'top-[66%] right-[4%]',
];

const ALL_MESSAGES = CHAT_SCRIPT.flatMap((step) => ('message' in step ? [step.message] : []));

/**
 * El celular con el chat del campo: arranca vacío y los mensajes se van "mandando" según `CHAT_SCRIPT`, como el
 * chat animado de treble.ai. Cada vez que el bot registra algo, al costado flotan los datos que entendió la IA.
 * Corre mientras se ve y vuelve a empezar; con "reducir movimiento" se muestra el chat completo, quieto.
 */
export function WhatsAppDemo() {
  // El chat arranca con el celular casi entero a la vista: para entonces los puntos ya lo dibujaron y apareció.
  const { ref, inView } = useInView<HTMLDivElement>(0.85);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [round, setRound] = useState(0);
  const [revealed, setRevealed] = useState(false);

  // El celular aparece cuando llegan los puntos (`--reveal`, que escribe `StoryDots`): recién ahí arranca el chat.
  // Sin lienzo (reducir movimiento) ya está visible; si el lienzo nunca escribió `--reveal`, arranca a los 2,5 s.
  useEffect(() => {
    const phone = ref.current;
    if (!phone) return;
    if (prefersReducedMotion()) {
      setRevealed(true);
      return;
    }
    const check = () => {
      if (parseFloat(phone.style.getPropertyValue('--reveal')) >= 0.95) {
        setRevealed(true);
        observer.disconnect();
      }
    };
    const observer = new MutationObserver(check);
    observer.observe(phone, { attributes: true, attributeFilter: ['style'] });
    check();
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    if (!inView || revealed) return;
    const fallback = setTimeout(() => {
      if (ref.current?.style.getPropertyValue('--reveal') === '') setRevealed(true);
    }, 2500);
    return () => clearTimeout(fallback);
  }, [inView, revealed]);

  useEffect(() => {
    if (!inView || !revealed) return;
    if (prefersReducedMotion()) {
      setMessages(ALL_MESSAGES);
      return;
    }
    setMessages([]);
    setTyping(false);
    const timers = CHAT_SCRIPT.map((step) =>
      setTimeout(() => {
        if ('typing' in step) {
          setTyping(true);
          return;
        }
        setTyping(false);
        setMessages((current) => [...current, step.message]);
      }, step.at)
    );
    const last = CHAT_SCRIPT[CHAT_SCRIPT.length - 1].at;
    timers.push(setTimeout(() => setRound((r) => r + 1), last + CHAT_HOLD_MS));
    return () => timers.forEach(clearTimeout);
  }, [inView, revealed, round]);

  // La última etapa que registró el bot decide qué tags se muestran.
  const lastBot = [...messages].reverse().find((message) => message.from === 'bot');
  const stage = lastBot && 'stage' in lastBot ? lastBot.stage : null;

  return (
    <div aria-hidden className="relative flex items-center justify-center px-6 py-6">
      {/*
        El celular es el destino de los puntos de `StoryDots` (contorno redondeado, del radio de sus esquinas) y aparece
        cuando llegan. La sombra va en un filtro para que siga el contorno.
      */}
      <div
        ref={ref}
        data-story-target
        data-story-reveal
        className="w-[290px] rounded-[50px] drop-shadow-[0_30px_40px_color-mix(in_oklch,var(--color-pine)_22%,transparent)] sm:w-[320px] sm:rounded-[55px]"
      >
        <Iphone tone="dark">
          <ChatScreen messages={messages} typing={typing} />
        </Iphone>
      </div>

      {stage !== null &&
        UNDERSTOOD[stage].map((field, i) => (
          <motion.span
            key={`${stage}-${field.key}`}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.18, ease: [0.165, 0.84, 0.44, 1] }}
            className={cn(
              'text-pine absolute hidden items-center gap-1.5 rounded-full bg-white px-2.5 py-1.25 text-[11px] md:flex',
              MINI_PILL_SHADOW,
              PILL_POSITIONS[i]
            )}
          >
            <span className="text-muted-foreground font-mono text-[9px] tracking-[0.08em] uppercase">{field.key}</span>
            <span className="text-sage-300">|</span>
            {field.value}
          </motion.span>
        ))}
    </div>
  );
}
