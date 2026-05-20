import { useState } from "react";
import { Star } from "lucide-react";
import { useRatings } from "@/hooks/use-ratings";

interface StarRatingProps {
  id: number;
}

export function StarRating({ id }: StarRatingProps) {
  const { getRating, rateAnime } = useRatings();
  const [hoverRating, setHoverRating] = useState(0);
  const currentRating = getRating(id);

  return (
    <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => rateAnime(id, star)}
          onMouseEnter={() => setHoverRating(star)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-6 h-6 transition-colors ${
              star <= (hoverRating || currentRating)
                ? "fill-accent text-accent drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]"
                : "text-muted-foreground hover:text-muted"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
