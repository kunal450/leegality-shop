function Shimmer({ className = "" }) {
  return <div className={`bg-slate-200 rounded animate-pulse ${className}`} />;
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
      {/* Image area */}
      <Shimmer className="h-44 w-full rounded-none" />

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        {/* Title — two lines */}
        <Shimmer className="h-3.5 w-full" />
        <Shimmer className="h-3.5 w-3/4" />

        {/* Star rating */}
        <Shimmer className="h-3 w-24 mt-0.5" />

        {/* Price row */}
        <div className="mt-auto pt-1 flex items-center justify-between">
          <Shimmer className="h-4 w-14" />
          <Shimmer className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
}

export default function ProductGridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}