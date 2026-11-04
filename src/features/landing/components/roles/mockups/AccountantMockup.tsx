import { MdCheckCircle } from 'react-icons/md';
import { MeterBar } from '@/ui/components/MeterBar';
import type { MeterTone } from '@/ui/components/MeterBar';
import { MockCard } from './MockCard';

// Valores de ejemplo, en USD por hectárea.
const MARGINS: { crop: string; value: number; tone: MeterTone }[] = [
  { crop: 'Soja', value: 410, tone: 'pine' },
  { crop: 'Maíz', value: 365, tone: 'field-700' },
  { crop: 'Trigo', value: 220, tone: 'field-500' },
];
const MAX = 450;

/** Contador: el margen bruto por cultivo y una liquidación de granos registrada. */
export function AccountantMockup() {
  return (
    <MockCard eyebrow="Margen bruto" title="Por cultivo · USD/ha">
      <ul className="flex flex-col gap-3">
        {MARGINS.map((item) => (
          <li key={item.crop}>
            <div className="text-body-sm mb-1 flex justify-between">
              <span className="text-pine font-medium">{item.crop}</span>
              <span className="text-pine font-semibold tabular-nums">{item.value}</span>
            </div>
            <MeterBar max={MAX} size="lg" segments={[{ value: item.value, tone: item.tone }]} />
          </li>
        ))}
      </ul>
      <div className="border-border text-body-sm mt-4 flex items-center gap-2 border-t pt-3.5">
        <MdCheckCircle className="text-status-green size-4 shrink-0" aria-hidden />
        <span className="text-pine">Liquidación de soja registrada</span>
        <span className="text-muted-foreground ml-auto font-mono text-[11px] tabular-nums">320 t</span>
      </div>
    </MockCard>
  );
}
