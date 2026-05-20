import { Info, Github, Twitter, ShieldAlert } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="w-20 h-20 bg-primary/20 rounded-2xl border border-primary/50 flex items-center justify-center mb-6 shadow-[0_0_50px_-10px_rgba(139,92,246,0.5)]">
          <Info className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-6">
          About Neoanime
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          A passion project built for the anime community. Discover, track, and explore the vast universe of Japanese animation through a modern, beautiful interface.
        </p>
      </div>

      <div className="space-y-12">
        <section className="bg-card/50 border border-border/50 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-display font-bold mb-4 text-accent">The Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Neoanime was born from a desire to create an anime discovery platform that feels as dynamic and engaging as the shows themselves. We believe finding your next favorite anime should be an immersive experience, not just scrolling through a spreadsheet.
          </p>
        </section>

        <section className="bg-card/50 border border-border/50 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-display font-bold mb-4 text-primary">Technology</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This platform is powered by the incredible <a href="https://jikan.moe" target="_blank" rel="noreferrer" className="text-accent hover:underline">Jikan API</a>, the most robust open-source unofficial MyAnimeList API. The frontend is built using React, Vite, Tailwind CSS, and Framer Motion for buttery-smooth animations.
          </p>
          <div className="flex gap-4">
            <a href="#" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <Github className="w-5 h-5" /> View Source
            </a>
            <a href="#" className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
              <Twitter className="w-5 h-5" /> Follow Updates
            </a>
          </div>
        </section>

        <section className="bg-destructive/10 border border-destructive/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden">
          <ShieldAlert className="absolute -right-4 -bottom-4 w-32 h-32 text-destructive/10 pointer-events-none" />
          <h2 className="text-2xl font-display font-bold mb-4 text-destructive flex items-center gap-2">
            <ShieldAlert className="w-6 h-6" /> Legal Disclaimer
          </h2>
          <p className="text-muted-foreground leading-relaxed relative z-10">
            Neoanime is purely a discovery and metadata platform. <strong>We do not host, store, or stream any video content.</strong> All "Watch" buttons redirect users to official, legal streaming platforms such as Crunchyroll, Netflix, and Amazon Prime Video. Please support the anime industry by watching through official channels.
          </p>
        </section>
      </div>
    </div>
  );
}
