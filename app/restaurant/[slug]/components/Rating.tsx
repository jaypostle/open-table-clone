import { Review } from "@prisma/client";

export default function Rating({ reviews }: { reviews: Review[] }) {
  const ratingAverage = reviews.reduce((r, c) => r + c.rating, 0);

  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>*****</p>
        <p className="text-reg ml-3">{ratingAverage}</p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length} Review{reviews.length === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
}
