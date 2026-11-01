import { MdArrowForward } from 'react-icons/md';
import { Badge, BadgeDot } from '@/ui/components/Badge';
import { Button } from '@/ui/components/Button';
import { Card } from '@/ui/components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui/components/Table';
import { ACTIVITIES, STATUS_BADGE } from './preview-data';

/** Actividad reciente (`RecentActivityCard` de agroconnect, versión de escritorio) con los datos del ejemplo. */
export function PreviewRecentActivity() {
  return (
    <Card className="flex min-w-0 flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-body text-foreground font-semibold">Actividad reciente</h2>
          <p className="text-caption text-muted-foreground mt-0.5">Las {ACTIVITIES.length} más recientes</p>
        </div>
        <Button variant="secondary" size="sm">
          Ver todas
          <MdArrowForward data-icon="inline-end" aria-hidden />
        </Button>
      </div>

      <div className="border-border overflow-hidden rounded-xl border">
        <Table density="compact">
          <TableHeader className="bg-surface-sunken">
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4">Actividad</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead className="pr-3">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ACTIVITIES.map((activity) => {
              const TypeIcon = activity.icon;
              return (
                <TableRow key={activity.title}>
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-surface-sunken text-foreground flex size-7 shrink-0 items-center justify-center rounded-full">
                        <TypeIcon size={15} aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="text-foreground block font-medium">{activity.title}</span>
                        <span className="text-caption text-muted-foreground block">
                          {activity.type}
                          {activity.hectares && ` · ${activity.hectares}`}
                        </span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">{activity.date}</TableCell>
                  <TableCell className="text-foreground">{activity.lot}</TableCell>
                  <TableCell>
                    <span className="text-foreground block">{activity.author}</span>
                    <span className="text-caption text-muted-foreground block">{activity.role}</span>
                  </TableCell>
                  <TableCell className="pr-3">
                    <Badge variant={STATUS_BADGE[activity.status]}>
                      <BadgeDot />
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
