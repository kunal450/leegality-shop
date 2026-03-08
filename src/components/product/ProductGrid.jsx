import ProductCard from "./ProductCard.jsx";
import ProductGridSkeleton from "../ui/ProductGridSkeleton.jsx";
import ErrorIcon from "../../assets/images/icons/ErrorIcon.jsx";
import EmptyBoxIcon from "../../assets/images/icons/EmptyBoxIcon.jsx";

export default function ProductGrid({ products, loading, error }) {
  if (loading) {
    return (
      <ProductGridSkeleton/>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
          <ErrorIcon/>
        </div>
        <p className="text-slate-600 font-medium">Failed to load products</p>
        <p className="text-slate-400 text-sm">{error}</p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
          <EmptyBoxIcon/>
        </div>
        <p className="text-slate-600 font-medium">No products found</p>
        <p className="text-slate-400 text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
