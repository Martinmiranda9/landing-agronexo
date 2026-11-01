'use client';

import { useEffect, useState } from 'react';

const HOLD_MS = 2200;
const ERASE_MS = 45;
const TYPE_MS = 85;
const GAP_MS = 350;

interface TypedWordProps {
  words: readonly string[];
}

/**
 * Escribe y borra las palabras una por una. Es solo visual (`aria-hidden`): el título lleva el texto completo para
 * los lectores de pantalla. Con "reducir movimiento" queda fija la primera palabra.
 */
export function TypedWord({ words }: TypedWordProps) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let index = 0;
    let current = words[0];
    let timer: ReturnType<typeof setTimeout>;

    const erase = () => {
      if (current.length > 0) {
        current = current.slice(0, -1);
        setText(current);
        timer = setTimeout(erase, ERASE_MS);
        return;
      }
      index = (index + 1) % words.length;
      timer = setTimeout(type, GAP_MS);
    };

    const type = () => {
      const word = words[index];
      if (current.length < word.length) {
        current = word.slice(0, current.length + 1);
        setText(current);
        timer = setTimeout(type, TYPE_MS);
        return;
      }
      timer = setTimeout(erase, HOLD_MS);
    };

    timer = setTimeout(erase, HOLD_MS);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span aria-hidden className="text-primary block min-h-[1.08em] max-sm:min-h-[2.16em] sm:whitespace-nowrap">
      {text}
      <span className="animate-caret ml-[0.04em] inline-block h-[0.86em] w-[0.06em] min-w-[3px] rounded-xs bg-current align-[-0.06em]" />
    </span>
  );
}
