import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProduct } from "../hooks/useProducts.js";
import StarRating from "../components/ui/StarRating.jsx";
import ProductReviews from "../components/product/ProductReviews.jsx";
import ProductDetailSkeleton from "../components/ui/ProductDetailSkeleton.jsx";
import BackArrowIcon from "../assets/images/icons/BackArrowIcon.jsx";
import HeartIcon from "../assets/images/icons/HeartIcon.jsx";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const [activeImage, setActiveImage] = useState(0);

  if (loading) {
    return (
      <ProductDetailSkeleton/>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600 text-lg font-medium">Product not found</p>
        <p className="text-slate-400 text-sm mt-1">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Go back to listings
        </button>
      </div>
    );
  }

  const images = product.images || [product.thumbnail];
  const formatCat = (c) =>
    (c || "").replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 font-medium mb-6 transition-colors"
      >
        <BackArrowIcon/>
        Back
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left — Image gallery */}
          <div className="p-6 bg-slate-50 border-r border-slate-100">
            <div className="relative bg-white rounded-xl overflow-hidden h-80 flex items-center justify-center shadow-sm">
              <img
                src={images[activeImage]}
                alt={product.title}
                className="max-h-full max-w-full object-contain p-6"
                onError={(e) => { e.target.src = "https://dummyjson.com/image/400x400"; }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-14 h-14 rounded-lg border-2 overflow-hidden shrink-0 bg-white transition-colors ${
                      i === activeImage ? "border-blue-500" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => { e.target.src = "https://dummyjson.com/image/60x60"; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Product details */}
          <div className="p-8 flex flex-col gap-5">
            {/* Title & price */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{product.title}</h1>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-0.5 rounded-full">
                    -{Math.round(product.discountPercentage)}% OFF
                  </span>
                )}
              </div>
              <StarRating rating={product.rating} count={product.rating} size="md" />
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Brand</p>
                <p className="font-semibold text-slate-800 text-sm">{product.brand || "—"}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Category</p>
                <p className="font-semibold text-slate-800 text-sm">{formatCat(product.category)}</p>
              </div>
              {product.stock !== undefined && (
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Stock</p>
                  <p className={`font-semibold text-sm ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-amber-600" : "text-red-600"}`}>
                    {product.stock > 0 ? `${product.stock} units` : "Out of stock"}
                  </p>
                </div>
              )}
              {product.sku && (
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">SKU</p>
                  <p className="font-semibold text-slate-800 text-sm font-mono">{product.sku}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-slate-100 pt-4">
              <h2 className="font-bold text-slate-800 mb-2">Description</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* CTA */}
            <div className="flex gap-3 pt-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                Add to Cart
              </button>
              <button className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors">
                <HeartIcon/>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="border-t border-slate-100 p-8">
            <ProductReviews reviews={product.reviews} />
          </div>
        )}
      </div>
    </div>
  );
}
