'use client';

import { useEffect, useState } from 'react';
import { MdArrowForward } from 'react-icons/md';
import { Button } from '@/ui/components/Button';
import { SIGNUP_URL } from '@/shared/constants/links';
import { cn } from '@/shared/utils/cn';
import { prefersReducedMotion, useInView } from '@/shared/hooks/useInView';

/**
 * Cierre de la landing: el recuadro del final de trama.so con un video de cosecha de fondo, oscurecido en los bordes
 * como el hero de fielddata.ag. La cosechadora va a la derecha y el texto a la izquierda, sobre un degradé oscuro.
 * El video (loop de ida y vuelta, sin audio) se descarga recién cuando la sección se acerca; hasta entonces y con
 * "reducir movimiento" se ve su primer cuadro.
 */
/**
 * React no escribe el atributo `muted` en el HTML, y sin él el navegador bloquea el autoplay de un video montado
 * después de la carga: se silencia y se arranca a mano.
 */
function startMuted(video: HTMLVideoElement | null) {
  if (!video) return;
  video.muted = true;
  video.play().catch(() => {});
}

export function CtaSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0);
  const [playVideo, setPlayVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (inView && !prefersReducedMotion()) setPlayVideo(true);
  }, [inView]);

  return (
    <section id="empezar" aria-labelledby="cta-title" className="relative z-1 py-24 md:py-30">
      <div className="mx-auto max-w-350 px-6 md:px-8">
        <div
          ref={ref}
          className="border-border bg-pine relative isolate flex min-h-120 items-end overflow-hidden rounded-[28px] border [box-shadow:var(--shadow-lg)] md:min-h-130 md:items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- imagen fija del video, decorativa */}
          <img
            src="/videos/cosecha-poster.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 -z-1 size-full object-cover object-[75%_70%]"
          />
          {playVideo && (
            <video
              ref={startMuted}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
              onPlaying={() => setVideoReady(true)}
              className={cn(
                'absolute inset-0 -z-1 size-full object-cover object-[75%_70%] transition-opacity duration-700',
                videoReady ? 'opacity-100' : 'opacity-0'
              )}
            >
              <source src="/videos/cosecha.webm" type="video/webm" />
              <source src="/videos/cosecha.mp4" type="video/mp4" />
            </video>
          )}

          {/* Degradé para el texto: de abajo en celular, de la izquierda desde md. */}
          <span
            aria-hidden
            className="absolute inset-0 -z-1 bg-linear-to-t from-black/85 via-black/45 to-black/10 md:bg-linear-to-r md:from-black/80 md:via-black/45 md:via-45% md:to-transparent md:to-75%"
          />
          {/* Bordes más oscuros, como el hero de fielddata. */}
          <span aria-hidden className="absolute inset-0 -z-1 [box-shadow:inset_0_0_140px_40px_rgb(0_0_0/0.45)]" />

          <div className="max-w-140 px-7 py-12 md:px-14 lg:px-18">
            <h2
              id="cta-title"
              className="text-[clamp(32px,3.8vw,52px)] leading-[1.08] font-semibold tracking-[-0.04em] text-white"
            >
              Sumá a tu equipo a AgroNexo hoy.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.5] text-white/75">
              Empezá gratis y sumá a tus profesionales cuando quieras.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <a href={SIGNUP_URL}>
                Empezá ahora
                <MdArrowForward className="transition-transform group-hover/button:translate-x-0.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
