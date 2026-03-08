import { useFilters } from "../context/FiltersContext.jsx";
import { useProducts } from "../hooks/useProducts.js";
import FilterPanel from "../components/filters/FilterPanel.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";
import Pagination from "../components/ui/Pagination.jsx";

export default function ProductListingPage() {
  const { filters, currentPage, setCurrentPage } = useFilters();
  const { products, totalPages, loading, error } = useProducts(filters, currentPage);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-5">
      <div className="flex gap-5">
        {/* Left Side Filter Panel */}
        <div className="hidden lg:block w-56 shrink-0">
          <FilterPanel />
        </div>

        {/* Right Panel with product details and pagination */}
        <div className="flex-1 min-w-0">
          <ProductGrid products={products} loading={loading} error={error} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
