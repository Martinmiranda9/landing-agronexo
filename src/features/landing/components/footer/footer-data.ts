import type { IconType } from 'react-icons';
import { FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { APP_URL, DEMO_URL } from '@/shared/constants/links';

// Columnas del pie. Los `#` sueltos son páginas que todavía no existen: se completan al publicar.
export const FOOTER_COLUMNS = [
  {
    title: 'Producto',
    links: [
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Espacio de trabajo', href: '#espacio' },
      { label: 'WhatsApp', href: '#whatsapp' },
      { label: 'Agentes de IA', href: '#agentes' },
      { label: 'Precios', href: '#precios' },
    ],
  },
  {
    title: 'Profesionales',
    links: [
      { label: 'Productores', href: '#profesionales' },
      { label: 'Ingenieros agrónomos', href: '#profesionales' },
      { label: 'Contadores', href: '#profesionales' },
      { label: 'Abogados', href: '#profesionales' },
      { label: 'Inversores', href: '#profesionales' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Preguntas frecuentes', href: '#preguntas' },
      { label: 'Blog', href: '#blog' },
      { label: 'Agendar demo', href: DEMO_URL },
      { label: 'Ir al panel', href: APP_URL },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Nosotros', href: '#' },
      { label: 'Contacto', href: '#' },
    ],
  },
] as const;

export const LEGAL_LINKS = [
  { label: 'Privacidad', href: '#' },
  { label: 'Términos', href: '#' },
] as const;

// Las cuentas reales se completan al publicar.
export const SOCIAL_LINKS: { label: string; href: string; icon: IconType }[] = [
  { label: 'WhatsApp', href: '#', icon: FaWhatsapp },
  { label: 'Instagram', href: '#', icon: FaInstagram },
  { label: 'LinkedIn', href: '#', icon: FaLinkedinIn },
  { label: 'X', href: '#', icon: FaXTwitter },
];
