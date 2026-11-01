import type { IconType } from 'react-icons';
import {
  MdOutlineAssignment,
  MdOutlineGrass,
  MdOutlineScience,
  MdOutlineVisibility,
  MdOutlineWaterDrop,
} from 'react-icons/md';
import type { MeterTone } from '@/ui/components/MeterBar';

/*
 * Datos de ejemplo del tablero que muestra la landing: un campo inventado en Río Cuarto. Las personas y el campo son
 * ficticios; las cifras son coherentes entre sí (las hectáreas de los cultivos suman las de los lotes).
 */

export const VIEWER = { initials: 'JP', name: 'Julián Paz', role: 'Productor' };

export const FARM = {
  name: 'La Esperanza',
  greeting: 'Buenas tardes, Julián',
  place: 'Río Cuarto, Córdoba',
};

export const OTHER_FARMS = ['El Trébol', 'Santa Rosa'];

export const CAMPAIGN = {
  name: '2026/27',
  range: '1 jul 2026 – 30 jun 2027',
  sownHectares: '400',
  plannedHectares: '1.060',
  sownProgress: '38 %',
  elapsed: 0.34,
  elapsedLabel: '34 %',
  nextHarvest: { lot: 'Lote 2', crop: 'trigo', daysLeft: 38 },
};

export const KPIS = {
  totalHectares: '1.250',
  lotHectares: '1.180',
  unassignedHectares: '70',
  cropCount: 3,
  topCrop: { label: 'Soja', hectares: '520' },
  openActivities: 6,
  createdThisWeek: 4,
  completedThisWeek: 3,
  teamSize: 3,
  teamRoles: 3,
  newMembers: 1,
};

export const CROPS: { label: string; hectares: number; tone: MeterTone }[] = [
  { label: 'Soja', hectares: 520, tone: 'pine' },
  { label: 'Maíz', hectares: 300, tone: 'field-700' },
  { label: 'Trigo', hectares: 240, tone: 'field-500' },
];

export const WITHOUT_CROP = { hectares: 120, lots: 'Lote 9 y Lote 11' };

export const LABORS = [
  { label: 'Siembra', worked: 400, planned: 1060 },
  { label: 'Fertilización', worked: 520, planned: 1060 },
  { label: 'Pulverización', worked: 240, planned: 1060 },
];

export type PreviewStatus = 'Pendiente' | 'En proceso' | 'Finalizado';

export const STATUS_BADGE: Record<PreviewStatus, 'warning' | 'secondary' | 'success'> = {
  Pendiente: 'warning',
  'En proceso': 'secondary',
  Finalizado: 'success',
};

export const ACTIVITIES: {
  title: string;
  type: string;
  icon: IconType;
  hectares?: string;
  date: string;
  lot: string;
  author: string;
  role: string;
  status: PreviewStatus;
}[] = [
  {
    title: 'Pulverización de barbecho',
    type: 'Pulverización',
    icon: MdOutlineWaterDrop,
    hectares: '120 ha',
    date: '30 oct',
    lot: 'Lote 7',
    author: 'Lucía Ferrero',
    role: 'Ingeniera agrónoma',
    status: 'Pendiente',
  },
  {
    title: 'Siembra de soja 1ra',
    type: 'Siembra',
    icon: MdOutlineGrass,
    hectares: '180 ha',
    date: '28 oct',
    lot: 'Lote 4',
    author: 'Julián Paz',
    role: 'Productor',
    status: 'En proceso',
  },
  {
    title: 'Fertilización de trigo',
    type: 'Fertilización',
    icon: MdOutlineScience,
    hectares: '240 ha',
    date: '22 oct',
    lot: 'Lote 2',
    author: 'Lucía Ferrero',
    role: 'Ingeniera agrónoma',
    status: 'Finalizado',
  },
  {
    title: 'Monitoreo de malezas',
    type: 'Monitoreo',
    icon: MdOutlineVisibility,
    date: '20 oct',
    lot: 'Lote 9',
    author: 'Lucía Ferrero',
    role: 'Ingeniera agrónoma',
    status: 'Finalizado',
  },
  {
    title: 'Costo de insumos cargado',
    type: 'Tarea',
    icon: MdOutlineAssignment,
    date: '18 oct',
    lot: 'Todo el campo',
    author: 'Pablo Sosa',
    role: 'Contador',
    status: 'Finalizado',
  },
];
