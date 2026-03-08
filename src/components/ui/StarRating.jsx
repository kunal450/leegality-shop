import HalfStarIcon from "../../assets/images/icons/HalfStarIcon";
import StarIcon from "../../assets/images/icons/StarIcon";
export default function StarRating({ rating, count, size = "sm" }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon className={`${starSize} text-amber-400 fill-amber-400`}/>
        ))}
        {hasHalf && (
          <HalfStarIcon className={`${starSize} text-amber-400`}/>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarIcon className={`${starSize} text-slate-300 fill-slate-300`}/>
        ))}
      </div>
      {count !== undefined && (
        <span className="text-slate-500 text-xs">({rating?.toFixed(1)})</span>
      )}
    </div>
  );
}
