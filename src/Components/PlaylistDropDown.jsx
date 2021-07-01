import { useState } from "react";
import { useDataContext } from "../contexts/data-context";
import { PlaylistCheckBox } from "./PlaylistCheckBox";
import { useUserActionAPI } from "../hooks/useUserActionAPI";

export function PlaylistDropDown({ videoId, setModalOpen, setSelectedList }) {
  const [input, setInput] = useState("");
  const { state } = useDataContext();
  const { createNewPlaylistAndAddVideo, newPlaylistStatus } =
    useUserActionAPI();

  function isVideoInList(playlist, videoId) {
    return playlist.find((item) => item._id === videoId) !== undefined;
  }

  async function createPlaylist() {
    setInput("");
    const playlistObject = {
      name: input,
      list: [
        {
          _id: videoId,
        },
      ],
    };
    createNewPlaylistAndAddVideo(playlistObject);
  }
  return (
    <div className="padding-left flex-column margin-bottom">
      <div className="drop-down">
        {state.userLibrary.list.map(({ _id, name, list }) => (
          <PlaylistCheckBox
            key={_id}
            playlistId={_id}
            playlistName={name}
            playlistVideoList={list}
            videoId={videoId}
            setSelectedList={setSelectedList}
            isvideoInList={isVideoInList}
          />
        ))}
      </div>
      <div className="padding-bottom padding-right">
        <input
          className="border-bottom font-size-6 full-width margin-top checkbox-size"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Enter Playlist name"
        ></input>

        {input !== "" && (
          <button
            className="margin-top padding-right btn btn-text text-end full-width color-blue"
            onClick={createPlaylist}
          >
            CREATE
          </button>
        )}
      </div>
    </div>
  );
}
