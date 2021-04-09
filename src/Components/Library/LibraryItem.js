import { RemoveButton } from "../RemoveButton";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useDataContext } from "../../contexts/data-context";

export function LibraryItem({categoryItem,isUserPlayList}){
    const navigate=useNavigate();
    const {dispatch}=useDataContext();

    function removeItem(event,id){
        event.stopPropagation();
        dispatch({
            type: "DELETE_PLAYLIST",
            payload: {
              playlistId:id,  
            }
          });
    }
    return(
        <div>
        <div className="card card-shadow card-vertical"
              style={{ maxWidth: "15rem" }}
              onClick={()=>{ navigate(`/playlist/${categoryItem.id}`)}}>
                <div className="relative-position" >
                  
                    <img className="card-img" src={categoryItem.list.length>0
                      ?`https://img.youtube.com/vi/${categoryItem.list[0].videoId}/0.jpg`
                      :`https://i.ytimg.com/img/no_thumbnail.jpg`}  alt="video-img"/>
                   

                      <div className="card-icon-topRight " style={{width:"5rem",backgroundColor:"rgba(0,0,0,0.6)",color:"white"}}>
                      <div className="flex-column center-align-ver-hor" style={{height:"11rem"}} >
                        <div>
                        {categoryItem.list.length}
                        </div>
                        <div>
                        <span class="material-icons-outlined icon-size-30">
                          playlist_play
                          </span>
                        </div>
                      </div>
                     
                      </div>
                </div>
                <div className="card-content-padding flex-horizontal space-between center-align"  >
                     <div className="card-title font-size-5 ">{categoryItem.name}</div>
                     <div>
                     {isUserPlayList&& <RemoveButton id={categoryItem.id} removeItem={removeItem}/>} 
                     </div>
                </div>
        </div>    
        </div>
        
    )
}