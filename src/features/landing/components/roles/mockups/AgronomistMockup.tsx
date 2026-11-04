import { cn } from '@/shared/utils/cn';
import { MockCard } from './MockCard';

const MONTHS = ['Jul', 'Sep', 'Nov', 'Ene', 'Mar', 'May'];

// Inicio y largo de cada cultivo en meses desde julio (0–12).
const LOTS = [
  { lot: 'Lote 2', crop: 'Trigo', start: 0.5, length: 5.5, tone: 'bg-field-500' },
  { lot: 'Lote 4', crop: 'Soja 1ra', start: 4, length: 6, tone: 'bg-pine' },
  { lot: 'Lote 7', crop: 'Maíz', start: 3, length: 7, tone: 'bg-field-700' },
  { lot: 'Lote 9', crop: 'Soja 2da', start: 6, length: 5, tone: 'bg-field-300' },
];

/** Ingeniero agrónomo: el plan de la campaña, un cultivo por lote en la línea de tiempo. */
export function AgronomistMockup() {
  return (
    <MockCard eyebrow="Plan de campaña" title="2026/27 · La Esperanza">
      <div className="text-muted-foreground mb-2 ml-24 grid grid-cols-6 font-mono text-[10px] uppercase">
        {MONTHS.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
      <ul className="flex flex-col gap-2.5">
        {LOTS.map((item) => (
          <li key={item.lot} className="flex items-center gap-3">
            <span className="flex w-21 shrink-0 flex-col leading-tight">
              <span className="text-body-sm text-pine font-medium">{item.lot}</span>
              <span className="text-caption text-muted-foreground">{item.crop}</span>
            </span>
            <span className="bg-sage-50 relative h-6 flex-1 rounded-full">
              <span
                className={cn('absolute inset-y-0 rounded-full', item.tone)}
                style={{ left: `${(item.start / 12) * 100}%`, width: `${(item.length / 12) * 100}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </MockCard>
  );
}
