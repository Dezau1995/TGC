import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tag, TagsOptions } from "../types/Tag";
import Select from "react-select";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../query/ProductQuery";
import { GET_TAGS } from "../query/TagQuery";
import {
  UPDATE_DETAILS_PRODUCT,
  DELETE_PRODUCT,
} from "../mutation/ProductMutation";

function ProductDetail() {
  const { productId } = useParams();
  const [edit, setEdit] = useState<boolean>(false);
  const [btnValue, setBtnValue] = useState<string>("Éditer");
  const [selectedTags, setSelectedTags] = useState<TagsOptions[]>([]);
  const [options, setOptions] = useState<TagsOptions[]>([]);
  const navigate = useNavigate();

  const {
    loading: loadingProductId,
    error: errorProductId,
    data: dataProductId,
  } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { productId },
  });

  const {
    loading: loadingTags,
    error: errorTags,
    data: dataTags,
  } = useQuery(GET_TAGS);

  const [
    updateDetailsProduct,
    { loading: loadingPatchProduct, error: errorPatchProduct },
  ] = useMutation(UPDATE_DETAILS_PRODUCT);

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  useEffect(() => {
    if (dataTags && dataTags.getTags) {
      const tagsOptions: TagsOptions[] = dataTags.getTags.map((tag: Tag) => ({
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
          productId,
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
          productId,
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
    <section>
      <p>Product #{productId}</p>
      <form onSubmit={handleSubmit}>
        {!edit ? (
          <img src={dataProductId.getProductById.picture} alt="picture" />
        ) : (
          <input type="text" name="picture" />
        )}
        {!edit ? (
          <h1>{dataProductId.getProductById.title}</h1>
        ) : (
          <label>
            Titre :
            <input
              type="text"
              defaultValue={dataProductId.getProductById.title}
              name="title"
            />
          </label>
        )}
        {!edit ? (
          <p>{dataProductId.getProductById.description}</p>
        ) : (
          <label>
            Description :
            <input
              type="text"
              defaultValue={dataProductId.getProductById.description}
              name="description"
            />
          </label>
        )}
        {!edit ? (
          <p>{dataProductId.getProductById.owner}</p>
        ) : (
          <label>
            Propriétaire :
            <input
              type="text"
              defaultValue={dataProductId.getProductById.owner}
              name="owner"
            />
          </label>
        )}
        {!edit ? (
          <p>{dataProductId.getProductById.price}</p>
        ) : (
          <label>
            Prix :
            <input
              type="text"
              defaultValue={dataProductId.getProductById.price}
              name="price"
            />
          </label>
        )}
        <p>{dataProductId.getProductById.createdAt}</p>
        <label>
          {!edit ? (
            <section>
              {dataProductId.getProductById.tag.map((option: Tag) => (
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
        <button type="button" onClick={handleBtnValue}>
          {btnValue}
        </button>
      )}
      <button onClick={handleDelete}>Supprimer le produit</button>
    </section>
  );
}

export default ProductDetail;
