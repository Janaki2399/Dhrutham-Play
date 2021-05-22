import { useDataContext } from "../contexts/data-context";
import axios from "axios";
export function LikeButton({ videoId }) {
  const { state, dispatch } = useDataContext();

  const isVideoLiked = () => {
    if (state.userLibrary[0]) {
      return (
        state.userLibrary[0].list.find((item) => item._id === videoId) !==
        undefined
      );
    }
  };

  const addToListAndServer = async () => {
    try {
      const { data, status } = await axios.post(
        `https://dhrutham-play-backend.herokuapp.com/library/${state.userLibrary[0]._id}`,
        {
          _id: videoId,
        }
      );
      if (status === 200) {
        dispatch({
          type: "APPEND_ITEM_TO_LIKED_VIDEOS",
          payload: data.updated,
        });
      }
    } catch (error) {
      alert(error);
    }
  };
  const removeFromListAndServer = async () => {
    try {
      const { data, status } = await axios.delete(
        `https://dhrutham-play-backend.herokuapp.com/library/${state.selectedCategory._id}/${videoId}`
      );

      if (status === 200) {
        dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: data.updated });
        if (state.selectedCategory._id === state.userLibrary[0]._id) {
          dispatch({
            type: "REMOVE_ITEM_FROM_SELECTED_PLAYLIST",
            payload: videoId,
          });
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          !isVideoLiked() ? addToListAndServer() : removeFromListAndServer();
        }}
        className="icon-btn btn-box margin-right"
      >
        <span
          className={
            !isVideoLiked()
              ? " material-icons-outlined icon-color-gray "
              : "material-icons icon-color-primary "
          }
        >
          thumb_up
        </span>
      </button>
    </div>
  );
}
