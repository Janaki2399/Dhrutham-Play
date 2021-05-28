import { useState } from "react";
import { useDataContext } from "../contexts/data-context";
import { PlaylistCheckBox } from "./PlaylistCheckBox";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";

export function PlaylistDropDown({ videoId, setModal }) {
  const [input, setInput] = useState("");
  const { dispatch, state } = useDataContext();
  const { token } = useAuth();
  const [checkbox, setCheckBox] = useState(getUserPlayList());

  function checkIfItemExistsInList(playlist, videoId) {
    return playlist.find((item) => item._id === videoId) !== undefined;
  }

  function getUserPlayList() {
    const filteredList = state.userLibrary.list.filter(
      (_, index) => index !== 0
    );
    return filteredList.map((item, index) => {
      if (checkIfItemExistsInList(item.list, videoId)) {
        return {
          id: item._id,
          name: item.name,
          checked: true,
        };
      }
      return {
        id: item._id,
        name: item.name,
        checked: false,
      };
    });
  }
  const addToListAndServer = async (playlistObject) => {
    try {
      // showToast(`Adding to ${toastItem}`);
      const { data, status } = await axios.post(
        `https://dhrutham-play-backend.herokuapp.com/library`,
        playlistObject,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        dispatch({ type: "SET_LIBRARY", payload: data.library });
      }
    } catch (error) {
      alert(error);
    }
  };

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
    addToListAndServer(playlistObject);
    // dispatch({ type: "CREATE_PLAYLIST", payload: playlistObject });
    setModal(false);
  }
  return (
    <div className="padding-left flex-column margin-bottom">
      <div className="drop-down">
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
