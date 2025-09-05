"use client";

import { MAX_RATINGS } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { useState } from "react";

function RatingInput() {
  const [rating, setRating] = useState<number>(0);
  const [tempRating, setTempRating] = useState<number>(0);

  return (
    <div className="flex">
      {Array.from({ length: MAX_RATINGS }).map((_, idx) => {
        const ratingValue = idx + 1;
        return (
          <StarIcon
            key={idx}
            onMouseEnter={() => setTempRating(ratingValue)}
            onMouseLeave={() => setTempRating(0)}
            onClick={() => setRating(ratingValue)}
            className={`text-primary-custom ${
              ratingValue <= (tempRating || rating)
                ? "fill-primary-custom"
                : "fill-transparent"
            } transition duration-300`}
          />
        );
      })}
    </div>
  );
}

export default RatingInput;
