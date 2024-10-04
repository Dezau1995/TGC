import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Category } from "../types/Category";
import Select from "react-select";
import { Tag, TagsOptions } from "../types/Tag";

function ProductForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [options, setOptions] = useState<TagsOptions[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagsOptions[]>([]);

  async function fetchCategories() {
    const { data } = await axios.get<Category[]>(
      "http://localhost:3000/categories/"
    );
    setCategories(data);
  }

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

  useEffect(() => {
    fetchCategories();
    fetchOption();
  }, []);

  const handleSumbit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);
    const formJson = Object.fromEntries(formData.entries());
    formJson.tagsId = JSON.stringify(selectedTags.map(tag => ( tag.value)));

    axios.post("http://localhost:3000/products/", formJson);
  };

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
      <label>
        Créer :
        <input type="text" name="createdAt" />
      </label>
      <select name="category">
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="">
        <Select
          name="tags"
          closeMenuOnSelect={false}
          isMulti
          options={options}
          onChange={(selectedOptions) => setSelectedTags(selectedOptions as TagsOptions[])}
        />
      </label>
      <button> Add Product </button>
    </form>
  );
}

export default ProductForm;
