import { MdOutlineTune } from 'react-icons/md';
import { cn } from '@/shared/utils/cn';
import { MockCard } from './MockCard';

// Retorno de ejemplo en USD por hectárea; la última campaña es estimada.
const CAMPAIGNS = [
  { name: '24/25', value: 290, estimated: false },
  { name: '25/26', value: 340, estimated: false },
  { name: '26/27', value: 385, estimated: true },
];
const MAX = 420;

/** Inversor: la rentabilidad por campaña y un escenario de precio. */
export function InvestorMockup() {
  return (
    <MockCard eyebrow="Rentabilidad" title="Retorno por campaña · USD/ha">
      <div className="flex h-36 items-end justify-around gap-4 px-2">
        {CAMPAIGNS.map((campaign) => (
          <div key={campaign.name} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-body-sm text-pine font-semibold tabular-nums">{campaign.value}</span>
            <span
              className={cn(
                'w-full max-w-14 rounded-t-md',
                campaign.estimated
                  ? 'bg-[repeating-linear-gradient(135deg,var(--color-field-300)_0_3px,var(--color-field-100)_3px_6px)]'
                  : 'bg-pine'
              )}
              style={{ height: `${(campaign.value / MAX) * 100}px` }}
            />
            <span className="text-muted-foreground font-mono text-[10.5px]">{campaign.name}</span>
          </div>
        ))}
      </div>
      <div className="bg-sage-50 text-body-sm text-pine mt-4 flex items-center gap-2 rounded-md px-3 py-2.5">
        <MdOutlineTune className="text-field-700 size-4 shrink-0" aria-hidden />
        Si la soja baja 10 %
        <span className="ml-auto font-semibold whitespace-nowrap tabular-nums">USD 331/ha</span>
      </div>
    </MockCard>
  );
}
