import BrandMark from './BrandMark';

/** Isotipo + nombre de AgroNexo, sin contenedor ni borde; enlaza al inicio de la landing. */
export default function BrandLogo() {
  return (
    <a
      href="/"
      aria-label="AgroNexo — Inicio"
      className="focus-visible:ring-ring/50 flex min-w-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3"
    >
      <BrandMark variant="light" tile className="h-9 w-9 shrink-0" />
      <span className="text-heading-sm tracking-heading text-pine leading-tight font-semibold">
        AgroNexo
      </span>
    </a>
  );
}
