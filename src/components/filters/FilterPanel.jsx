import { useFilters } from "../../context/FiltersContext.jsx";
import CategoryFilter from "./CategoryFilter.jsx";
import PriceFilter from "./PriceFilter.jsx";
import BrandFilter from "./BrandFilter.jsx";
import SearchIcon from "../../assets/images/icons/SearchIcon.jsx";
import FilterIcon from "../../assets/images/icons/FilterIcon.jsx";

function SidebarSearch() {
  const { filters, updateFilter } = useFilters();
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"/>
      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => updateFilter({ search: e.target.value })}
        className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 text-slate-700 placeholder-slate-400"
      />
    </div>
  );
}

export default function FilterPanel() {
  const { filters, resetFilters } = useFilters();
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.priceMin !== "" ||
    filters.priceMax !== "" ||
    filters.search !== "";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 h-fit sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FilterIcon/>
          <span className="font-semibold text-slate-800">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="mb-5">
        <SidebarSearch />
      </div>

      <div className="space-y-5">
        <CategoryFilter />
        <div className="border-t border-slate-100" />
        <PriceFilter />
        <div className="border-t border-slate-100" />
        <BrandFilter />
      </div>
    </div>
  );
}
