import { useDataContext } from "../../contexts/data-context";
import { RemoveButton } from "../RemoveButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";

export function SideBarNav({ setVideoId, isUserPlayList }) {
  const {
    state: { selectedCategory },
    dispatch,
  } = useDataContext();
  const { token } = useAuth();
  const navigate = useNavigate();

  const removeFromListAndServer = async (videoId) => {
    try {
      const { data, status } = await axios.delete(
        `https://dhrutham-play-backend.herokuapp.com/playlist/${selectedCategory._id}/${videoId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        dispatch({
          type: "REMOVE_ITEM_FROM_PLAYLIST",
          payload: {
            playlistId: selectedCategory._id,
            videoId,
          },
        });
        dispatch({
          type: "REMOVE_ITEM_FROM_SELECTED_PLAYLIST",
          payload: videoId,
        });
      }
    } catch (error) {
      alert(error);
      // hideToast();
    }
  };
  const removeItem = (event, videoId) => {
    event.stopPropagation();
    removeFromListAndServer(videoId);
  };
  return (
    <nav>
      {selectedCategory.list.map(({ _id, youtubeId, name }) => (
        <div
          key={_id}
          className="flex-horizontal "
          onClick={() => {
            setVideoId(_id);
            navigate(`/${isUserPlayList}/${selectedCategory._id}/${_id}`);
          }}
        >
          <div className="margin-right">
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/0.jpg`}
              alt="img"
              width="120"
            />
          </div>
          <div className="flex-horizontal space-between center-align">
            <div className="font-bold-1 font-size-5">{name}</div>
            {isUserPlayList == "playlist" && ( //change the name of isUserPlaylist
              <RemoveButton id={_id} removeItem={removeItem} />
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}
