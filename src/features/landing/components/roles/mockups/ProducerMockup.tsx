import { Badge, BadgeDot } from '@/ui/components/Badge';
import { MockCard } from './MockCard';

const AREAS = [
  { area: 'Agronomía', status: '6 labores en curso', tone: 'success' as const },
  { area: 'Contabilidad', status: 'Costos al día', tone: 'success' as const },
  { area: 'Legales', status: '1 contrato por vencer', tone: 'warning' as const },
  { area: 'Inversión', status: 'Margen sobre presupuesto', tone: 'success' as const },
];

/** Productor: su campo con el estado de cada área. */
export function ProducerMockup() {
  return (
    <MockCard
      eyebrow="Tu campo"
      title="La Esperanza"
      aside={
        <Badge variant="surface">
          <BadgeDot className="text-field-700" />
          Acceso completo
        </Badge>
      }
    >
      <ul>
        {AREAS.map((item) => (
          <li
            key={item.area}
            className="border-border flex items-center justify-between gap-3 border-t py-3 first:border-t-0"
          >
            <span className="text-body-sm text-pine font-medium">{item.area}</span>
            <Badge variant={item.tone}>
              <BadgeDot />
              {item.status}
            </Badge>
          </li>
        ))}
      </ul>
    </MockCard>
  );
}
