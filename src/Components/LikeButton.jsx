import { useDataContext } from "../contexts/data-context";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router";
import { useUserActionAPI } from "../hooks/useUserActionAPI";

export function LikeButton({ videoId, selectedList, setSelectedList }) {
  const { state } = useDataContext();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { likeVideo, unLikeVideo } = useUserActionAPI();

  const isVideoLiked = () => {
    if (state.userLibrary.list && state.userLibrary.list[0]) {
      return (
        state.userLibrary.list[0]?.list.find((item) => item._id === videoId) !==
        undefined
      );
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          token
            ? !isVideoLiked()
              ? likeVideo(videoId, selectedList, setSelectedList)
              : unLikeVideo(videoId, selectedList, setSelectedList)
            : navigate("/login");
        }}
        className="icon-btn btn-box margin-right "
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
