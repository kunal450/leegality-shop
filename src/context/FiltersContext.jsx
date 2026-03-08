import { createContext, useContext, useState, useCallback } from "react";

const FiltersContext = createContext(null);

const defaultFilters = {
  categories: [],   // array of selected category slugs
  brands: [],       // array of selected brand strings
  priceMin: "",     // string of minimum price
  priceMax: "",     // string of minimum price
  search: "",       // string of search text
};

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const updateFilter = useCallback((patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setCurrentPage(1); // reset pagination on filter change
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  }, []);

  return (
    <FiltersContext.Provider
      value={{ filters, updateFilter, resetFilters, currentPage, setCurrentPage }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used inside FiltersProvider");
  return ctx;
}
