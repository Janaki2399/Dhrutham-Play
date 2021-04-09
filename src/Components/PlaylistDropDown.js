import { useState } from "react";
import { v4 } from "uuid";
import { useDataContext } from "../contexts/data-context";
export function PlaylistDropDown({ videoId,setModal}) {
  const [input, setInput] = useState("");
  const { dispatch, state } = useDataContext();

  function checkIfItemExistsInList(playlist, videoId) {
    return playlist.find((item) => item.videoId === videoId) !== undefined;
  }

  function getUserPlayList(){

    const filteredList=state.userLibrary.filter((_,index)=>index!==0);
    return filteredList.map((item,index)=>{
    
        if(checkIfItemExistsInList(item.list,videoId)){
          return {
            id:item.id,
            name:item.name,
            checked:true
          }
        }
        return {
          id:item.id,
          name:item.name,
          checked:false
        }
    
    })
  }

  const [checkbox,setCheckBox]=useState(getUserPlayList());

  function handleToggle(i){
    setCheckBox((prev)=>
    prev.map((item,index)=>
    index===i?
    {...item,checked:!item.checked}
    :item))
  }
  return (
    <div  className="padding-left  flex-column">
      <div style={{marginBottom:"1rem", maxHeight: "20rem",
  overflowY: "scroll"}}>
        {
          checkbox.map((item,index)=>
            <div className="flex-horizontal margin-top cursor-pointer" 
               >
              <input
                type="checkbox"
                id={item.id}
                className="margin-right"
                style={{height:"1.2rem",width:"1.2rem"}}
                checked={item.checked}
                onChange={(e) => {
                  
                  handleToggle(index);
                if(e.target.checked){
                  dispatch({
                        type: "APPEND_TO_PLAYLIST",
                        payload: { videoId, playlistId:item.id }
                      });
                }
                else{
                  dispatch({
                    type: "REMOVE_ITEM_FROM_PLAYLIST",
                    payload: { videoId, playlistId:item.id }
                  });
                }
                  }}
              />
              <label style={{width:"100%",fontSize:"1rem"}}for={item.id}>{item.name}</label>
              </div>
          )
        }
      </div>
      <div className="padding-bottom padding-right">
      <input
      className="border-bottom font-size-6 full-width"
        style={{ height:"1.3rem",outline:"0"}}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="Enter Playlist name"
      ></input>
 
     {input!=="" && <button
        className="margin-top padding-right btn btn-text text-end full-width"
        style={{ color: "#1E40AF" }}
        
        onClick={() => {
          setInput("");
          const playlistObject = {
            id: v4(),
            name: input,
            list: [
              {
              videoId
            }
            ]
          };
          dispatch({ type: "CREATE_PLAYLIST", payload: playlistObject });
          setModal(false);
        }}
      >
         CREATE
      </button>}
      </div>
    </div>
  );
}
