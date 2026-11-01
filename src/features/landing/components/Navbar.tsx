'use client';

import { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdOutlineLanguage } from 'react-icons/md';
import { Button } from '@/ui/components/Button';
import BrandLogo from '@/ui/components/BrandLogo';
import { cn } from '@/shared/utils/cn';
import { APP_URL, NAV_LINKS } from '@/shared/constants/links';

/**
 * Barra fija arriba, en tres columnas iguales a los lados: así los links quedan siempre en el centro exacto de la
 * página, sin importar el ancho del logo o de las acciones. Transparente sobre el hero; al bajar toma fondo y borde.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200',
        scrolled ? 'border-border bg-sage-25/85 backdrop-blur-md' : 'border-transparent'
      )}
    >
      <div className="mx-auto grid h-18 max-w-300 grid-cols-[1fr_auto_1fr] items-center gap-6 px-6">
        <div className="justify-self-start">
          <BrandLogo />
        </div>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-body-sm text-muted-foreground hover:text-pine focus-visible:ring-ring/50 inline-flex items-center gap-1 rounded-md font-medium transition-colors outline-none focus-visible:ring-2"
                >
                  {link.label}
                  {'hasMenu' in link && <MdKeyboardArrowDown aria-hidden className="size-4" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-start-3 flex items-center gap-4 justify-self-end">
          <Button variant="ghost" size="sm" className="max-sm:hidden" aria-label="Idioma: español">
            <MdOutlineLanguage aria-hidden />
            ES
          </Button>
          <Button variant="surface" asChild>
            <a href={APP_URL}>Ir al panel</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
