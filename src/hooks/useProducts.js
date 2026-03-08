import { useState, useEffect } from "react";
import axios from "axios";

const BASE = "https://dummyjson.com";
const PAGE_SIZE = 12;

export function useProducts(filters, currentPage) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const skip = (currentPage - 1) * PAGE_SIZE;
    const hasCategory = filters.categories.length === 1;
    const hasSearch = filters.search.trim().length > 0;

    let url;
    if (hasSearch) {
      url = `${BASE}/products/search?q=${encodeURIComponent(filters.search.trim())}&limit=${PAGE_SIZE}&skip=${skip}`;
    } else if (hasCategory) {
      url = `${BASE}/products/category/${encodeURIComponent(filters.categories[0])}?limit=${PAGE_SIZE}&skip=${skip}`;
    } else {
      url = `${BASE}/products?limit=${PAGE_SIZE}&skip=${skip}`;
    }

    axios
      .get(url)
      .then((res) => {
        if (cancelled) return;
        let items = res.data.products;

        // Client-side filters: multi-category (when >1 selected), brand, price
        if (filters.categories.length > 1) {
          items = items.filter((p) =>
            filters.categories.includes(p.category)
          );
        }
        if (filters.brands.length > 0) {
          items = items.filter((p) =>
            filters.brands.map((b) => b.toLowerCase()).includes(
              (p.brand || "").toLowerCase()
            )
          );
        }
        const min = parseFloat(filters.priceMin);
        const max = parseFloat(filters.priceMax);
        if (!isNaN(min)) items = items.filter((p) => p.price >= min);
        if (!isNaN(max)) items = items.filter((p) => p.price <= max);

        setProducts(items);
        setTotal(res.data.total);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Failed to fetch products");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filters, currentPage]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  return { products, total, totalPages, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE}/products/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setProduct(null);
    setError(null);
    axios
      .get(`${BASE}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}

export function useBrands(categorySlug) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const url = categorySlug
      ? `${BASE}/products/category/${encodeURIComponent(categorySlug)}?limit=100&skip=0`
      : `${BASE}/products?limit=100&skip=0`;
    
    axios.get(url).then((res) => {
      const unique = [
        ...new Set(
          res.data.products
            .map((p) => p.brand)
            .filter(Boolean)
        ),
      ].sort();
      setBrands(unique);
    });
  }, [categorySlug]);

  return brands;
}
