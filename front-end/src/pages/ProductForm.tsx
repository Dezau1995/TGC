import { FormEvent, useEffect, useState } from "react";
import { Category } from "../types/Category";
import Select from "react-select";
import { Tag, TagsOptions } from "../types/Tag";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PRODUCT } from "../mutation/ProductMutation";
import { GET_CATEGORY } from "../query/CategoryQuery";
import { GET_TAGS } from "../query/TagQuery";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [options, setOptions] = useState<TagsOptions[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagsOptions[]>([]);
  const navigate = useNavigate();

  const { data: dataCategories } = useQuery(GET_CATEGORY);
  const { data: dataTags } = useQuery(GET_TAGS);

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  useEffect(() => {
    if (dataCategories && dataCategories.getCategories) {
      setCategories(dataCategories.getCategories);
    }

    if (dataTags && dataTags.getTags) {
      const tagsOptions: TagsOptions[] = dataTags.getTags.map((tag: Tag) => ({
        value: tag.id,
        label: tag.name,
      }));
      setOptions(tagsOptions);
    }
  }, [dataCategories, dataTags]);

  const handleSumbit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    formJson.tagsId = JSON.stringify(selectedTags.map((tag) => tag.value));

    const productData = {
      title: formJson.title as string,
      description: formJson.description as string,
      owner: formJson.owner as string,
      price: formJson.price as string,
      picture: formJson.picture as string,
      location: formJson.location as string,
      categoryId: formJson.category as string,
      tagsId: selectedTags.map((tag) => tag.value),
    };
    try {
      await createProduct({
        variables: {
          data: productData,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la publication du produit:", error);
    }
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSumbit}>
      <label>
        Titre :
        <input className="text-field" type="text" name="title" />
      </label>
      <label>
        Description :
        <input className="text-field" type="text-area" name="description" />
      </label>
      <label>
        Owner :
        <input type="text" name="owner" />
      </label>
      <label>
        Prix :
        <input type="text" name="price" />
      </label>
      <label>
        Image :
        <input type="text" name="picture" />
      </label>
      <label>
        Localisation :
        <input type="text" name="location" />
      </label>
      <select name="category">
        {categories.map((category: Category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="">
        <Select
          name="tagsId"
          closeMenuOnSelect={false}
          isMulti
          options={options}
          onChange={(selectedOptions) =>
            setSelectedTags(selectedOptions as TagsOptions[])
          }
        />
      </label>
      <button> Add Product </button>
    </form>
  );
}

export default ProductForm;
