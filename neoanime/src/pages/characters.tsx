import { useQuery } from "@tanstack/react-query";
import { getTopCharacters } from "@/lib/jikan";
import { LoadingScreen } from "@/components/loading-screen";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Characters() {
  const { data: characters, isLoading } = useQuery({
    queryKey: ["topCharacters"],
    queryFn: getTopCharacters,
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Users className="w-8 h-8 text-accent" />
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
          Iconic Characters
        </h1>
      </div>
      
      <p className="text-muted-foreground mb-12 max-w-2xl text-lg">
        The faces that defined generations. Explore the most favorited characters across the anime universe.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {characters?.data?.map((char: any, index: number) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={char.mal_id}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 aspect-[3/4]"
          >
            <img
              src={char.images.webp.image_url}
              alt={char.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <h3 className="font-display font-bold text-lg leading-tight text-white mb-1 drop-shadow-md">
                {char.name}
              </h3>
              <p className="text-xs text-primary font-medium uppercase tracking-wider drop-shadow-md">
                {char.favorites.toLocaleString()} Favorites
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
