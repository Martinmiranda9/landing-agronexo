import {
  MdAdd,
  MdArrowBackIosNew,
  MdOutlineCall,
  MdOutlineMic,
  MdOutlinePhotoCamera,
  MdOutlineVideocam,
} from 'react-icons/md';
import { motion } from 'motion/react';
import BrandMark from '@/ui/components/BrandMark';
import { AudioNote } from './AudioNote';
import { ChatBubble } from './ChatBubble';
import type { ChatMessage } from './chat-script';
import { PhotoNote } from './PhotoNote';
import { RecordSummary } from './RecordSummary';
import { TypingDots } from './TypingDots';

interface ChatScreenProps {
  messages: ChatMessage[];
  typing: boolean;
}

/**
 * La pantalla del chat como en WhatsApp para iPhone: barra de arriba con el contacto (el número de AgroNexo de
 * La Esperanza), el fondo beige con dibujitos, los mensajes apilados desde abajo (los viejos se van por arriba) y la
 * barra para escribir con el micrófono.
 */
export function ChatScreen({ messages, typing }: ChatScreenProps) {
  return (
    <div className="bg-wa-wallpaper flex size-full flex-col">
      {/* El padding de arriba deja lugar a la isla dinámica del marco. */}
      <div className="bg-wa-bar border-sage-200 flex items-center gap-2 border-b px-2.5 pt-10.5 pb-2">
        <MdArrowBackIosNew className="text-wa-teal size-4" />
        <BrandMark variant="light" tile className="size-8 shrink-0 rounded-full" />
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="text-sage-950 truncate text-[13px] font-semibold">AgroNexo</span>
          <span className="text-sage-500 truncate text-[10.5px]">
            {typing ? 'escribiendo…' : 'La Esperanza · en línea'}
          </span>
        </span>
        <MdOutlineVideocam className="text-wa-teal size-5" />
        <MdOutlineCall className="text-wa-teal size-4.5" />
      </div>

      <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 py-3">
        <span className="bg-wa-bar text-sage-600 mb-1 self-center rounded-md px-2 py-0.5 text-[10px] [box-shadow:0_1px_0.5px_color-mix(in_oklch,var(--color-sage-950)_13%,transparent)]">
          Hoy
        </span>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout="position"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.165, 0.84, 0.44, 1] }}
            className={`flex ${message.from === 'worker' ? 'justify-end' : 'justify-start'}`}
          >
            <ChatBubble from={message.from} time={message.time}>
              {message.kind === 'audio' && <AudioNote duration={message.duration} />}
              {message.kind === 'photo' && <PhotoNote caption={message.caption} />}
              {message.kind === 'record' && <RecordSummary intro={message.intro} fields={message.fields} />}
              {message.kind === 'text' && (
                <span className="block max-w-48">
                  {message.text}
                  {message.from === 'bot' && message.source && (
                    <span className="bg-wa-wallpaper text-sage-600 mt-1.5 block w-fit rounded-full px-1.5 py-px font-mono text-[9px]">
                      Fuente · {message.source}
                    </span>
                  )}
                </span>
              )}
            </ChatBubble>
          </motion.div>
        ))}
        {typing && (
          <motion.div layout="position" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <ChatBubble from="bot" className="px-3 py-2">
              <TypingDots />
            </ChatBubble>
          </motion.div>
        )}
      </div>

      <div className="bg-wa-bar flex items-center gap-2 px-2.5 pt-2 pb-6">
        <MdAdd className="text-wa-teal size-5.5 shrink-0" />
        <span className="border-sage-200 text-sage-400 flex h-8 flex-1 items-center justify-end rounded-full border bg-white px-3 text-[12px]">
          <MdOutlinePhotoCamera className="text-wa-teal size-4" />
        </span>
        <MdOutlineMic className="text-wa-teal size-5.5 shrink-0" />
      </div>
    </div>
  );
}
