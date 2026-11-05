import BrandLogo from '@/ui/components/BrandLogo';
import { FOOTER_COLUMNS, LEGAL_LINKS, SOCIAL_LINKS } from './footer-data';

/**
 * Pie de la landing. Toma de trama.so el logo con una frase, las columnas con títulos en mono y la línea que separa,
 * pero con otra disposición: marca y redes a la izquierda, cuatro columnas a la derecha y una barra final con el
 * copyright y los legales. Va alineado con la barra de navegación (mismo ancho).
 */
export function Footer() {
  return (
    <footer className="relative z-1 [background:var(--footer-glow)]">
      <div className="mx-auto max-w-300 px-6">
        <div className="grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <BrandLogo />
            <p className="text-muted-foreground max-w-72 text-[15px] leading-[1.55]">
              El espacio de trabajo del campo y sus profesionales.
            </p>
            <ul className="mt-1 flex gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="border-border text-sage-600 hover:text-pine hover:border-sage-300 focus-visible:ring-ring/50 flex size-9 items-center justify-center rounded-full border bg-white transition-colors outline-none focus-visible:ring-2"
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Pie de página" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="text-sage-500 mb-4 font-mono text-[11.5px] leading-none font-medium tracking-[0.1em] uppercase">
                  {column.title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sage-700 hover:text-pine text-[15px] leading-[1.4] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="border-border text-sage-500 flex flex-col gap-3 border-t py-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AgroNexo. Todos los derechos reservados.</p>
          <ul className="flex gap-5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-pine transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
