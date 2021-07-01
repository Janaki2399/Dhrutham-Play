import { useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import { Modal } from "./VideoList/Modal";
import { useState } from "react";
import { PlaylistDropDown } from "./PlaylistDropDown";

export function SaveButton({ videoId, selectedList, setSelectedList }) {
  const { token } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          token ? setModalOpen(true) : navigate("/login");
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
      {modalOpen && (
        <Modal setModalOpen={setModalOpen}>
          <PlaylistDropDown
            videoId={videoId}
            setModalOpen={setModalOpen}
            setSelectedList={setSelectedList}
          />
        </Modal>
      )}
    </div>
  );
}
