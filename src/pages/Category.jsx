import { useDataContext } from "../contexts/data-context";
import { CategoryItem } from "../Components/Category/CategoryItem";
import {useState,useEffect} from "react";
import axios from "axios";

export function Category() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const { data, status } = await axios.get(
          `https://dhrutham-play-backend.janaki23.repl.co/categories`
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
    <div className="grid-col-3">
      {categories.map(({_id,...categoryItem}) => {
        return (
          <CategoryItem
            key={_id}
            categoryItem={{...categoryItem,_id}}
            isUserPlayList={false}
          />
        );
      })}
    </div>
  );
}
