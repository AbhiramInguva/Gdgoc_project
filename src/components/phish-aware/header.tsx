import { Shield, Newspaper, BarChartHorizontal } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary text-glow-primary" />
          <h1 className="text-2xl font-bold text-foreground tracking-tight text-glow">PhishingTracker</h1>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/stats" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <BarChartHorizontal className="h-4 w-4" />
            Stats
          </Link>
          <Link href="/news" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <Newspaper className="h-4 w-4" />
            News
          </Link>
        </nav>
      </div>
    </header>
  );
}
