import { MdOutlineNotificationsActive } from 'react-icons/md';
import { Badge, BadgeDot } from '@/ui/components/Badge';
import { MockCard } from './MockCard';

const TERMS = [
  { key: 'Tipo', value: 'Arrendamiento' },
  { key: 'Lotes', value: 'Lote 9 y Lote 11' },
  { key: 'Plazo', value: '3 campañas' },
  { key: 'Precio', value: '12 qq/ha' },
];

/** Abogado: un contrato de arrendamiento con su vencimiento cerca. */
export function LawyerMockup() {
  return (
    <MockCard
      eyebrow="Contrato"
      title="Arrendamiento · Bajo Sur"
      aside={
        <Badge variant="warning">
          <BadgeDot />
          Vence en 30 días
        </Badge>
      }
    >
      <dl className="grid grid-cols-[72px_1fr] gap-x-3 gap-y-2.5">
        {TERMS.map((term) => (
          <div key={term.key} className="contents">
            <dt className="text-muted-foreground font-mono text-[10.5px] leading-5 tracking-[0.08em] uppercase">
              {term.key}
            </dt>
            <dd className="text-body-sm text-pine">{term.value}</dd>
          </div>
        ))}
      </dl>
      {/* El aviso, prendido: tinte de estado positivo y el interruptor en pine (lo activo en la paleta). */}
      <div className="bg-pop-green border-success/20 mt-4 flex items-center gap-2.5 rounded-md border px-3 py-2.5">
        <MdOutlineNotificationsActive className="text-success-foreground size-4 shrink-0" aria-hidden />
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="text-body-sm text-pine font-medium">Aviso de renovación</span>
          <span className="text-caption text-success-foreground">Activado · antes del 1 de diciembre</span>
        </span>
        <span aria-hidden className="bg-pine flex h-5 w-9 shrink-0 items-center justify-end rounded-full p-0.5">
          <span className="size-4 rounded-full bg-white [box-shadow:var(--shadow-xs)]" />
        </span>
      </div>
    </MockCard>
  );
}
