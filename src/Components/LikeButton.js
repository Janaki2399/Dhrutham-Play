import { useDataContext } from "../contexts/data-context";
import { useState } from "react";
export function LikeButton({ videoId }) {

  const { state,dispatch } = useDataContext();

  function getVideoObject(id){
    return state.allVideos.find((item)=>item.id===id);
  }
  return (
    <div>
      <button
        onClick={() => {
          !(getVideoObject(videoId).isLiked)?dispatch({type:"APPEND_ITEM_TO_LIKED_VIDEOS",payload:{videoId}})
          :dispatch({type:"REMOVE_FROM_LIKED_VIDEOS",payload:{
            videoId
          }})
          
        }}
        className="nav-item btn-box">
        <span
          class={
            !(getVideoObject(videoId)).isLiked
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
