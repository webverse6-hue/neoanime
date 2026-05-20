import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SiCrunchyroll, SiNetflix } from "react-icons/si";
import { Play, ShoppingCart, Tv } from "lucide-react";

interface StreamingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function StreamingDialog({ isOpen, onClose, title }: StreamingDialogProps) {
  const encodedTitle = encodeURIComponent(title);

  const freePlatforms = [
    {
      name: "AnimeSalt",
      icon: <Tv className="w-6 h-6 text-[#22d3ee]" />,
      url: `https://animesalt.ac`,
      color: "hover:bg-[#22d3ee]/20 hover:border-[#22d3ee]/50",
      badge: "Free",
    },
    {
      name: "AnimeWorld",
      icon: <Tv className="w-6 h-6 text-[#34d399]" />,
      url: `https://watchanimeworld.net`,
      color: "hover:bg-[#34d399]/20 hover:border-[#34d399]/50",
      badge: "Free",
    },
    {
      name: "AniWatch",
      icon: <Tv className="w-6 h-6 text-[#a78bfa]" />,
      url: `https://animewatchtv.su`,
      color: "hover:bg-[#a78bfa]/20 hover:border-[#a78bfa]/50",
      badge: "Free",
    },
    {
      name: "9Anime",
      icon: <Tv className="w-6 h-6 text-[#f472b6]" />,
      url: `https://animewatchtv.su`,
      color: "hover:bg-[#f472b6]/20 hover:border-[#f472b6]/50",
      badge: "Free",
    },
  ];

  const paidPlatforms = [
    {
      name: "Crunchyroll",
      icon: <SiCrunchyroll className="w-6 h-6 text-[#F47521]" />,
      url: `https://www.crunchyroll.com/search?q=${encodedTitle}`,
      color: "hover:bg-[#F47521]/20 hover:border-[#F47521]/50",
      badge: "Subscription",
    },
    {
      name: "Netflix",
      icon: <SiNetflix className="w-6 h-6 text-[#E50914]" />,
      url: `https://www.netflix.com/search?q=${encodedTitle}`,
      color: "hover:bg-[#E50914]/20 hover:border-[#E50914]/50",
      badge: "Subscription",
    },
    {
      name: "Amazon Prime",
      icon: <ShoppingCart className="w-6 h-6 text-[#00A8E1]" />,
      url: `https://www.amazon.com/s?k=${encodedTitle}+anime`,
      color: "hover:bg-[#00A8E1]/20 hover:border-[#00A8E1]/50",
      badge: "Subscription",
    },
    {
      name: "Funimation",
      icon: <Play className="w-6 h-6 text-[#7c3aed]" />,
      url: `https://www.funimation.com/search/?q=${encodedTitle}`,
      color: "hover:bg-[#7c3aed]/20 hover:border-[#7c3aed]/50",
      badge: "Subscription",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card/90 backdrop-blur-xl border-border/50 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display tracking-wider text-xl">Watch {title}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            This website does not host or stream anime. Clicking a platform redirects you to an external streaming service.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-2">
          {/* Free Platforms */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold tracking-widest uppercase text-[#22d3ee]">Free Platforms</span>
              <div className="flex-1 h-px bg-[#22d3ee]/20" />
            </div>
            <div className="grid gap-2">
              {freePlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-platform-${platform.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-background/50 transition-all duration-300 group ${platform.color}`}
                >
                  {platform.icon}
                  <span className="font-semibold text-sm flex-1">{platform.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22d3ee]/15 text-[#22d3ee] border border-[#22d3ee]/30">
                    {platform.badge}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Paid Platforms */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold tracking-widest uppercase text-[#F47521]">Official / Paid Platforms</span>
              <div className="flex-1 h-px bg-[#F47521]/20" />
            </div>
            <div className="grid gap-2">
              {paidPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-platform-${platform.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-background/50 transition-all duration-300 group ${platform.color}`}
                >
                  {platform.icon}
                  <span className="font-semibold text-sm flex-1">{platform.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                    {platform.badge}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
