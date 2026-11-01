import { Card } from '@/ui/components/Card';
import { MeterBar, MeterSwatch } from '@/ui/components/MeterBar';
import { LABORS } from './preview-data';

const NUMBER = new Intl.NumberFormat('es-AR');

/** Avance de labores (`LaborProgressCard` de agroconnect) con los datos del ejemplo. */
export function PreviewLaborProgress() {
  return (
    <Card className="flex min-w-0 flex-col gap-3 p-4">
      <div>
        <h2 className="text-body text-foreground font-semibold">Avance de labores</h2>
        <div className="text-caption text-muted-foreground mt-0.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <p className="tabular-nums">Sobre {NUMBER.format(LABORS[0].planned)} ha con cultivo</p>
          <ul className="flex items-center gap-3">
            <li className="flex items-center gap-1.5">
              <MeterSwatch tone="pine" className="size-2" />
              Hecho
            </li>
            <li className="flex items-center gap-1.5">
              <MeterSwatch tone="pending" className="size-2" />
              Pendiente
            </li>
          </ul>
        </div>
      </div>

      <ul className="flex flex-col gap-2.5">
        {LABORS.map((labor) => (
          <li key={labor.label}>
            <div className="text-body-sm mb-1 flex justify-between gap-2">
              <span className="text-foreground font-medium">{labor.label}</span>
              <span className="text-muted-foreground tabular-nums">
                <span className="text-foreground font-semibold">{NUMBER.format(labor.worked)}</span> /{' '}
                {NUMBER.format(labor.planned)} ha
              </span>
            </div>
            <MeterBar
              max={labor.planned}
              segments={[
                { value: labor.worked, tone: 'pine' },
                { value: labor.planned - labor.worked, tone: 'pending' },
              ]}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}
