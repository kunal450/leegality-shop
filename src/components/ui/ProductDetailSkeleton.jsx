// ProductDetailSkeleton.jsx
// Drop-in skeleton loader for ProductDetailPage

function Shimmer({ className = "" }) {
  return (
    <div
      className={`bg-slate-200 rounded animate-pulse ${className}`}
    />
  );
}

export default function ProductDetailSkeleton() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Back button */}
      <Shimmer className="h-5 w-16 mb-6" />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">

          {/* Left — Image gallery */}
          <div className="p-6 bg-slate-50 border-r border-slate-100">
            {/* Main image */}
            <Shimmer className="h-80 w-full rounded-xl" />

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4">
              {[...Array(4)].map((_, i) => (
                <Shimmer key={i} className="w-14 h-14 rounded-lg shrink-0" />
              ))}
            </div>
          </div>

          {/* Right — Product details */}
          <div className="p-8 flex flex-col gap-5">

            {/* Title & price */}
            <div>
              <Shimmer className="h-7 w-3/4 mb-3" />
              <div className="flex items-center gap-3 mb-3">
                <Shimmer className="h-9 w-24" />
                <Shimmer className="h-6 w-20 rounded-full" />
              </div>
              {/* Star rating */}
              <Shimmer className="h-4 w-32" />
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-3">
                  <Shimmer className="h-3 w-12 mb-1.5" />
                  <Shimmer className="h-4 w-20" />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="border-t border-slate-100 pt-4">
              <Shimmer className="h-5 w-28 mb-3" />
              <Shimmer className="h-3 w-full mb-2" />
              <Shimmer className="h-3 w-full mb-2" />
              <Shimmer className="h-3 w-5/6" />
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 pt-2">
              <Shimmer className="flex-1 h-12 rounded-xl" />
              <Shimmer className="w-12 h-12 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="border-t border-slate-100 p-8">
          <Shimmer className="h-6 w-32 mb-5" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="mb-5 last:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <Shimmer className="w-8 h-8 rounded-full" />
                <div>
                  <Shimmer className="h-3.5 w-28 mb-1.5" />
                  <Shimmer className="h-3 w-20" />
                </div>
              </div>
              <Shimmer className="h-3 w-full mb-1.5" />
              <Shimmer className="h-3 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}