import { useDataContext } from "../../contexts/data-context";
import { CategoryItem } from "./CategoryItem";
import {categoryPlaylistData, categoryPlayListData} from "../../data";

export function Category() {
  const { state } = useDataContext();
  return (
    <div className="grid-col-3">
      {categoryPlayListData.map(({id,...categoryItem}) => {
        return (
          <CategoryItem
            key={id}
            categoryItem={{...categoryItem,id}}
            isUserPlayList={false}
          />
        );
      })}
    </div>
  );
}
