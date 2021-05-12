import { LikeButton } from "../LikeButton";
import { SaveButton } from "../SaveButton";
import { useDataContext } from "../../contexts/data-context";

export function ViewVideo({ videoObject, setModal }) {
  const { state } = useDataContext();
 
  const getVideoObject = (id) => {
    return state.allVideos.find((item) => item.id === id);
  }
  return (
    <div>
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${videoObject.youtubeId}`}
          title="song"
        ></iframe>
      </div>
      <div className="card-horizontal center-align videoElements padding-top">
        <div className="font-size-4 font-bold-1">
          {videoObject.name}
        </div>
        <div className="nav-list">
          <LikeButton videoId={videoObject._id}/>
          <SaveButton videoId={videoObject._id} setModal={setModal} />
        </div>
      </div>
    </div>
  );
}
