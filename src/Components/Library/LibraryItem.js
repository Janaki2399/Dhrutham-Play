import { RemoveButton } from "../RemoveButton";
import { Link, useNavigate } from "react-router-dom";
import { LibraryItemImage } from "./LibraryItemImage";
import { useDataContext } from "../../contexts/data-context";
import { LibraryItemOverlay } from "./LibraryItemOverlay";

export function LibraryItem({ categoryItem, isUserPlayList }) {
  const navigate = useNavigate();
  const { dispatch } = useDataContext();

  const removeItem = (event, id) => {
    event.stopPropagation();
    dispatch({
      type: "DELETE_PLAYLIST",
      payload: {
        playlistId: id,
      },
    });
  }
  return (
    <div>
      <div
        className="card card-shadow card-vertical"
        onClick={() => {
          if(categoryItem.list.length>0){
          navigate(`/library/${categoryItem._id}/${categoryItem.list[0]._id}`)}
        }}
      >
        <div className="relative-position">
          <LibraryItemImage categoryItem={categoryItem} />
          <LibraryItemOverlay categoryItem={categoryItem} />
        </div>
        <div className="card-content-padding flex-horizontal space-between center-align">
          <div className="card-title font-size-5 ">{categoryItem.name}</div>
          <div>
            {isUserPlayList && (
              <RemoveButton id={categoryItem.id} removeItem={removeItem} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
