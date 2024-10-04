import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import AdCard from "../components/AdCard/AdCard";

function CategoryProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { categoryId } = useParams<{ categoryId: string }>();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/categories/${categoryId}/products`
      );
      setProducts(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <main className="main-content">
      <h1>Produits dans la catégorie {categoryId}</h1>
      <section className="category-products">
        {products.map((product) => (
          <AdCard
            key={product.id}
            picture={product.picture}
            title={product.title}
            id={product.id}
            price={product.price}
          />
        ))}
      </section>
    </main>
  );
}

export default CategoryProducts;
