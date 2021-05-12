import { useDataContext } from "../contexts/data-context";
import axios from "axios";
export function LikeButton({ videoId }) {

  const { state,dispatch } = useDataContext();
//  console.log({state:state.userLibrary[0]});
  // const getVideoObject = (id) => {
  //   return state.allVideos.find((item)=>item.id===id);
  // }

  const isVideoLiked = () => {
    if(state.userLibrary[0]){
    return state.userLibrary[0].list.find((item)=>item._id===videoId)!==undefined;
    }
  }

  const addToListAndServer = async () => {
    try {
      // showToast(`Adding to ${toastItem}`);
      const { data, status } = await axios.post(`https://dhrutham-play-backend.janaki23.repl.co/library/${state.userLibrary[0]._id}`, {
        "_id":videoId
      });
      if (status === 200) {
        dispatch({ type: "APPEND_ITEM_TO_LIKED_VIDEOS", payload: data.updated });
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
  const removeFromListAndServer = async () => {
    try {
      const { data,status } = await axios.delete(`https://dhrutham-play-backend.janaki23.repl.co/library/${state.selectedCategory._id}/${videoId}`);
     
      if (status === 200) {
        dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: data.updated });
        if(state.selectedCategory._id===state.userLibrary[0]._id){
          dispatch({type:"REMOVE_ITEM_FROM_SELECTED_PLAYLIST",payload:videoId})
        }
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
  return (
    <div>
      <button
        onClick={() => {
          !(isVideoLiked())?addToListAndServer()
          :removeFromListAndServer()
          
        }}
        className="icon-btn btn-box margin-right">
        <span
          class={
            !(isVideoLiked())
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
