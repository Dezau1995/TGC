import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TagsOptions } from "../../types/Tag";
import Select from "react-select";
import "./ProductDetails.css";
import {
  useDelete_ProductMutation,
  useGet_Product_By_IdQuery,
  useGet_TagsQuery,
  useGetCategoriesQuery,
  useUpdate_Details_ProductMutation,
} from "../../graphql/hooks";

function ProductDetail() {
  const { productId } = useParams();
  const [edit, setEdit] = useState<boolean>(false);
  const [btnValue, setBtnValue] = useState<string>("Éditer");
  // const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagsOptions[]>([]);
  const [options, setOptions] = useState<TagsOptions[]>([]);
  const navigate = useNavigate();

  const {
    loading: loadingProductId,
    error: errorProductId,
    data: dataProductId,
  } = useGet_Product_By_IdQuery({
    variables: { productId: productId as string },
  });

  const { data: dataCategories } = useGetCategoriesQuery();

  const {
    loading: loadingTags,
    error: errorTags,
    data: dataTags,
  } = useGet_TagsQuery();

  const [
    updateDetailsProduct,
    { loading: loadingPatchProduct, error: errorPatchProduct },
  ] = useUpdate_Details_ProductMutation();

  const [deleteProduct] = useDelete_ProductMutation();

  useEffect(() => {
    if (dataTags && dataTags.getTags) {
      const tagsOptions: TagsOptions[] = dataTags?.getTags.map((tag) => ({
        value: tag.id,
        label: tag.name,
      }));
      setOptions(tagsOptions);
    }
  }, [dataTags]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    formJson.tagsId = JSON.stringify(selectedTags.map((tag) => tag.value));
    try {
      await updateDetailsProduct({
        variables: {
          productId: productId as string,
          data: formJson,
        },
      });
      setEdit(false);
      setBtnValue("Éditer");
    } catch (error) {
      console.error("Erreur lors de la modification du produit:", error);
    }
  };

  const handleBtnValue = () => {
    setEdit((prevEdit) => !prevEdit);
    setBtnValue(edit ? "Éditer" : "Envoyer");
  };

  const handleDelete = async () => {
    try {
      await deleteProduct({
        variables: {
          productId: productId as string,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  if (loadingProductId || loadingTags || loadingPatchProduct)
    return <p>Loading ...</p>;
  if (errorProductId || errorTags || errorPatchProduct)
    return <p>Error ... </p>;

  return (
    <section className="display-details-page">
      <p>Product #{productId}</p>
      <form onSubmit={handleSubmit} className="display-edit-form">
        {!edit ? (
          <img src={dataProductId?.getProductById.picture} alt="picture" />
        ) : (
          <label>
            Image :
            <input
              type="text"
              defaultValue={dataProductId?.getProductById.picture}
              name="picture"
            />
          </label>
        )}
        {!edit ? (
          <h1>{dataProductId?.getProductById.title}</h1>
        ) : (
          <label>
            Titre :
            <input
              type="text"
              defaultValue={dataProductId?.getProductById.title}
              name="title"
            />
          </label>
        )}
        {!edit ? (
          <p>{dataProductId?.getProductById.description}</p>
        ) : (
          <label>
            Description :
            <input
              type="text"
              defaultValue={dataProductId?.getProductById.description}
              name="description"
            />
          </label>
        )}
        {!edit ? (
          <p>{dataProductId?.getProductById.owner}</p>
        ) : (
          <label>
            Propriétaire :
            <input
              type="text"
              defaultValue={dataProductId?.getProductById.owner}
              name="owner"
            />
          </label>
        )}
        {!edit ? (
          <p>{dataProductId?.getProductById.price}</p>
        ) : (
          <label>
            Prix :
            <input
              type="text"
              defaultValue={dataProductId?.getProductById.price}
              name="price"
            />
          </label>
        )}
        <p>{dataProductId?.getProductById.createdAt}</p>
        {!edit ? (
          dataProductId?.getProductById?.category ? (
            <p>{dataProductId?.getProductById.category.name}</p>
          ) : (
            <p>Pas de catégorie</p>
          )
        ) : (
          <label>
            <select
              name="categoryId"
              defaultValue={dataProductId?.getProductById.category?.id}
            >
              <option value="Choose a category">Choisir une catégorie</option>
              {dataCategories?.getCategories?.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          {!edit ? (
            <section>
              {dataProductId?.getProductById.tag.map((option) => (
                <p className="tags" key={option.id}>
                  {option.name}
                </p>
              ))}
            </section>
          ) : (
            <Select
              name="tagsId"
              closeMenuOnSelect={false}
              isMulti
              options={options}
              onChange={(selectedOptions) =>
                setSelectedTags(selectedOptions as TagsOptions[])
              }
            />
          )}
        </label>
        {edit && <button type="submit">{btnValue}</button>}
      </form>
      {!edit && (
        <button type="button" onClick={handleBtnValue} className="btn-edit">
          {btnValue}
        </button>
      )}
      <button onClick={handleDelete} className="btn-delete-product">
        Supprimer le produit
      </button>
    </section>
  );
}

export default ProductDetail;
