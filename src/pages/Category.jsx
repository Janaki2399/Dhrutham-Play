import { useDataContext } from "../contexts/data-context";
import { CategoryItem } from "../Components/Category/CategoryItem";
import { useState, useEffect } from "react";
import axios from "axios";

export function Category() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const { data, status } = await axios.get(
          `https://dhrutham-play-backend.herokuapp.com/categories`
        );

        if (status === 200) {
          setCategories(data.categories);
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, []);
  return (
    <div>
      <div>
        <img
          className="full-width"
          src="https://raagatharanga.files.wordpress.com/2018/09/carnatic_classical_music.jpg"
          alt="product-card"
          loading="lazy"
          height="550"
        />
      </div>
      <div className="font-size-2 text-center margin-bottom">
        Curated Videos to make your learning hassle free
      </div>
      <div className="grid-col-3 margin-all">
        {categories.map(({ _id, ...categoryItem }) => {
          return (
            <CategoryItem
              key={_id}
              categoryItem={{ ...categoryItem, _id }}
              isUserPlayList={false}
            />
          );
        })}
      </div>
    </div>
  );
}
