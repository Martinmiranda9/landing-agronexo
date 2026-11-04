'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { Badge } from '@/ui/components/Badge';
import { cn } from '@/shared/utils/cn';
import { prefersReducedMotion, useInView } from '@/shared/hooks/useInView';
import { AccountantMockup } from './mockups/AccountantMockup';
import { AgronomistMockup } from './mockups/AgronomistMockup';
import { InvestorMockup } from './mockups/InvestorMockup';
import { LawyerMockup } from './mockups/LawyerMockup';
import { ProducerMockup } from './mockups/ProducerMockup';
import { ROLES, type RoleId } from './roles-data';

const MOCKUPS: Record<RoleId, () => React.JSX.Element> = {
  producer: ProducerMockup,
  agronomist: AgronomistMockup,
  accountant: AccountantMockup,
  lawyer: LawyerMockup,
  investor: InvestorMockup,
};

// Mientras nadie elige un rol, van rotando solos.
const ROTATE_MS = 6000;

/**
 * Funcionalidades clave de cada rol, con la disposición de "Con qué trabaja" de trama.so (funciones de un lado,
 * mockup del otro) y los roles de "Your agents research, your team ships" de buzzabout.ai. Las solapas son un
 * `tablist` accesible con flechas.
 */
export function RolesSection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(false);
  const role = ROLES[index];
  const Mockup = MOCKUPS[role.id];

  useEffect(() => {
    if (!inView || picked || prefersReducedMotion()) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, [inView, picked]);

  const select = (next: number) => {
    setPicked(true);
    setIndex((next + ROLES.length) % ROLES.length);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + ROLES.length) % ROLES.length;
    select(next);
    document.getElementById(`role-tab-${ROLES[next].id}`)?.focus();
  };

  return (
    <section id="profesionales" aria-labelledby="roles-title" className="relative z-1 py-30">
      <div ref={ref} className="mx-auto max-w-350 px-6 md:px-8">
        <header className="mb-10 md:mb-14">
          <span className="border-border text-muted-foreground mb-6 inline-block rounded-full border bg-white/80 px-2.75 py-1.25 font-mono text-[11.5px] tracking-[0.1em] uppercase">
            05 · Para cada rol
          </span>
          <h2 id="roles-title" className="mb-3 text-[clamp(32px,3.4vw,52px)] leading-[1.08] font-medium tracking-[-0.04em]">
            Cada profesional,
            <span className="text-sage-400 block">sus herramientas.</span>
          </h2>
          <p className="text-muted-foreground max-w-158 text-[17px] leading-[1.5]">
            El mismo campo, visto desde cada área. Cada uno trabaja con lo suyo y el productor lo ve todo.
          </p>
        </header>

        <div role="tablist" aria-label="Roles" onKeyDown={onKeyDown} className="mb-8 flex flex-wrap gap-2">
          {ROLES.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.id}
                id={`role-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="role-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => select(i)}
                className={cn(
                  'text-body-sm h-10 rounded-full border px-4.5 font-medium transition-colors duration-150',
                  'focus-visible:ring-ring/50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  active
                    ? 'bg-pine border-pine text-sage-50'
                    : 'border-border text-pine bg-white hover:bg-sage-50'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          id="role-panel"
          role="tabpanel"
          aria-labelledby={`role-tab-${role.id}`}
          className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
        >
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {role.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <li key={`${role.id}-${feature.title}`} className="bg-sage-50 flex gap-4 rounded-xl p-5">
                  <span className="text-pine border-border flex size-10 shrink-0 items-center justify-center rounded-full border bg-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="text-pine text-[17px] leading-snug font-medium tracking-[-0.2px]">
                        {feature.title}
                      </h3>
                      {feature.soon && <Badge variant="secondary">Próximamente</Badge>}
                    </div>
                    <p className="text-body-sm text-muted-foreground mt-1 leading-[1.55]">{feature.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div
            aria-hidden
            className="bg-sage-50 relative flex min-h-90 items-center justify-center overflow-hidden rounded-xl p-6 md:p-10"
          >
            {/* Sin salida animada: el mockup nuevo entra en el acto, aunque se cambie de rol muy rápido. */}
            <motion.div
              key={role.id}
              className="w-full max-w-110"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
            >
              <Mockup />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
