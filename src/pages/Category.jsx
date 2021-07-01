import { useDataContext } from "../contexts/data-context";
import { CategoryItem } from "../Components/Category/CategoryItem";
import { useState, useEffect } from "react";
import { API_STATUS } from "../constants";
import axios from "axios";
import illustration1 from "../assets/music file2-09.svg";
import { useGetDataAPI } from "../hooks/useGetDataAPI";

export function Category() {
  // const [categories, setCategories] = useState([]);
  const { state } = useDataContext();
  const { categoriesStatus } = useGetDataAPI();

  if (categoriesStatus === "loading") {
    return <div className="loader center-page-align" />;
  }
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       setStatus(API_STATUS.LOADING);
  //       const { data, status } = await axios.get(
  //         `https://dhrutham-play-backend.herokuapp.com/categories`
  //       );

  //       if (status === 200) {
  //         setStatus(API_STATUS.SUCCESS);
  //         setCategories(data.categories);
  //       }
  //     } catch (error) {
  //       setStatus(API_STATUS.ERROR);
  //       alert(error);
  //     }
  //   })();
  // }, []);

  // if ((status === API_STATUS.LOADING) | (status === API_STATUS.IDLE)) {
  //   return <div className="loader center-page-align" />;
  // }
  return (
    <div className="grid-wrapper margin-right">
      <div className="grid-col-3  ">
        {state.categoriesWithoutVideoDetails?.map(
          ({ _id, ...categoryItem }) => {
            return (
              <CategoryItem
                key={_id}
                categoryItem={{ ...categoryItem, _id }}
                isUserPlayList={false}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
