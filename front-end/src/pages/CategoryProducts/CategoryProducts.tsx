import { useParams } from "react-router-dom";
import AdCard from "../../components/AdCard/AdCard";
import "./CategoryProducts.css";
import {
  useGet_Products_By_CategoryQuery,
  useGetCategoryByIdQuery,
} from "../../graphql/hooks";

function CategoryProducts() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { loading, error, data } = useGet_Products_By_CategoryQuery({
    variables: { categoryId: categoryId as string },
  });

  const { data: dataCategory } = useGetCategoryByIdQuery({
    variables: {
      categoryId: categoryId as string,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="main-content-category">
      <h1 className="title-category">{dataCategory?.getCategoryById.name}</h1>
      <section className="display-category-products">
        {data?.getProductsByCategory.map((product) => (
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
