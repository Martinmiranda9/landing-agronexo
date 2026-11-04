import type { IconType } from 'react-icons';
import {
  MdOutlineAgriculture,
  MdOutlineAssignment,
  MdOutlineBarChart,
  MdOutlineCalendarMonth,
  MdOutlineCompareArrows,
  MdOutlineDescription,
  MdOutlineFolder,
  MdOutlineGavel,
  MdOutlineGroupAdd,
  MdOutlineHandshake,
  MdOutlineLock,
  MdOutlineMap,
  MdOutlineNotificationsActive,
  MdOutlinePaid,
  MdOutlineReceiptLong,
  MdOutlineSpaceDashboard,
  MdOutlineTaskAlt,
  MdOutlineTrendingUp,
  MdOutlineTune,
  MdOutlineVisibility,
} from 'react-icons/md';

export type RoleId = 'producer' | 'agronomist' | 'accountant' | 'lawyer' | 'investor';

export interface RoleFeature {
  icon: IconType;
  title: string;
  description: string;
  /** Todavía no está en la app: lleva la pill "Próximamente". */
  soon?: boolean;
}

export interface Role {
  id: RoleId;
  label: string;
  features: RoleFeature[];
}

/*
 * Funcionalidades clave de cada rol. `soon` marca lo que hoy no existe en agroconnect (ver
 * ia/frontend_implementation_plan.md): se muestra como visión hasta que esté. Fuera de alcance según ia/agent.md:
 * liquidación de impuestos e inversión patrimonial (por eso el contador registra liquidaciones de granos, no
 * impuestos, y el inversor mira la rentabilidad del campo, no una cartera).
 */
export const ROLES: Role[] = [
  {
    id: 'producer',
    label: 'Productor',
    features: [
      {
        icon: MdOutlineSpaceDashboard,
        title: 'Todo el campo en un tablero',
        description: 'Agronomía, costos, contratos y rentabilidad de todas las áreas, en un solo lugar.',
      },
      {
        icon: MdOutlineGroupAdd,
        title: 'Armá tu equipo',
        description: 'Buscá profesionales de tu zona, mandá la solicitud y sumalos a tu campo.',
      },
      {
        icon: MdOutlineLock,
        title: 'Vos decidís quién ve qué',
        description: 'Cada profesional accede a su área. El campo es tuyo y solo vos lo cerrás.',
      },
      {
        icon: MdOutlineTaskAlt,
        title: 'Aprobá lo importante',
        description: 'Órdenes, gastos y contratos te llegan como borradores para confirmar.',
        soon: true,
      },
    ],
  },
  {
    id: 'agronomist',
    label: 'Ing. agrónomo',
    features: [
      {
        icon: MdOutlineCalendarMonth,
        title: 'Planificá la campaña',
        description: 'Qué cultivo va en cada lote, las rotaciones y las fechas de siembra y cosecha.',
      },
      {
        icon: MdOutlineMap,
        title: 'Lotes en el mapa',
        description: 'Importados desde el KMZ, con su superficie, listos para trabajar.',
      },
      {
        icon: MdOutlineAssignment,
        title: 'Órdenes y recetas',
        description: 'Siembra, pulverización y fertilización con producto, dosis y lote, asignadas al contratista.',
      },
      {
        icon: MdOutlineVisibility,
        title: 'Monitoreos',
        description: 'Recorridas con plagas, malezas y fotos, para que el productor vea lo que viste.',
        soon: true,
      },
    ],
  },
  {
    id: 'accountant',
    label: 'Contador',
    features: [
      {
        icon: MdOutlinePaid,
        title: 'Costos por lote y campaña',
        description: 'Insumos, labores y contratistas, con el costo por hectárea al día.',
        soon: true,
      },
      {
        icon: MdOutlineBarChart,
        title: 'Margen bruto por cultivo',
        description: 'Cuánto deja la soja contra el maíz, lote por lote.',
        soon: true,
      },
      {
        icon: MdOutlineAgriculture,
        title: 'Ventas y liquidaciones de granos',
        description: 'Cada venta con su liquidación y su carta de porte, registrada en el campo.',
        soon: true,
      },
      {
        icon: MdOutlineReceiptLong,
        title: 'Comprobantes en su lugar',
        description: 'Cada factura asociada a la labor que la generó.',
        soon: true,
      },
    ],
  },
  {
    id: 'lawyer',
    label: 'Abogado',
    features: [
      {
        icon: MdOutlineGavel,
        title: 'Arrendamientos y aparcerías',
        description: 'Cada contrato con sus cláusulas, plazos y renovaciones.',
        soon: true,
      },
      {
        icon: MdOutlineHandshake,
        title: 'Contratos de servicios',
        description: 'Los acuerdos con contratistas y proveedores del campo.',
        soon: true,
      },
      {
        icon: MdOutlineFolder,
        title: 'Documentación del campo',
        description: 'Títulos, catastro, RENSPA, seguros y habilitaciones, siempre a mano.',
        soon: true,
      },
      {
        icon: MdOutlineNotificationsActive,
        title: 'Alertas de vencimiento',
        description: 'Te avisa antes de que venza un contrato o un trámite.',
        soon: true,
      },
    ],
  },
  {
    id: 'investor',
    label: 'Inversor',
    features: [
      {
        icon: MdOutlineTrendingUp,
        title: 'Rentabilidad por campaña',
        description: 'El retorno por hectárea y cómo se compara con las campañas anteriores.',
        soon: true,
      },
      {
        icon: MdOutlineTune,
        title: 'Escenarios de precio y rinde',
        description: 'Qué pasa con el margen si baja el precio o cae el rinde.',
        soon: true,
      },
      {
        icon: MdOutlineCompareArrows,
        title: 'Presupuesto contra real',
        description: 'Lo planificado al empezar la campaña contra lo invertido hasta hoy.',
        soon: true,
      },
      {
        icon: MdOutlineDescription,
        title: 'Reportes para socios',
        description: 'Informes periódicos del campo, listos para compartir.',
        soon: true,
      },
    ],
  },
];
