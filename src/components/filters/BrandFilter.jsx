import { useFilters } from "../../context/FiltersContext.jsx";
import { useBrands } from "../../hooks/useProducts.js";

export default function BrandFilter() {
  const { filters, updateFilter } = useFilters();
  const categorySlug = filters.categories.length === 1 ? filters.categories[0] : null;
  const brands = useBrands(categorySlug);

  if (brands.length === 0) return null;

  const toggle = (brand) => {
    const current = filters.brands;
    const next = current.includes(brand)
      ? current.filter((b) => b !== brand)
      : [...current, brand];
    updateFilter({ brands: next });
  };

  return (
    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-3 uppercase tracking-wide">
        Brands
      </h3>
      <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin pr-1">
        {brands.map((brand) => {
          const checked = filters.brands.includes(brand);
          return (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(brand)}
                className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer"
              />
              <span
                className={`text-sm transition-colors ${
                  checked ? "text-blue-600 font-medium" : "text-slate-600 group-hover:text-slate-900"
                }`}
              >
                {brand}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
