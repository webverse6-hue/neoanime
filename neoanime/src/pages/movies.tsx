import { useQuery } from "@tanstack/react-query";
import { getTopMovies } from "@/lib/jikan";
import { AnimeCard } from "@/components/anime-card";
import { LoadingScreen } from "@/components/loading-screen";
import { Film } from "lucide-react";

export default function Movies() {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getTopMovies,
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Film className="w-8 h-8 text-primary" />
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Top Anime Movies
        </h1>
      </div>
      
      <p className="text-muted-foreground mb-12 max-w-2xl text-lg">
        Experience cinematic masterpieces. The highest-rated feature-length anime films of all time, brought to the big screen.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.data?.map((movie: any) => (
          <AnimeCard
            key={movie.mal_id}
            id={movie.mal_id}
            title={movie.title_english || movie.title}
            image={movie.images.webp.large_image_url}
            score={movie.score}
            year={movie.year}
            genres={movie.genres}
          />
        ))}
      </div>
    </div>
  );
}
