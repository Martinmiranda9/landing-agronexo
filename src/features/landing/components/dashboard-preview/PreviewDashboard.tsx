import {
  MdAdd,
  MdKeyboardArrowDown,
  MdOutlineChecklist,
  MdOutlineGrass,
  MdOutlineGroups,
  MdOutlineHelpOutline,
  MdOutlineInfo,
  MdOutlineMap,
  MdOutlineNotifications,
  MdOutlineSpaceDashboard,
} from 'react-icons/md';
import { Badge } from '@/ui/components/Badge';
import { Button } from '@/ui/components/Button';
import { IconButton } from '@/ui/components/IconButton';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuLinkStyle,
  navigationMenuUnderlineListStyle,
  navigationMenuUnderlineRootStyle,
} from '@/ui/components/NavigationMenu';
import { SectionHeader } from '@/ui/components/SectionHeader';
import { PreviewCampaignCard } from './PreviewCampaignCard';
import { PreviewCropSurface } from './PreviewCropSurface';
import { PreviewLaborProgress } from './PreviewLaborProgress';
import { PreviewRecentActivity } from './PreviewRecentActivity';
import { PreviewSidebar } from './PreviewSidebar';
import { PreviewStatsCard } from './PreviewStatsCard';
import { CAMPAIGN, FARM, KPIS } from './preview-data';

const TABS = [
  { label: 'Resumen', icon: <MdOutlineSpaceDashboard aria-hidden />, active: true },
  { label: 'Órdenes', icon: <MdOutlineChecklist aria-hidden />, count: KPIS.openActivities },
  { label: 'Lotes', icon: <MdOutlineMap aria-hidden /> },
  { label: 'Campaña', icon: <MdOutlineGrass aria-hidden /> },
  { label: 'Equipo', icon: <MdOutlineGroups aria-hidden /> },
];

/**
 * La solapa Resumen del campo tal como la ve el productor en la app (`AppShell` + `FarmWorkspaceFrame` +
 * `FarmDashboardScreen` de agroconnect), armada con los mismos componentes y datos de ejemplo. Es una pantalla de
 * escritorio de ancho fijo (1440 px): la escala la maneja `DashboardPreview`.
 */
export function PreviewDashboard() {
  return (
    <div data-slot="app-shell" className="bg-canvas flex">
      <PreviewSidebar />

      <div className="min-w-0 flex-1 px-6 pb-6">
        <div className="flex flex-col gap-5 pt-6">
          <SectionHeader
            as="h1"
            eyebrow={FARM.greeting}
            eyebrowTone="muted"
            title={FARM.name}
            titleAside={
              <Button variant="outline">
                <span className="text-muted-foreground">Campaña</span>
                <span className="font-semibold tabular-nums">{CAMPAIGN.name}</span>
                <MdKeyboardArrowDown data-icon="inline-end" aria-hidden />
              </Button>
            }
            description={
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>{FARM.place}</span>
                <span aria-hidden>·</span>
                <span className="text-foreground inline-flex items-center gap-1 font-medium">
                  <MdOutlineInfo aria-hidden />
                  Datos del campo
                </span>
              </span>
            }
            actions={
              <>
                <IconButton variant="surface" shape="round" size="lg" aria-label="Avisos">
                  <MdOutlineNotifications aria-hidden />
                </IconButton>
                <IconButton variant="surface" shape="round" size="lg" aria-label="Ayuda">
                  <MdOutlineHelpOutline aria-hidden />
                </IconButton>
                <Button>
                  <MdAdd data-icon="inline-start" size={18} aria-hidden />
                  Nueva orden
                </Button>
              </>
            }
          />

          <NavigationMenu aria-label="Secciones del campo" className={navigationMenuUnderlineRootStyle}>
            <NavigationMenuList className={navigationMenuUnderlineListStyle}>
              {TABS.map((tab) => (
                <NavigationMenuItem key={tab.label}>
                  <NavigationMenuLink active={tab.active} href="#" className={navigationMenuLinkStyle()}>
                    {tab.icon}
                    {tab.label}
                    {tab.count && <Badge className="tabular-nums">{tab.count}</Badge>}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="grid grid-cols-[2fr_3fr] gap-4">
            <PreviewCampaignCard />
            <PreviewStatsCard />
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_18rem] items-start gap-4">
            <PreviewRecentActivity />
            <div className="flex min-w-0 flex-col gap-4">
              <PreviewCropSurface />
              <PreviewLaborProgress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
