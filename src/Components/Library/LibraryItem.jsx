import { RemoveButton } from "../RemoveButton";
import { Link, useNavigate } from "react-router-dom";
import { LibraryItemImage } from "./LibraryItemImage";
import { useDataContext } from "../../contexts/data-context";
import { LibraryItemOverlay } from "./LibraryItemOverlay";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";

export function LibraryItem({ categoryItem, isUserPlayList }) {
  const navigate = useNavigate();
  const { dispatch } = useDataContext();
  const { token } = useAuth();

  const removeFromListAndServer = async (id) => {
    try {
      const { data, status } = await axios.delete(
        `https://dhrutham-play-backend.herokuapp.com/playlist/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        dispatch({ type: "DELETE_PLAYLIST", payload: { playlistId: id } });
      }
    } catch (error) {
      alert(error);
    }
  };

  const removeItem = (event, id) => {
    event.stopPropagation();
    removeFromListAndServer(id);
  };
  return (
    <div>
      <div
        className="card card-shadow card-vertical"
        onClick={() => {
          if (categoryItem.list?.length > 0) {
            navigate(
              `/playlist/${categoryItem._id}/${categoryItem.list[0]._id}`
            );
          }
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
