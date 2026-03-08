import { useFilters } from "../../context/FiltersContext.jsx";
import { useCategories } from "../../hooks/useProducts.js";

export default function CategoryFilter() {
  const { categories, loading } = useCategories();
  const { filters, updateFilter } = useFilters();

  const toggle = (slug) => {
    const current = filters.categories;
    const next = current.includes(slug)
      ? current.filter((c) => c !== slug)
      : [...current, slug];
    updateFilter({ categories: next });
  };

  const formatLabel = (cat) => {
    const slug = typeof cat === "object" ? cat.slug : cat;
    const name = typeof cat === "object" ? cat.name : cat;
    return { slug, name: name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) };
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-5 bg-slate-200 rounded w-4/5" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-3 uppercase tracking-wide">
        Categories
      </h3>
      <div className="space-y-2 max-h-56 overflow-y-auto scrollbar-thin pr-1">
        {categories.map((cat) => {
          const { slug, name } = formatLabel(cat);
          const checked = filters.categories.includes(slug);
          return (
            <label
              key={slug}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(slug)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600 cursor-pointer"
              />
              <span
                className={`text-sm transition-colors ${
                  checked ? "text-blue-600 font-medium" : "text-slate-600 group-hover:text-slate-900"
                }`}
              >
                {name}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
