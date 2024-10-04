import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../types/Product";
import axios from "axios";
import { toast } from "react-toastify";
import { Tag, TagsOptions } from "../types/Tag";
import Select from "react-select";

function ProductDetail() {
  const { productsId } = useParams();
  console.log("productsId:", productsId)
  const [product, setProduct] = useState<Product>();
  const [edit, setEdit] = useState<boolean>(false);
  const [btnValue, setBtnValue] = useState<string>("Éditer");
  const [selectedTags, setSelectedTags] = useState<TagsOptions[]>([]);
  const [options, setOptions] = useState<TagsOptions[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/products/${productsId}`
      );
      setProduct(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  const fetchOption = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tags/");
      const tagsOptions: TagsOptions[] = response.data.map((tag: Tag) => ({
        value: tag.id,
        label: tag.name,
      }));
      setOptions(tagsOptions);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    formJson.tagsId = JSON.stringify(selectedTags.map((tag) => tag.value));
    try {
      await axios.put(
        `http://localhost:3000/products/${productsId}`,
        formJson
      );
      setEdit(false);
      setBtnValue("Éditer");
      toast.success("Vos modifications ont bien été prises en compte !");
    } catch (error) {
      console.error("Erreur lors de la modification du produit:", error);
      toast.error("Erreur lors de la modification du produit");
    }
  };

  useEffect(() => {
    fetchData();
    fetchOption();
  }, [edit]);

  const handleBtnValue = () => {
    setEdit((prevEdit) => !prevEdit);
    setBtnValue(edit ? "Éditer" : "Envoyer");
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/products/${productsId}`)
    navigate("/")
  }

  if (!product) {
    return "loading";
  }
  return (
    <section>
      <p>Product #{productsId}</p>
      <form onSubmit={handleSubmit}>
        {!edit ? (
          <img src={product.picture} alt="picture" />
        ) : (
          <input type="text" name="picture" />
        )}
        {!edit ? (
          <h1>{product.title}</h1>
        ) : (
          <label>
            Titre :
            <input type="text" defaultValue={product.title} name="title" />
          </label>
        )}
        {!edit ? (
          <p>{product.description}</p>
        ) : (
          <label>
            Description :
            <input
              type="text"
              defaultValue={product.description}
              name="description"
            />
          </label>
        )}
        {!edit ? (
          <p>{product.owner}</p>
        ) : (
          <label>
            Propriétaire :
            <input type="text" defaultValue={product.owner} name="owner" />
          </label>
        )}
        {!edit ? (
          <p>{product.price}</p>
        ) : (
          <label>
            Prix :
            <input type="text" defaultValue={product.price} name="price" />
          </label>
        )}
        <p>{product.createdAt}</p>
        <label>
          {!edit ? (
            <section>
              {product.tag.map((tag) => (
                <p className="tags" key={tag.id}>
                  {tag.name}
                </p>
              ))}
            </section>
          ) : (
            <Select
              name="tags"
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
