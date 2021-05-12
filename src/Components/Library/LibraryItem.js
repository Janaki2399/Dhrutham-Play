import { RemoveButton } from "../RemoveButton";
import { Link, useNavigate } from "react-router-dom";
import { LibraryItemImage } from "./LibraryItemImage";
import { useDataContext } from "../../contexts/data-context";
import { LibraryItemOverlay } from "./LibraryItemOverlay";
import axios from "axios";

export function LibraryItem({ categoryItem, isUserPlayList }) {
  const navigate = useNavigate();
  const { dispatch } = useDataContext();

  const removeFromListAndServer = async (id) => {
    try {
      const { data,status } = await axios.delete(`https://dhrutham-play-backend.janaki23.repl.co/library/${id}`);
     
      if (status === 200) {
        dispatch({ type: "DELETE_PLAYLIST", payload: {playlistId:id} });
     
        // if (list === "wishlist") {
        //   dispatch({ type: "DECREMENT_WISHLIST_COUNT" });
        // } else if (list === "cart") {
        //   dispatch({ type: "DECREMENT_CART_COUNT" });
        // }
        // showToast(toastMessage);
        // hideToast();
      }
    } catch (error) {
      alert(error);
      // hideToast();
    }
  }

  const removeItem = (event, id) => {
    event.stopPropagation();
    // dispatch({
    //   type: "DELETE_PLAYLIST",
    //   payload: {
    //     playlistId: id,
    //   },
    // });
    removeFromListAndServer(id);
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
              <RemoveButton id={categoryItem._id} removeItem={removeItem} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
