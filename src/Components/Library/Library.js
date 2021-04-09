import { useDataContext } from "../../contexts/data-context";
import {Link} from "react-router-dom";
import {CategoryItem} from "../Category/CategoryItem";
import {LibraryItem} from "./LibraryItem";
export function Library(){
  
const {state,dispatch}=useDataContext();

    return(
        <div>
        <div className="grid-col-3">{
            state.userLibrary.map((item,index)=>{
                return <LibraryItem key={item.id} categoryItem={item} isUserPlayList={index===0?false:true}/>   
            })
        }
        </div>
        </div>
    )
        
}