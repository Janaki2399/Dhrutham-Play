import { useDataContext } from "../../contexts/data-context";
import { RemoveButton } from "../RemoveButton";

export function SideBarNav({ playlistId, list, setVideoId, isUserPlayList }) {
  const { state, dispatch } = useDataContext();

  const getVideoObject = (id) =>{
    return state.allVideos.find((item) => item.id === id);
  }

  const removeItem = (event, videoId) => {
    event.stopPropagation();
    dispatch({
      type: "REMOVE_ITEM_FROM_PLAYLIST",
      payload: {
        playlistId,
        videoId,
      },
    });
  }
  return (
    <nav>
      {list.map((item, index) => (
        <div
          className="flex-horizontal "
          onClick={() => {
            setVideoId(item.videoId);
          }}
        >
          <div className="margin-right">
            <img
              src={`https://img.youtube.com/vi/${item.videoId}/0.jpg`}
              alt="img"
              width="120"
            />
          </div>
          <div className="flex-horizontal space-between center-align">
            <div className="font-bold-1 font-size-5">
              {getVideoObject(item.videoId).name}
            </div>
            {isUserPlayList && (
              <RemoveButton id={item.videoId} removeItem={removeItem} />
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}
