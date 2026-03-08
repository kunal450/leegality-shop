import { Routes, Route, RouterProvider } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import ProductListingPage from "./pages/ProductListingPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import productRouter from "./router/productRoutes/ProductRouter.jsx";

export default function App() {
  return (
      <RouterProvider router={productRouter}/>
  );
}
