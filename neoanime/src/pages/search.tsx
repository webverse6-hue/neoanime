import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchAnime, getGenres } from "@/lib/jikan";
import { AnimeCard } from "@/components/anime-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Filter } from "lucide-react";
import { LoadingScreen } from "@/components/loading-screen";

export default function Search() {
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const { data: genresData } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const { data: searchResults, isLoading, isFetching } = useQuery({
    queryKey: ["search", activeQuery, selectedGenre],
    queryFn: () => searchAnime(activeQuery, selectedGenre),
    enabled: activeQuery.length > 2 || !!selectedGenre,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(query);
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-8">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-black mb-6">
          Access the Archives
        </h1>
        <form onSubmit={handleSearch} className="w-full max-w-2xl flex gap-2 relative">
          <Input
            type="text"
            placeholder="Search anime by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 bg-card/50 border-primary/30 text-lg rounded-xl focus-visible:ring-primary focus-visible:border-primary"
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
          <Button type="submit" className="h-14 px-8 text-lg font-bold tracking-wider">
            SEARCH
          </Button>
        </form>
      </div>

      {genresData?.data && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase tracking-wider text-sm">
            <Filter className="w-4 h-4" /> Filters
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGenre("")}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                !selectedGenre ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"
              }`}
            >
              All
            </button>
            {genresData.data.slice(0, 15).map((genre: any) => (
              <button
                key={genre.mal_id}
                onClick={() => setSelectedGenre(genre.mal_id.toString())}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  selectedGenre === genre.mal_id.toString() 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {isFetching && <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>}

      {!isFetching && searchResults?.data && (
        <div className="mt-8">
          <h2 className="text-xl font-display mb-6 text-muted-foreground">
            Found {searchResults.pagination?.items?.total || searchResults.data.length} results
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {searchResults.data.map((anime: any) => (
              <AnimeCard
                key={anime.mal_id}
                id={anime.mal_id}
                title={anime.title_english || anime.title}
                image={anime.images.webp.large_image_url}
                score={anime.score}
                year={anime.year}
                genres={anime.genres}
              />
            ))}
          </div>
        </div>
      )}
      
      {!isFetching && !searchResults?.data && activeQuery.length === 0 && !selectedGenre && (
        <div className="text-center py-20 text-muted-foreground">
          Enter a search term or select a genre to begin exploring.
        </div>
      )}
    </div>
  );
}
