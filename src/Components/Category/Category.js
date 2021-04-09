import { useDataContext } from "../../contexts/data-context"
import {CategoryItem} from "./CategoryItem";
import {Link} from "react-router-dom";

export function Category(){
    const {state}=useDataContext();
    return(
        <div className="grid-col-3">
        {
        state.categoryPlaylist.map((categoryItem)=>{
            return <CategoryItem key={categoryItem.id} categoryItem={categoryItem} isUserPlayList={false}/>
        })
         }
        </div>
    )
}