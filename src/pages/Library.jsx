import { useDataContext } from "../contexts/data-context";
import { LibraryItem } from "../Components/Library/LibraryItem";
import { API_STATUS } from "../constants";
import { useState } from "react";

export function Library() {
  const { state } = useDataContext();
  // console.log(userLibrary);
  const [status, setStatus] = useState(API_STATUS.IDLE);
  return (
    <div className="grid-wrapper">
      <div className="grid-col-3">
        {state.userLibrary.list?.map((item, index) => {
          return (
            <LibraryItem
              key={item._id}
              categoryItem={item}
              isUserPlayList={index !== 0}
            />
          );
        })}
      </div>
    </div>
  );
}
