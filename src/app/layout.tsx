import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';
import './globals.css';

// Inter (la tipografía de Cashmere), variable: un solo archivo sirve todos los pesos.
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

// Geist Mono solo para cifras, IDs y etiquetas en mono.
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'AgroNexo — Tu campo, conectado con tus profesionales',
  description:
    'Productores, ingenieros agrónomos, contadores y asesores trabajan juntos en el mismo espacio, con los lotes, las órdenes y la campaña a la vista de todos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="bg-sage-25 text-foreground font-sans antialiased">{children}</body>
    </html>
  );
}
