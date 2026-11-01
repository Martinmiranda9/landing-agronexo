import { MdOutlineGroups, MdOutlineLandscape, MdOutlineSpa, MdOutlineTaskAlt } from 'react-icons/md';
import { Badge } from '@/ui/components/Badge';
import { Card } from '@/ui/components/Card';
import { StatCard } from '@/ui/components/StatCard';
import { KPIS } from './preview-data';

/** Las cuatro cifras del campo (`FarmStatsCard` de agroconnect) con los datos del ejemplo. */
export function PreviewStatsCard() {
  return (
    <Card className="grid min-w-0 grid-cols-2 gap-2 p-2">
      <StatCard
        tone="tile"
        density="compact"
        className="p-3"
        label="Superficie del campo"
        value={KPIS.totalHectares}
        unit="ha"
        icon={<MdOutlineLandscape aria-hidden />}
        description={
          <>
            <Badge variant="success" className="tabular-nums">
              {KPIS.lotHectares} ha en lotes
            </Badge>
            <span className="truncate tabular-nums">{KPIS.unassignedHectares} sin asignar</span>
          </>
        }
      />
      <StatCard
        tone="tile"
        density="compact"
        className="p-3"
        label="Cultivos"
        value={KPIS.cropCount}
        icon={<MdOutlineSpa aria-hidden />}
        description={
          <>
            <Badge variant="success" className="tabular-nums">
              {KPIS.topCrop.hectares} ha
            </Badge>
            <span className="truncate">{KPIS.topCrop.label}, el de más superficie</span>
          </>
        }
      />
      <StatCard
        tone="tile"
        density="compact"
        className="p-3"
        label="En curso"
        value={KPIS.openActivities}
        icon={<MdOutlineTaskAlt aria-hidden />}
        description={
          <>
            <Badge variant="success" className="tabular-nums">
              +{KPIS.createdThisWeek}
            </Badge>
            <span className="truncate">esta semana · {KPIS.completedThisWeek} finalizadas</span>
          </>
        }
      />
      <StatCard
        tone="tile"
        density="compact"
        className="p-3"
        label="Equipo"
        value={KPIS.teamSize}
        unit="profesionales"
        icon={<MdOutlineGroups aria-hidden />}
        description={
          <>
            <Badge variant="secondary" className="tabular-nums">
              {KPIS.teamRoles} roles
            </Badge>
            <span className="truncate">{KPIS.newMembers} nuevo esta semana</span>
          </>
        }
      />
    </Card>
  );
}
