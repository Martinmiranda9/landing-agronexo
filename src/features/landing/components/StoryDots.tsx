'use client';

import { useEffect, useRef } from 'react';

/*
 * Lienzo de puntos fijo a la pantalla, con el mismo modelo que la historia de buzzabout.ai:
 *
 * - Cada escena es una sección `[data-story-scene]`, en el orden de la página, con su forma:
 *   `chips`   = puntos empaquetados en grilla dentro de cada hijo de `[data-story-target]` (botones, tags);
 *   `outline` = puntos repartidos sobre el borde redondeado de `[data-story-target]` (el campo de búsqueda, el
 *   celular de WhatsApp).
 * - Ventana de entrada de una escena: mientras su borde superior viaja del pie de la pantalla al borde de arriba.
 *   Dentro de ella los puntos pasan de la forma anterior a la nueva entre MORPH_START y MORPH_END, con curva en S y
 *   un leve abanico hacia afuera. Las formas se leen en vivo del DOM, así que viajan con el scroll: salen de arriba
 *   (la escena que se va) y caen sobre la que entra.
 * - Fundido: los puntos salen apagados del elemento anterior, se encienden al viajar y, al llegar, se apagan
 *   mientras el elemento nuevo aparece (`--reveal` de 0 a 1 en los `[data-story-reveal]`).
 * - El scroll se suaviza (SCROLL_EASE) para que los puntos floten detrás de la rueda.
 */
const SCROLL_EASE = 0.18;
const MORPH_START = 0.2;
const MORPH_END = 0.85;
const MORPH_EASE = 2;
const SPREAD = 55;
const CROSSFADE_WIDTH = 0.15;

// Tonos: en `chips` van de oscuro a claro según el chip; en `outline`, cinco tonos alternados.
const CHIP_SHADES: [string, number][] = [
  ['--color-pine', 0.9],
  ['--color-field-900', 0.9],
  ['--color-field-800', 0.9],
  ['--color-field-700', 0.88],
  ['--color-field-600', 0.86],
  ['--color-field-500', 0.84],
  ['--color-field-400', 0.82],
  ['--color-field-300', 0.78],
  ['--color-field-200', 0.72],
  ['--color-field-100', 0.65],
];
const OUTLINE_SHADES: [string, number][] = [
  ['--color-pine', 0.92],
  ['--color-field-800', 0.9],
  ['--color-field-600', 0.88],
  ['--color-field-400', 0.82],
  ['--color-field-300', 0.75],
];

type Shape = 'chips' | 'outline';

interface Dot {
  idx: number;
  spreadDx: number;
  spreadDy: number;
  spreadR: number;
  jx: number;
  jy: number;
}

interface Scene {
  el: HTMLElement;
  shape: Shape;
  target: HTMLElement | null;
  reveals: boolean;
  top: number;
  h: number;
  // Medidas del frame actual.
  rects: DOMRect[];
  radius: number;
}

type Rgba = { r: number; g: number; b: number; a: number };
type Point = { x: number; y: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const smoothstep = (t: number) => t * t * (3 - 2 * t);
const applyEase = (t: number, k: number) =>
  t <= 0.5 ? 0.5 * Math.pow(2 * t, k) : 1 - 0.5 * Math.pow(2 * (1 - t), k);

function readShades(shades: [string, number][]): Rgba[] {
  const style = getComputedStyle(document.documentElement);
  return shades.map(([token, a]) => {
    const hex = style.getPropertyValue(token).trim().replace('#', '');
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a,
    };
  });
}

/** Punto `t` (0–1) del recorrido horario por el borde de un rectángulo redondeado, desde arriba a la izquierda. */
function outlinePoint(rect: DOMRect, radius: number, t: number): Point {
  const r = Math.max(0, Math.min(radius, rect.width / 2, rect.height / 2));
  const sw = Math.max(0, rect.width - 2 * r);
  const sh = Math.max(0, rect.height - 2 * r);
  const arc = (Math.PI * r) / 2;
  const segs = [sw, arc, sh, arc, sw, arc, sh, arc];
  let pos = t * segs.reduce((a, b) => a + b, 0);
  let seg = 0;
  while (seg < segs.length - 1 && pos >= segs[seg]) {
    pos -= segs[seg];
    seg++;
  }
  const u = segs[seg] > 0 ? pos / segs[seg] : 0;
  const corner = (cx: number, cy: number, start: number) => {
    const a = start + u * (Math.PI / 2);
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
  };
  switch (seg) {
    case 0:
      return { x: rect.left + r + sw * u, y: rect.top };
    case 1:
      return corner(rect.right - r, rect.top + r, -Math.PI / 2);
    case 2:
      return { x: rect.right, y: rect.top + r + sh * u };
    case 3:
      return corner(rect.right - r, rect.bottom - r, 0);
    case 4:
      return { x: rect.right - r - sw * u, y: rect.bottom };
    case 5:
      return corner(rect.left + r, rect.bottom - r, Math.PI / 2);
    case 6:
      return { x: rect.left, y: rect.bottom - r - sh * u };
    default:
      return corner(rect.left + r, rect.top + r, Math.PI);
  }
}

export function StoryDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const chipColors = readShades(CHIP_SHADES);
    const outlineColors = readShades(OUTLINE_SHADES);

    let W = 0;
    let H = 0;
    let dotCount = 0;
    let dots: Dot[] = [];
    let scenes: Scene[] = [];
    let smoothedScrollY = window.scrollY;
    let frame = 0;

    // Densidad según el área de la pantalla: 120 en celular, ~60px entre puntos en escritorio.
    const computeDotCount = () =>
      W <= 768 ? 120 : Math.max(200, Math.min(420, Math.round((W * H) / 3600)));

    const initDots = () => {
      dots = Array.from({ length: dotCount }, (_, idx) => {
        const dir = Math.random() * Math.PI * 2;
        return {
          idx,
          spreadDx: Math.cos(dir),
          spreadDy: Math.sin(dir),
          spreadR: 0.45 + Math.random() * 0.55,
          jx: Math.random() - 0.5,
          jy: Math.random() - 0.5,
        };
      });
    };

    const computeScenes = () => {
      scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-story-scene]'), (el) => {
        const target = el.querySelector<HTMLElement>('[data-story-target]');
        return {
          el,
          shape: el.dataset.storyScene === 'outline' ? 'outline' : 'chips',
          target,
          reveals: !!target?.hasAttribute('data-story-reveal'),
          top: el.getBoundingClientRect().top + window.scrollY,
          h: el.offsetHeight,
          rects: [],
          radius: 0,
        } satisfies Scene;
      });
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      dotCount = computeDotCount();
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDots();
      computeScenes();
    };

    const readRects = () => {
      for (const scene of scenes) {
        if (!scene.target) continue;
        if (scene.shape === 'chips') {
          scene.rects = Array.from(scene.target.children, (c) => c.getBoundingClientRect());
        } else {
          scene.rects = [scene.target.getBoundingClientRect()];
          scene.radius = parseFloat(getComputedStyle(scene.target).borderTopLeftRadius) || 0;
        }
      }
    };

    // Puntos empaquetados en grilla dentro de cada chip, repartidos entre los chips.
    const chipPos = (scene: Scene, dot: Dot): Point => {
      const chips = scene.rects;
      if (!chips.length) return { x: W / 2, y: H / 2 };
      const n = chips.length;
      const rect = chips[dot.idx % n];
      const dotInChip = Math.floor(dot.idx / n);
      const perChip = Math.ceil(dotCount / n);
      const aspect = Math.max(0.1, rect.width / Math.max(1, rect.height));
      const cols = Math.min(perChip, Math.max(3, Math.round(Math.sqrt(perChip * aspect))));
      const rows = Math.ceil(perChip / cols);
      const padX = 5;
      const padY = 3;
      const cellW = Math.max(2, (rect.width - padX * 2) / cols);
      const cellH = Math.max(2, (rect.height - padY * 2) / rows);
      return {
        x: rect.left + padX + ((dotInChip % cols) + 0.5) * cellW + dot.jx * 1.4,
        y: rect.top + padY + (Math.floor(dotInChip / cols) + 0.5) * cellH + dot.jy * 1.4,
      };
    };

    const outlinePos = (scene: Scene, dot: Dot): Point => {
      const rect = scene.rects[0];
      if (!rect) return { x: W / 2, y: H / 2 };
      const p = outlinePoint(rect, scene.radius, (dot.idx + 0.5) / dotCount);
      return { x: p.x + dot.jx * 1.6, y: p.y + dot.jy * 1.6 };
    };

    const scenePos = (scene: Scene, dot: Dot) =>
      scene.shape === 'chips' ? chipPos(scene, dot) : outlinePos(scene, dot);

    const sceneColor = (scene: Scene, dot: Dot) => {
      if (scene.shape === 'outline') return outlineColors[dot.idx % outlineColors.length];
      const n = Math.max(1, scene.rects.length);
      const shade = Math.min(9, Math.round(((dot.idx % n) / Math.max(1, n - 1)) * 9));
      return chipColors[shade];
    };

    // La ventana de una escena mide lo que la anterior (mínimo una pantalla).
    const lookbackFor = (i: number) => (i <= 0 ? H : Math.max(H, scenes[i - 1]?.h ?? H));

    const computeTransition = () => {
      let idx = 0;
      for (let i = 0; i < scenes.length; i++) {
        if (smoothedScrollY >= scenes[i].top - lookbackFor(i)) idx = i;
      }
      const enterStart = (scenes[idx]?.top ?? 0) - lookbackFor(idx);
      const enterEnd = scenes[idx]?.top ?? 0;
      if (idx === 0 || smoothedScrollY >= enterEnd) return { from: idx, to: idx, t: 1, inWindow: false };
      const t = clamp((smoothedScrollY - enterStart) / (enterEnd - enterStart), 0, 1);
      return { from: idx - 1, to: idx, t, inWindow: true };
    };

    // Fundido: arranca cuando los puntos terminan de llegar y dura 15vh de scroll.
    const crossfadeT = (n: number) => {
      const scene = scenes[n];
      if (!scene) return 0;
      const crossStart = scene.top - (1 - MORPH_END) * H;
      const crossEnd = crossStart + CROSSFADE_WIDTH * H;
      return clamp((smoothedScrollY - crossStart) / Math.max(1, crossEnd - crossStart), 0, 1);
    };

    const updateReveals = () => {
      scenes.forEach((scene, i) => {
        if (scene.reveals) scene.target?.style.setProperty('--reveal', smoothstep(crossfadeT(i)).toFixed(3));
      });
    };

    const render = () => {
      smoothedScrollY += (window.scrollY - smoothedScrollY) * SCROLL_EASE;
      ctx.clearRect(0, 0, W, H);
      readRects();
      updateReveals();

      // Todas las escenas tienen su elemento: fuera de una transición los puntos están fundidos en él (no se ven).
      const tr = computeTransition();
      if (tr.inWindow) {
        const from = scenes[tr.from];
        const to = scenes[tr.to];
        let raw: number;
        if (tr.t <= MORPH_START) raw = 0;
        else if (tr.t >= MORPH_END) raw = 1;
        else raw = (tr.t - MORPH_START) / (MORPH_END - MORPH_START);
        const eased = applyEase(raw, MORPH_EASE);
        const alpha = raw < 1 ? raw : 1 - smoothstep(Math.min(1, crossfadeT(tr.to) / 0.5));

        if (alpha > 0.006) {
          for (const dot of dots) {
            const fromP = scenePos(from, dot);
            const toP = scenePos(to, dot);
            let x = lerp(fromP.x, toP.x, eased);
            let y = lerp(fromP.y, toP.y, eased);
            if (raw > 0 && raw < 1) {
              const off = SPREAD * Math.sin(Math.PI * raw) * dot.spreadR;
              x += dot.spreadDx * off;
              y += dot.spreadDy * off;
            }
            const c = eased < 0.5 ? sceneColor(from, dot) : sceneColor(to, dot);
            ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${(c.a * alpha).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(x, y, 2.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      frame = requestAnimationFrame(render);
    };

    resize();
    readRects();
    updateReveals();

    // En la parte de arriba los puntos no se ven: el ciclo arranca con el primer scroll.
    const start = () => {
      window.removeEventListener('scroll', start);
      if (!frame) frame = requestAnimationFrame(render);
    };
    if (window.scrollY > 0) start();
    else window.addEventListener('scroll', start, { passive: true });

    // Las alturas cambian cuando cargan las fuentes o cambia el ancho.
    const observer = new ResizeObserver(computeScenes);
    observer.observe(document.body);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', start);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 size-full max-md:opacity-50"
    />
  );
}
