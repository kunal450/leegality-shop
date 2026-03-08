import { Link } from "react-router-dom";
import StarRating from "../ui/StarRating.jsx";
import ProductBadge from "./ProductBadge.jsx";

export default function ProductCard({ product }) {
  const { id, title, price, rating, thumbnail, discountPercentage } = product;

  return (
    <Link
      to={`/product/${id}`}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      {/* Image */}
      <div className="relative bg-slate-50 h-44 overflow-hidden">
        <ProductBadge discount={discountPercentage} />
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://dummyjson.com/image/200x200";
          }}
        />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-snug">
          {title}
        </h3>
        <StarRating rating={rating} count={rating} />
        <div className="mt-auto pt-1 flex items-center justify-between">
          <span className="text-base font-bold text-slate-900">${price}</span>
          {discountPercentage > 0 && (
            <span className="text-xs text-slate-400 line-through">
              ${(price / (1 - discountPercentage / 100)).toFixed(0)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
