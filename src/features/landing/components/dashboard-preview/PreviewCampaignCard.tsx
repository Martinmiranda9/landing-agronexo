import { MdOutlineCalendarMonth } from 'react-icons/md';
import { Badge } from '@/ui/components/Badge';
import { Card } from '@/ui/components/Card';
import { MeterBar } from '@/ui/components/MeterBar';
import { CAMPAIGN } from './preview-data';

/** La card de la campaña en pine (`CampaignHeroCard` de agroconnect) con los datos del ejemplo. */
export function PreviewCampaignCard() {
  return (
    <Card tone="brand" className="flex min-h-48 flex-col justify-between gap-4 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant="inverse" className="tabular-nums">
          <MdOutlineCalendarMonth aria-hidden />
          Campaña {CAMPAIGN.name}
        </Badge>
        <span className="text-caption text-sage-50/70 tabular-nums">{CAMPAIGN.range}</span>
      </div>

      <div>
        <p className="text-caption text-sage-50/70 font-medium">Sembrado</p>
        <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-display tabular-nums">{CAMPAIGN.sownHectares} ha</span>
          <span className="text-body-sm text-sage-50/80">
            de <span className="tabular-nums">{CAMPAIGN.plannedHectares}</span> ha con cultivo
          </span>
          <Badge variant="inverse" className="tabular-nums">
            {CAMPAIGN.sownProgress}
          </Badge>
        </p>
      </div>

      <div className="flex max-w-sm flex-col gap-1.5">
        <MeterBar inverse size="sm" max={1} segments={[{ value: CAMPAIGN.elapsed, tone: 'field-400' }]} />
        <p className="text-caption text-sage-50/70 flex flex-wrap justify-between gap-x-3">
          <span>
            <span className="text-sage-50 font-semibold tabular-nums">{CAMPAIGN.elapsedLabel}</span> de la campaña
          </span>
          <span>
            Cosecha de {CAMPAIGN.nextHarvest.lot} ({CAMPAIGN.nextHarvest.crop}) en{' '}
            <span className="text-sage-50 font-semibold tabular-nums">{CAMPAIGN.nextHarvest.daysLeft}</span> días
          </span>
        </p>
      </div>
    </Card>
  );
}
