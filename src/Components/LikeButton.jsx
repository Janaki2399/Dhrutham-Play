import { useDataContext } from "../contexts/data-context";
import axios from "axios";
import { useAuth } from "../contexts/auth-context";
export function LikeButton({ videoId }) {
  const { state, dispatch } = useDataContext();
  const { token } = useAuth();
  console.log(state.userLibrary);
  console.log(videoId);
  const isVideoLiked = () => {
    if (state.userLibrary.list && state.userLibrary.list[0]) {
      return (
        state.userLibrary.list[0]?.list.find((item) => item._id === videoId) !==
        undefined
      );
    }
  };

  const addToListAndServer = async () => {
    try {
      const { data, status } = await axios.post(
        `https://dhrutham-play-backend.herokuapp.com/playlist/${state.userLibrary.list[0]._id}`,
        {
          _id: videoId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        dispatch({
          type: "APPEND_ITEM_TO_LIKED_VIDEOS",
          payload: { _id: videoId },
        });
      }
    } catch (error) {
      alert(error);
    }
  };
  const removeFromListAndServer = async () => {
    try {
      const { data, status } = await axios.delete(
        `https://dhrutham-play-backend.herokuapp.com/playlist/${state.userLibrary.list[0]._id}/${videoId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        dispatch({
          type: "REMOVE_FROM_LIKED_VIDEOS",
          payload: { _id: videoId },
        });
        if (state.selectedCategory._id === state.userLibrary.list[0]._id) {
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
