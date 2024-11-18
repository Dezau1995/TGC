import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetails/ProductDetail";
import ProductForm from "./pages/ProductForm";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:productId",
        element: <ProductDetail />,
      },
      {
        path: "/new-product",
        element: <ProductForm />,
      },
      {
        path: "/categories/:categoryId",
        element: <CategoryProducts />,
      },
    ],
  },
]);

export default router;
