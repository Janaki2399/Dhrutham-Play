import { useDataContext } from "../../contexts/data-context";
import { CategoryItem } from "./CategoryItem";
import {categoryPlaylistData, categoryPlayListData} from "../../data";

export function Category() {
  const { state } = useDataContext();
  return (
    <div className="grid-col-3">
      {categoryPlayListData.map((categoryItem) => {
        return (
          <CategoryItem
            key={categoryItem.id}
            categoryItem={categoryItem}
            isUserPlayList={false}
          />
        );
      })}
    </div>
  );
}
