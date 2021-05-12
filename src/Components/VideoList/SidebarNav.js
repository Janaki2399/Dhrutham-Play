import { useDataContext } from "../../contexts/data-context";
import { RemoveButton } from "../RemoveButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function SideBarNav({ playlistId, list,setSelectedCategory, setVideoId, isUserPlayList }) {
  const { state, dispatch } = useDataContext();
  const navigate = useNavigate();
  const getVideoObject = (id) =>{
    return state.allVideos.find((item) => item.id === id);
  }

  const removeFromListAndServer = async (videoId) => {
    try {
      const { data,status } = await axios.delete(`https://dhrutham-play-backend.janaki23.repl.co/library/${state.selectedCategory._id }/${videoId}`);
     
      if (status === 200) {
        dispatch({ type: "REMOVE_ITEM_FROM_PLAYLIST", payload: {playlistId:state.selectedCategory._id ,list:data.updated.list} });
        dispatch({type:"REMOVE_ITEM_FROM_SELECTED_PLAYLIST",payload:videoId})
        // if (list === "wishlist") {
        //   dispatch({ type: "DECREMENT_WISHLIST_COUNT" });
        // } else if (list === "cart") {
        //   dispatch({ type: "DECREMENT_CART_COUNT" });
        // }
        // showToast(toastMessage);
        // hideToast();
      }
    } catch (error) {
      alert(error);
      // hideToast();
    }
  }
  const removeItem = (event, videoId) => {
    event.stopPropagation();
    removeFromListAndServer(videoId);
  }
  return (
    <nav>
      {state.selectedCategory.list.map((item, index) => (
        <div
          className="flex-horizontal "
          onClick={() => {
            setVideoId(item._id);
            navigate(`/${isUserPlayList}/${state.selectedCategory._id}/${item._id}`);
          }}
        >
          <div className="margin-right">
            <img
              src={`https://img.youtube.com/vi/${item.youtubeId}/0.jpg`}
              alt="img"
              width="120"
            />
          </div>
          <div className="flex-horizontal space-between center-align">
            <div className="font-bold-1 font-size-5">
              {item.name}
            </div>
            {isUserPlayList =="library"&& (
              <RemoveButton id={item._id} removeItem={removeItem} />
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}
