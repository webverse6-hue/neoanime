import { useEffect, useState } from "react";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("neoanime-watchlist");
    if (saved) {
      try {
        setWatchlist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse watchlist", e);
      }
    }
  }, []);

  const toggleWatchlist = (id: number) => {
    setWatchlist((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("neoanime-watchlist", JSON.stringify(next));
      return next;
    });
  };

  const isInWatchlist = (id: number) => watchlist.includes(id);

  return { watchlist, toggleWatchlist, isInWatchlist };
}
