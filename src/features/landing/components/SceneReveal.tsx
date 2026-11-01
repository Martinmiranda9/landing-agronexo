'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface SceneRevealProps {
  children: ReactNode;
}

/**
 * Contenido de una escena: entra (fundido y 20px hacia arriba) cuando se ve el 40 % de su sección, una sola vez,
 * como `.scene-content` de buzzabout.
 */
export function SceneReveal({ children }: SceneRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = ref.current?.closest('section');
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: [0.2, 0.4, 0.6] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-in-view={inView}
      className="flex max-w-170 translate-y-5 flex-col items-center text-center opacity-0 transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] data-[in-view=true]:translate-y-0 data-[in-view=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100"
    >
      {children}
    </div>
  );
}
