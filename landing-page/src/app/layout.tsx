import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'PrepMaster – Placement Preparation Platform',
  description: 'Your one-stop platform for placement preparation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen bg-[var(--color-background-primary)] text-white selection:bg-brand-500/30 font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
