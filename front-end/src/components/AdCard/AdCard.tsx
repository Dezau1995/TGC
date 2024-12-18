import { Link } from "react-router-dom";
import "./adCard.css";
import { Product } from "../../graphql/hooks";

export default function AdCard(props: Partial<Product>) {
  return (
    <section className="product-card-container">
      <Link className="product-card-link" to={`/${props.id}`}>
        <img
          className="product-card-image"
          src={props.picture}
          alt={props.title}
        />
        <section className="product-card-text">
          <h1 className="product-card-title">{props.title}</h1>
          <p className="product-card-price">{props.price} €</p>
        </section>
      </Link>
    </section>
  );
}
