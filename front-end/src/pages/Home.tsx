import { useNavigate } from "react-router-dom";
import RecentProducts from "../components/RecentsProducts/RecentsProducts";

function Home() {
  const navigate = useNavigate();
  return (
    <section>
      <RecentProducts />
      <button onClick={() => navigate("/new-product")}>
        Ajouter un nouveau produit
      </button>
    </section>
  );
}

export default Home;
