import { useDataContext } from "../contexts/data-context";
import { LibraryItem } from "../Components/Library/LibraryItem";
import { APIStatus } from "../constants";
import { useState } from "react";

export function Library() {
  const { state } = useDataContext();
  const [status, setStatus] = useState(APIStatus.IDLE);
  return (
    <div>
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
