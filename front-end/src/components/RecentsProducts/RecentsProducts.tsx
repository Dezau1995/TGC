import AdCard, { ProductsProps } from "../AdCard/AdCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import "./recentsProducts.css"

function RecentAds() {
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const input = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<ProductsProps[]>(
        input
          ? `http://localhost:3000/products/search/${input}`
          : `http://localhost:3000/products/`
      );
      console.log(data);
      setProducts(data);
    };
    fetchData();
  }, [input]);

  return (
    <>
      <main className="main-content">
        <h2 className="main-page-title">Annonces récentes</h2>
        <section className="recent-products">
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
    </>
  );
}

export default RecentAds;
