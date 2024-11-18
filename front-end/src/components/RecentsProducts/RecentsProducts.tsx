import AdCard from "../AdCard/AdCard";
import { useOutletContext } from "react-router-dom";
import "./recentsProducts.css";

import { useGet_ProductsQuery } from "../../graphql/hooks";

function RecentAds() {
  const input = useOutletContext();
  console.log(input);

  const { loading, error, data } = useGet_ProductsQuery({
    variables: { input: input as string },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      {/* <main className="main-content"> */}
      <h2 className="main-page-title">Annonces récentes</h2>
      <section className="recent-products">
        {data?.getProducts.map((product) => (
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

export default RecentAds;
