import { Newspaper, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const HARDCODED_NEWS = [
  {
    id: 1,
    title: "Demon Slayer: Infinity Castle Arc Movies Announced",
    date: "Just Now",
    category: "Movies",
    image: "https://cdn.myanimelist.net/images/anime/1000/110531l.jpg",
    excerpt: "The epic conclusion to the Demon Slayer saga will be told across three feature-length films, promising unprecedented animation quality from Ufotable."
  },
  {
    id: 2,
    title: "Jujutsu Kaisen Season 3: Culling Game Aftermath",
    date: "2 Hours Ago",
    category: "Anime",
    image: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
    excerpt: "MAPPA confirms production has begun on the highly anticipated third season, covering the deadly Culling Game arc."
  },
  {
    id: 3,
    title: "Solo Leveling Season 2 Release Date Confirmed",
    date: "Yesterday",
    category: "Announcement",
    image: "https://cdn.myanimelist.net/images/anime/1792/138022l.jpg",
    excerpt: "Sung Jinwoo's journey continues as A-1 Pictures sets the premiere date for the second season 'Arise from the Shadow'."
  },
  {
    id: 4,
    title: "Chainsaw Man: Reze Arc Movie in Production",
    date: "2 Days Ago",
    category: "Movies",
    image: "https://cdn.myanimelist.net/images/anime/1806/126216l.jpg",
    excerpt: "The explosive Bomb Girl arc is getting the cinematic treatment. First teaser visual reveals a dark and beautiful adaptation."
  }
];

export default function News() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Newspaper className="w-8 h-8 text-primary" />
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight">
          Latest Archives
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HARDCODED_NEWS.map((item) => (
          <div key={item.id} className="group rounded-xl overflow-hidden bg-card border border-border/50 flex flex-col hover:border-primary/50 transition-colors">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 px-2 py-1 bg-primary/80 backdrop-blur text-xs font-bold uppercase tracking-wider rounded">
                {item.category}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-xs text-muted-foreground mb-2">{item.date}</span>
              <h3 className="text-lg font-display font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                {item.excerpt}
              </p>
              <button className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all mt-auto w-fit">
                READ MORE <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
