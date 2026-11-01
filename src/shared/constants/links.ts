// Destinos externos de la landing. La app (panel) vive en otro dominio: se completa al publicar.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? '#';
export const SIGNUP_URL = `${APP_URL === '#' ? '' : APP_URL}/register`;
export const DEMO_URL = '#demo';

export const NAV_LINKS = [
  { label: 'Producto', href: '#producto', hasMenu: true },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Profesionales', href: '#profesionales' },
  { label: 'Precios', href: '#precios' },
  { label: 'Blog', href: '#blog' },
] as const;
