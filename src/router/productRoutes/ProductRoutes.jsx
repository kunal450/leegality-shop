import Layout from "../../components/layout/Layout";
import ProductListingPage from "../../pages/ProductListingPage";
import ProductDetailPage from "../../pages/ProductDetailPage";
import NotFoundPage from "../../pages/NotFoundPage";

export const productRoutes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,           // catches parent-level errors
    children: [
      {
        index: true,
        element: <ProductListingPage />,
        errorElement: <NotFoundPage isChild />, // catches errors inside listing page
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
        errorElement: <NotFoundPage isChild />, // catches bad product id / sub-paths
      },
      {
        path: "*",                              // any unknown child route
        element: <NotFoundPage isChild />,
      },
    ],
  },
];