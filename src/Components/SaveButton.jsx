import { useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";

export function SaveButton({ videoId, setModal }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          token ? setModal(true) : navigate("/login");
        }}
        className="nav-item btn-box"
      >
        <span className=" material-icons-outlined icon-color-gray icon-size-30">
          playlist_add
        </span>

        <div>
          <span className="font-size-5 font-bold-1">SAVE</span>
        </div>
      </button>
    </div>
  );
}
