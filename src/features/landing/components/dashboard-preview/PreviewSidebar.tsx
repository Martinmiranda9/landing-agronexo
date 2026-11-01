import {
  MdAdd,
  MdMoreVert,
  MdOutlineAgriculture,
  MdOutlineHandshake,
  MdOutlineMenuOpen,
  MdOutlineSearch,
} from 'react-icons/md';
import { Avatar, AvatarFallback, InitialsAvatar } from '@/ui/components/Avatar';
import { Badge } from '@/ui/components/Badge';
import BrandMark from '@/ui/components/BrandMark';
import { IconButton } from '@/ui/components/IconButton';
import { Kbd, KbdGroup } from '@/ui/components/Kbd';
import { Separator } from '@/ui/components/Separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
} from '@/ui/components/Sidebar';
import { FARM, OTHER_FARMS, VIEWER } from './preview-data';

/** El sidebar de la app (`AppSidebar` de agroconnect) con el productor del ejemplo, dentro del campo La Esperanza. */
export function PreviewSidebar() {
  return (
    // En la app el sidebar mide la pantalla; acá se estira a la altura del tablero.
    <Sidebar aria-label="Barra lateral" className="h-auto">
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 px-1">
          <span className="flex min-w-0 items-center gap-2.5">
            <BrandMark variant="light" tile className="h-9 w-9 shrink-0" />
            <span className="flex min-w-0 flex-col">
              <span className="text-body tracking-heading text-pine leading-tight font-semibold">AgroNexo</span>
              <span className="text-caption text-muted-foreground truncate">Espacio del productor</span>
            </span>
          </span>
          <IconButton variant="ghost" size="lg" shape="round" aria-label="Contraer menú">
            <MdOutlineMenuOpen aria-hidden />
          </IconButton>
        </div>
        <SidebarItem
          variant="field"
          icon={<MdOutlineSearch size={20} aria-hidden />}
          badge={
            <KbdGroup aria-hidden>
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          }
        >
          Buscar
        </SidebarItem>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú principal</SidebarGroupLabel>
          <SidebarItem icon={<MdOutlineSearch size={20} aria-hidden />}>Buscar</SidebarItem>
          <SidebarItem
            icon={<MdOutlineHandshake size={20} aria-hidden />}
            badge={<Badge className="tabular-nums">2</Badge>}
          >
            Mis solicitudes
          </SidebarItem>
          <SidebarItem icon={<MdOutlineAgriculture size={20} aria-hidden />}>Campos</SidebarItem>
        </SidebarGroup>

        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel
            action={
              <span className="text-muted-foreground flex size-7 items-center justify-center">
                <MdAdd aria-hidden />
              </span>
            }
          >
            Mis campos
          </SidebarGroupLabel>
          <SidebarItem active icon={<InitialsAvatar initials={FARM.name[0]} size="xs" tone="inverse" />}>
            {FARM.name}
          </SidebarItem>
          {OTHER_FARMS.map((farm) => (
            <SidebarItem key={farm} icon={<InitialsAvatar initials={farm[0]} size="xs" tone="tint" />}>
              {farm}
            </SidebarItem>
          ))}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t-0">
        <div className="bg-background border-sidebar-border flex w-full items-center gap-2.5 rounded-2xl border p-2.5">
          <Avatar>
            <AvatarFallback className="bg-pine text-sage-50 font-semibold">{VIEWER.initials}</AvatarFallback>
          </Avatar>
          <span className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="text-body-sm text-foreground truncate font-semibold">{VIEWER.name}</span>
            <span className="text-caption text-muted-foreground">{VIEWER.role}</span>
          </span>
          <MdMoreVert size={20} className="text-muted-foreground shrink-0" aria-hidden />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
