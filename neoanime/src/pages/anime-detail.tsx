import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { getAnimeDetails, getAnimeCharacters, getAnimeRecommendations } from "@/lib/jikan";
import { LoadingScreen } from "@/components/loading-screen";
import { StarRating } from "@/components/star-rating";
import { StreamingDialog } from "@/components/streaming-dialog";
import { AnimeCard } from "@/components/anime-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, Star, Calendar, MonitorPlay, Users } from "lucide-react";
import { useWatchlist } from "@/hooks/use-watchlist";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AnimeDetail() {
  const { id } = useParams();
  const animeId = parseInt(id || "0", 10);
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [isStreamingOpen, setIsStreamingOpen] = useState(false);

  const { data: detailData, isLoading: loadingDetail } = useQuery({
    queryKey: ["anime", animeId],
    queryFn: () => getAnimeDetails(animeId),
    enabled: !!animeId,
  });

  const { data: charData, isLoading: loadingChars } = useQuery({
    queryKey: ["characters", animeId],
    queryFn: () => getAnimeCharacters(animeId),
    enabled: !!animeId,
  });

  const { data: recData, isLoading: loadingRecs } = useQuery({
    queryKey: ["recommendations", animeId],
    queryFn: () => getAnimeRecommendations(animeId),
    enabled: !!animeId,
  });

  if (loadingDetail || loadingChars || loadingRecs) return <LoadingScreen />;

  const anime = detailData?.data;
  if (!anime) return <div className="p-8 text-center text-destructive">Failed to load anime</div>;

  const characters = charData?.data?.slice(0, 12) || [];
  const recommendations = recData?.data?.slice(0, 10) || [];
  const isWatched = isInWatchlist(animeId);

  return (
    <div className="flex flex-col min-h-screen pb-16">
      {/* Banner */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={anime.trailer?.images?.maximum_image_url || anime.images.webp.large_image_url}
            alt="Banner"
            className="w-full h-full object-cover opacity-30 blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 -mt-[20vh] md:-mt-[30vh]">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-6 shrink-0">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="rounded-xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/20 aspect-[2/3]"
            >
              <img
                src={anime.images.webp.large_image_url}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="flex flex-col gap-4">
              <Button 
                size="lg" 
                className="w-full font-display font-bold tracking-wider text-lg bg-primary hover:bg-primary/80"
                onClick={() => setIsStreamingOpen(true)}
              >
                <Play className="w-5 h-5 mr-2" /> WATCH NOW
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`w-full font-bold ${isWatched ? 'border-primary text-primary' : ''}`}
                onClick={() => toggleWatchlist(animeId)}
              >
                <Heart className={`w-5 h-5 mr-2 ${isWatched ? 'fill-primary' : ''}`} />
                {isWatched ? "IN WATCHLIST" : "ADD TO WATCHLIST"}
              </Button>
            </div>

            <div className="bg-card/50 p-6 rounded-xl border border-border/50 flex flex-col gap-4 backdrop-blur-sm">
              <h3 className="font-display font-bold text-lg border-b border-border/50 pb-2">Information</h3>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><Star className="w-4 h-4"/> Score</span>
                <span className="font-bold text-accent">{anime.score} / 10</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><MonitorPlay className="w-4 h-4"/> Episodes</span>
                <span>{anime.episodes || "Unknown"}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4"/> Year</span>
                <span>{anime.year || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><Users className="w-4 h-4"/> Studio</span>
                <span>{anime.studios?.[0]?.name || "Unknown"}</span>
              </div>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-2">Your Rating</p>
                <StarRating id={animeId} />
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="flex-1 flex flex-col gap-8 pt-4 md:pt-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres.map((g: any) => (
                  <Badge key={g.mal_id} className="bg-primary/20 text-primary hover:bg-primary/30">
                    {g.name}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black leading-tight mb-2 text-foreground">
                {anime.title_english || anime.title}
              </h1>
              {anime.title_japanese && (
                <h2 className="text-xl text-muted-foreground font-medium mb-6">
                  {anime.title_japanese}
                </h2>
              )}
              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>{anime.synopsis}</p>
              </div>
            </motion.div>

            {/* Trailer */}
            {anime.trailer?.embed_url && (
              <div className="mt-8">
                <h3 className="text-2xl font-display font-bold mb-4">Trailer</h3>
                <div className="aspect-video w-full rounded-xl overflow-hidden border border-border/50 shadow-lg">
                  <iframe
                    src={anime.trailer.embed_url}
                    title="Trailer"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Characters */}
            {characters.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-display font-bold mb-4">Characters</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {characters.map((char: any) => (
                    <div key={char.character.mal_id} className="flex flex-col gap-2 group">
                      <div className="aspect-[3/4] rounded-lg overflow-hidden border border-border/30 relative">
                        <img
                          src={char.character.images.webp.image_url}
                          alt={char.character.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-sm">
                        <p className="font-bold line-clamp-1 text-foreground">{char.character.name}</p>
                        <p className="text-xs text-muted-foreground">{char.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-display font-bold mb-4">You might also like</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                  {recommendations.map((rec: any) => (
                    <AnimeCard
                      key={rec.entry.mal_id}
                      id={rec.entry.mal_id}
                      title={rec.entry.title}
                      image={rec.entry.images.webp.large_image_url}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <StreamingDialog 
        isOpen={isStreamingOpen} 
        onClose={() => setIsStreamingOpen(false)} 
        title={anime.title_english || anime.title}
      />
    </div>
  );
}
