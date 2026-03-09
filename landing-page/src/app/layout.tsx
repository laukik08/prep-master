import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Modern Landing Page',
  description: 'Built with Next.js, Tailwind and Framer Motion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen bg-[var(--color-background-primary)] text-white selection:bg-brand-500/30 font-sans">
        {children}
      </body>
    </html>
  );
}
