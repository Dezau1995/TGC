// import axios from "axios";
// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import AdCard from "../components/AdCard/AdCard";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_CATEGORY } from "../query/ProductQuery";

function CategoryProducts() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
    variables: { categoryId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="main-content">
      <h1>Produits dans la catégorie {categoryId}</h1>
      <section className="category-products">
        {data.getProductsByCategory.map((product: Product) => (
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
