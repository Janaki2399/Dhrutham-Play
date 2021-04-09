
import {Link, Navigate, useNavigate} from "react-router-dom";
import { useDataContext } from "../../contexts/data-context";

export function CategoryItem({categoryItem,isUserPlayList}){
    const navigate=useNavigate();
    const {dispatch}=useDataContext();

    return(
        
        <div className="card card-shadow card-vertical"
              style={{ maxWidth: "15rem" }}
              onClick={()=>{navigate(`/category/${categoryItem.id}`)}}>
                <div>
                    <img className="card-img" src={categoryItem.list.length>0?`https://img.youtube.com/vi/${categoryItem.list[0].videoId}/0.jpg`:`https://icon-library.com/images/video-playlist-icon/video-playlist-icon-23.jpg`}  alt="video-img"/>
                </div>
                <div className="card-content-padding flex-horizontal space-between">
                     <div className="card-title font-size-5 ">{categoryItem.name}</div>
                    <div className="card-text font-size-5">
                     {categoryItem.list.length} Videos{" "} 
                     </div>
                </div>
        </div>        
    )
}

