import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ProductForm from "./pages/ProductForm";
import CategoryProducts from "./pages/CategoryProducts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
				path: "/:productsId",
				element: <ProductDetail/>,
			},
            {
                path: "/new-product",
                element: <ProductForm/>
            },
            {
                path : "/categories/:categoryId",
                element: <CategoryProducts/>
            }
        ]
    }
]);

export default router;