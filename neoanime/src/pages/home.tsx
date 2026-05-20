import { useQuery } from "@tanstack/react-query";
import { getTopAiring, getTrending, getCurrentSeason } from "@/lib/jikan";
import { AnimeCard } from "@/components/anime-card";
import { LoadingScreen } from "@/components/loading-screen";
import { Link } from "wouter";
import { Play, TrendingUp, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: topAiring, isLoading: loadingAiring } = useQuery({
    queryKey: ["topAiring"],
    queryFn: getTopAiring,
  });

  const { data: trending, isLoading: loadingTrending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  const { data: currentSeason, isLoading: loadingSeason } = useQuery({
    queryKey: ["currentSeason"],
    queryFn: getCurrentSeason,
  });

  if (loadingAiring || loadingTrending || loadingSeason) return <LoadingScreen />;

  const heroAnime = topAiring?.data?.[0];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      {heroAnime && (
        <section className="relative w-full h-[70vh] md:h-[80vh] flex items-end justify-start overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={heroAnime.trailer?.images?.maximum_image_url || heroAnime.images.webp.large_image_url}
              alt={heroAnime.title}
              className="w-full h-full object-cover opacity-50 scale-105 animate-in fade-in zoom-in duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
          </div>
          
          <div className="container relative z-10 px-4 pb-12 md:pb-24">
            <div className="max-w-2xl animate-in slide-in-from-bottom-8 fade-in duration-700 delay-150 fill-mode-both">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                  #1 Trending Now
                </span>
                <span className="flex items-center text-accent text-sm font-display font-bold">
                  <Star className="w-4 h-4 mr-1 fill-accent" />
                  {heroAnime.score}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-4 leading-tight">
                {heroAnime.title_english || heroAnime.title}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base line-clamp-3 mb-8 max-w-xl">
                {heroAnime.synopsis}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/anime/${heroAnime.mal_id}`}>
                  <Button size="lg" className="font-display font-bold tracking-wider gap-2">
                    <Play className="w-5 h-5" /> EXPLORE ARCHIVE
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 flex flex-col gap-16">
        {/* Trending Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-display font-bold">Trending This Week</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {trending?.data?.slice(0, 10).map((anime: any, idx: number) => (
              <AnimeCard
                key={`trending-${anime.mal_id}-${idx}`}
                id={anime.mal_id}
                title={anime.title_english || anime.title}
                image={anime.images.webp.large_image_url}
                score={anime.score}
                year={anime.year}
                genres={anime.genres}
              />
            ))}
          </div>
        </section>

        {/* Current Season Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-display font-bold">Current Season</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {currentSeason?.data?.slice(0, 10).map((anime: any, idx: number) => (
              <AnimeCard
                key={`season-${anime.mal_id}-${idx}`}
                id={anime.mal_id}
                title={anime.title_english || anime.title}
                image={anime.images.webp.large_image_url}
                score={anime.score}
                year={anime.year}
                genres={anime.genres}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
