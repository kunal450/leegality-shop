import StarRating from "../ui/StarRating.jsx";

export default function ProductReviews({ reviews }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-800 mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-slate-800 text-sm">
                {review.reviewerName || "Anonymous"}
              </span>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
