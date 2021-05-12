import { useDataContext } from "../contexts/data-context";
import axios from "axios";
export function PlaylistCheckBox({ item, index, videoId, setCheckBox }) {
  const { dispatch, state } = useDataContext();

  const handleToggle = (i)=> {
    setCheckBox((prev) =>
      prev.map((item, index) =>
        index === i ? { ...item, checked: !item.checked } : item
      )
    );
  }

  const addToListAndServer = async () => {
    try {
      // showToast(`Adding to ${toastItem}`);
      const { data, status } = await axios.post(`https://dhrutham-play-backend.janaki23.repl.co/library/${item.id}`, {
        "_id":videoId
      });
      if (status === 200) {
        dispatch({ type: "APPEND_TO_PLAYLIST",  payload: {playlistId: item.id ,list:data.updated.list} });
         
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
      const { data,status } = await axios.delete(`https://dhrutham-play-backend.janaki23.repl.co/library/${item.id}/${videoId}`);
     
      if (status === 200) {
        dispatch({ type: "REMOVE_ITEM_FROM_PLAYLIST", payload: {playlistId: item.id ,list:data.updated.list} });
        if(state.selectedCategory._id===item.id){
          dispatch({type:"REMOVE_ITEM_FROM_SELECTED_PLAYLIST",payload:videoId})
          // setSelectedCategory((prev)=>({...prev,list:prev.list.filter((item)=>item._id!==videoId)}));
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
  const toggleCheckBox = (event) =>{
    handleToggle(index);
    if (event.target.checked) {
      addToListAndServer();
      // dispatch({
      //   type: "APPEND_TO_PLAYLIST",
      //   payload: { videoId, playlistId: item.id },
      // });
    } else {
      removeFromListAndServer();
      // dispatch({
      //   type: "REMOVE_ITEM_FROM_PLAYLIST",
      //   payload: { videoId, playlistId: item.id },
      // });
    }
  }
  return (
    <div className="flex-horizontal margin-top cursor-pointer">
      <input
        type="checkbox"
        id={item.id}
        className="margin-right checkbox-size"
        checked={item.checked}
        onChange={toggleCheckBox}
      />
      <label className="full-width font-size-5" for={item.id}>
        {item.name}
      </label>
    </div>
  );
}
