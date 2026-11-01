import { MdOutlinePriorityHigh } from 'react-icons/md';
import { Alert, AlertDescription } from '@/ui/components/Alert';
import { Card } from '@/ui/components/Card';
import { MeterBar, MeterSwatch } from '@/ui/components/MeterBar';
import { CAMPAIGN, CROPS, KPIS, WITHOUT_CROP } from './preview-data';

const NUMBER = new Intl.NumberFormat('es-AR');

/** Superficie por cultivo (`CropSurfaceCard` de agroconnect) con los datos del ejemplo. */
export function PreviewCropSurface() {
  return (
    <Card className="flex min-w-0 flex-col gap-3 p-4">
      <div>
        <h2 className="text-body text-foreground font-semibold">Superficie por cultivo</h2>
        <p className="text-caption text-muted-foreground mt-0.5 tabular-nums">
          {KPIS.lotHectares} ha en lotes · {CAMPAIGN.name}
        </p>
      </div>

      <MeterBar
        gap
        size="lg"
        segments={[
          ...CROPS.map((crop) => ({ value: crop.hectares, tone: crop.tone })),
          { value: WITHOUT_CROP.hectares, tone: 'muted' as const },
        ]}
      />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
        {CROPS.map((crop) => (
          <li key={crop.label} className="text-body-sm flex items-center gap-2">
            <MeterSwatch tone={crop.tone} />
            <span className="text-foreground flex-1 truncate">{crop.label}</span>
            <span className="text-foreground font-semibold tabular-nums">{NUMBER.format(crop.hectares)}</span>
          </li>
        ))}
      </ul>

      <Alert variant="warning" className="mt-auto py-2.5">
        <MdOutlinePriorityHigh aria-hidden />
        <AlertDescription>
          <span className="text-foreground font-semibold tabular-nums">{WITHOUT_CROP.hectares} ha</span> sin cultivo:{' '}
          {WITHOUT_CROP.lots}.
        </AlertDescription>
      </Alert>
    </Card>
  );
}
