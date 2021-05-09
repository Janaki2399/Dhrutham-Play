import { useState } from "react";
import { v4 } from "uuid";
import { useDataContext } from "../contexts/data-context";
import { PlaylistCheckBox } from "./PlaylistCheckBox";

export function PlaylistDropDown({ videoId, setModal }) {

  const [input, setInput] = useState("");
  const { dispatch, state } = useDataContext();
  const [checkbox, setCheckBox] = useState(getUserPlayList());

  function checkIfItemExistsInList(playlist, videoId) {
    return playlist.find((item) => item.videoId === videoId) !== undefined;
  }

  function getUserPlayList() {
    const filteredList = state.userLibrary.filter((_, index) => index !== 0);
    return filteredList.map((item, index) => {
      if (checkIfItemExistsInList(item.list, videoId)) {
        return {
          id: item.id,
          name: item.name,
          checked: true,
        };
      }
      return {
        id: item.id,
        name: item.name,
        checked: false,
      };
    });
  }

  function createPlaylist(){
    setInput("");
    const playlistObject = {
      id: v4(),
      name: input,
      list: [
        {
          videoId,
        },
      ],
    };
    dispatch({ type: "CREATE_PLAYLIST", payload: playlistObject });
    setModal(false);
  }
  return (
    <div className="padding-left flex-column margin-bottom">
      <div
       className="drop-down"
      >
        {checkbox.map((item, index) => (
          <PlaylistCheckBox
            item={item}
            index={index}
            videoId={videoId}
            setCheckBox={setCheckBox}
          />
        ))}
      </div>
      <div className="padding-bottom padding-right">
        <input
          className="border-bottom font-size-6 full-width margin-top"
          style={{ height: "1.3rem", outline: "0" }}
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
