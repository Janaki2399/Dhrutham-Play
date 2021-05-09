import { useDataContext } from "../../contexts/data-context";
import { LibraryItem } from "./LibraryItem";
export function Library() {
  const { state } = useDataContext();

  return (
    <div>
      <div className="grid-col-3">
        {state.userLibrary.map((item, index) => {
          return (
            <LibraryItem
              key={item.id}
              categoryItem={item}
              isUserPlayList={index !== 0 }
            />
          );
        })}
      </div>
    </div>
  );
}
