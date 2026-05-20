import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Search, Film, Tv, Users, Newspaper, Info } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home", icon: Tv },
    { href: "/movies", label: "Movies", icon: Film },
    { href: "/characters", label: "Characters", icon: Users },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/search", label: "Search", icon: Search },
    { href: "/about", label: "About", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4 justify-between">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <span className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NEOANIME
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex md:hidden">
            {/* Mobile menu could go here */}
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="border-t border-border/40 py-8 mt-12 bg-card/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-display tracking-widest text-primary/50 mb-4">NEOANIME</p>
          <p>© {new Date().getFullYear()} Neoanime. Not a streaming service.</p>
          <p className="mt-2 text-xs opacity-60">Data provided by Jikan API</p>
        </div>
      </footer>
    </div>
  );
}
