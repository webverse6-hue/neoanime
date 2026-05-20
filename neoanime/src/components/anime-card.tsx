import { Link } from "wouter";
import { Star, Heart, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useWatchlist } from "@/hooks/use-watchlist";
import { motion } from "framer-motion";

export interface AnimeCardProps {
  id: number;
  title: string;
  image: string;
  score?: number;
  year?: number;
  genres?: { name: string }[];
}

export function AnimeCard({ id, title, image, score, year, genres }: AnimeCardProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const isWatched = isInWatchlist(id);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col gap-2 rounded-xl overflow-hidden bg-card/50 border border-border/50 hover:border-primary/50 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)] transition-all duration-300"
    >
      <Link href={`/anime/${id}`} className="block relative aspect-[2/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
        
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {score ? (
            <Badge variant="secondary" className="bg-background/80 backdrop-blur font-display text-accent border-accent/20">
              <Star className="w-3 h-3 mr-1 fill-accent text-accent" />
              {score}
            </Badge>
          ) : null}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWatchlist(id);
          }}
          className="absolute top-2 left-2 p-2 rounded-full bg-background/60 backdrop-blur border border-border/50 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-colors z-10"
        >
          <Heart className={`w-4 h-4 ${isWatched ? "fill-primary text-primary" : "text-foreground"}`} />
        </button>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-primary/80 text-primary-foreground rounded-full p-4 backdrop-blur-md shadow-lg shadow-primary/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <PlayCircle className="w-8 h-8" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex flex-wrap gap-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {genres?.slice(0, 2).map((g) => (
              <span key={g.name} className="text-[10px] uppercase tracking-wider bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/30">
                {g.name}
              </span>
            ))}
          </div>
          <h3 className="font-display font-bold text-sm line-clamp-2 leading-tight text-white group-hover:text-primary transition-colors">
            {title}
          </h3>
          {year && <p className="text-xs text-muted-foreground mt-1">{year}</p>}
        </div>
      </Link>
    </motion.div>
  );
}
