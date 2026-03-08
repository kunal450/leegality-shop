import { useState, useEffect } from "react";
import { useFilters } from "../../context/FiltersContext.jsx";

export default function PriceFilter() {
  const { filters, updateFilter } = useFilters();
  const [min, setMin] = useState(filters.priceMin);
  const [max, setMax] = useState(filters.priceMax);

  // sync when filters reset externally
  useEffect(() => {
    setMin(filters.priceMin);
    setMax(filters.priceMax);
  }, [filters.priceMin, filters.priceMax]);

  const handleApply = () => {
    updateFilter({ priceMin: min, priceMax: max });
  };

  return (
    <div>
      <h3 className="font-semibold text-slate-800 text-sm mb-3 uppercase tracking-wide">
        Price Range
      </h3>
      <div className="flex gap-2 mb-3">
        <input
          type="number"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          placeholder="Min"
          min={0}
          className="w-1/2 px-2 py-1.5 text-sm border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-slate-700"
        />
        <input
          type="number"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          placeholder="Max"
          min={0}
          className="w-1/2 px-2 py-1.5 text-sm border border-slate-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-slate-700"
        />
      </div>
      <button
        onClick={handleApply}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium py-2 rounded-md transition-colors"
      >
        Apply
      </button>
    </div>
  );
}
