import { useState } from "react";
import { useLibraryContext } from "../contexts/library-context";
import { PlaylistCheckBox } from "./PlaylistCheckBox";
import { useUserActionAPI } from "../hooks/useUserActionAPI";

export function PlaylistDropDown({ videoId, setSelectedList }) {
  const [input, setInput] = useState("");
  const { state } = useLibraryContext();
  const { createNewPlaylistAndAddVideo } = useUserActionAPI();

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
        {state.userLibrary.list.map(
          ({ _id, name, list }, index) =>
            index !== 0 && (
              <PlaylistCheckBox
                key={_id}
                playlistId={_id}
                playlistName={name}
                playlistVideoList={list}
                videoId={videoId}
                setSelectedList={setSelectedList}
                isvideoInList={isVideoInList}
              />
            )
        )}
      </div>
      <div className="padding-bottom padding-right">
        <input
          className="border-bottom font-size-6 full-width margin-top playlist-creation-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Enter Playlist name"
        ></input>

        {input !== "" && (
          <div className="float-right">
            <button
              className="margin-top  btn btn-text full-width color-blue"
              onClick={createPlaylist}
            >
              CREATE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
