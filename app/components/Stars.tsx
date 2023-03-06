import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";

import Image from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../utilities/calculateReviewRatingAverage";

export default function Stars({ reviews }: { reviews: Review[] }) {
  const rating = calculateReviewRatingAverage(reviews); // average rating

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rating - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(emptyStar);
        else if (difference > 0.2 && difference <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }

    if (stars[0] !== fullStar) return "Not rated";
    return stars.map((star, i) => {
      return <Image src={star} alt="" className="w-4 h-4 mr-1" key={i} />;
    });
  };

  return <div className="flex items-center">{renderStars()}</div>;
}
