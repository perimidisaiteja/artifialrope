import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingGuardian from '@/components/FloatingGuardian';

export const metadata: Metadata = {
  title: 'TruthLens AI — Your Digital Privacy Guardian',
  description: 'Detect suspicious digital media, protect personal information, and take guided action against unauthorized online content with multi-layered forensics and privacy workflows.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-cyber-bg text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        <AppProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <FloatingGuardian />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
