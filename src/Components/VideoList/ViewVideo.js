import { LikeButton } from "../LikeButton";
import { SaveButton } from "../SaveButton";
import { useDataContext } from "../../contexts/data-context";
export function ViewVideo({ videoId, setModal }) {
  const { state } = useDataContext();
  function getVideoObject(id) {
    return state.allVideos.find((item) => item.id === id);
  }
  return (
    <div>
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${getVideoObject(videoId).id}`}
          title="song"
        ></iframe>
      </div>
      <div className="card-horizontal center-align videoElements padding-top">
        <div className="font-size-4 font-bold-1">
          {getVideoObject(videoId).name}
        </div>
        <div className="nav-list">
          <LikeButton videoId={videoId} />
          <SaveButton videoId={videoId} setModal={setModal} />
        </div>
      </div>
    </div>
  );
}
