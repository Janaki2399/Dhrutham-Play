import { useState } from "react";
import { v4 } from "uuid";
import { useDataContext } from "../contexts/data-context";
import { PlaylistCheckBox } from "./PlaylistCheckBox";
import axios from "axios";

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
  const addToListAndServer = async (playlistObject) => {
    try {
      // showToast(`Adding to ${toastItem}`);
      const { data, status } = await axios.post(`https://dhrutham-play-backend.janaki23.repl.co/library`,playlistObject );
      if (status === 200) {
        dispatch({ type: "CREATE_PLAYLIST", payload: data.libraryItem });
        // if (list === "wishlistItem") {
        //   dispatch({ type: "INCREMENT_WISHLIST_COUNT" });
        // } else if (list === "cartItem") {
        //   dispatch({ type: "INCREMENT_CART_COUNT" });
        // }
        // showToast(`Added to ${toastItem}`);
        // hideToast();
      }
    } catch (error) {
      // hideToast();
      // if (error.response.status !== 409) {
      //   // alert(error);
      // }
      alert(error);
    }
  }

  async function createPlaylist(){
    setInput("");
    const playlistObject = {
      "name": input,
      "list": [
        {
          "_id":videoId,
        },
      ],
    };
    addToListAndServer(playlistObject);
    // dispatch({ type: "CREATE_PLAYLIST", payload: playlistObject });
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
