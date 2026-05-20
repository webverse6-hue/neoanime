import { useEffect, useState } from "react";

export function useRatings() {
  const [ratings, setRatings] = useState<Record<number, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("neoanime-ratings");
    if (saved) {
      try {
        setRatings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse ratings", e);
      }
    }
  }, []);

  const rateAnime = (id: number, rating: number) => {
    setRatings((prev) => {
      const next = { ...prev, [id]: rating };
      localStorage.setItem("neoanime-ratings", JSON.stringify(next));
      return next;
    });
  };

  const getRating = (id: number) => ratings[id] || 0;

  return { ratings, rateAnime, getRating };
}
