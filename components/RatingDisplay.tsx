import { MAX_RATINGS } from "@/lib/utils";
import { StarHalf, StarIcon } from "lucide-react";

function RatingDisplay() {
  const ratings: Array<number> | null = [3, 4, 5, 5, 3, 2, 5, 1];

  const totalRatings = ratings?.reduce((a, b) => a + b, 0); // 17
  const numberOfRatings = ratings?.length; // 4

  const avg = totalRatings / numberOfRatings; // 4.25

  const stars = Math.round(avg * 2) / 2; // 4.5 ⭐

  return (
    <div className="flex items-center">
      {Array.from({ length: MAX_RATINGS }).map((_, idx) => {
        if (stars >= idx + 1)
          return (
            <StarIcon
              key={idx}
              className="fill-secondary-custom text-secondary-custom size-4"
            />
          );
        else
          return (
            <StarIcon key={idx} className=" text-secondary-custom size-4" />
          );
      })}
      <span className="text-p16 ml-2">({numberOfRatings})</span>
    </div>
  );
}

export default RatingDisplay;
