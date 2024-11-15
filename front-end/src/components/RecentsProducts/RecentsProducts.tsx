import { useQuery } from "@apollo/client";
import AdCard from "../AdCard/AdCard";
import { useOutletContext } from "react-router-dom";
import "./recentsProducts.css";
import { Product } from "../../types/Product";
import { GET_PRODUCTS } from "../../query/ProductQuery";

function RecentAds() {
  const input = useOutletContext();
  console.log(input);

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { input },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <main className="main-content">
        <h2 className="main-page-title">Annonces récentes</h2>
        <section className="recent-products">
          {data?.getProducts.map((product: Product) => (
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
