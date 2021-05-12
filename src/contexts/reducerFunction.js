import { videoData } from "../data";

export function reducerFunction(state, action) {
    switch (action.type) {
      case "SET_LIBRARY":
        return {
          ...state,
          userLibrary:action.payload
        }
      
      case "SET_SELECTED_LIST":
        return {
          ...state,
          selectedCategory:action.payload
        }
      
      case "REMOVE_ITEM_FROM_SELECTED_PLAYLIST":
        return {
          ...state,
          selectedCategory:{...state.selectedCategory,list:state.selectedCategory.list.filter((item)=>item._id !==action.payload)}
        }

      case "ADD_ALL_VIDEOS":
        return {
          ...state,
          // allVideos:action.payload.map((item)=>({...item,isLiked:false}))
          allVideos: updateVideoListWithLikedState(
            state.likedVideos,
            action.payload
          )
        };
      case "ADD_LIKED_VIDEOS":
        return {
          ...state,
          likedVideos: action.payload
        };
      
      // case "UPDATE_LIKED_VIDEOS":
      //   return {
      //     ...state,
      //     likedVideos: action.payload
      //   };
        case "APPEND_ITEM_TO_LIKED_VIDEOS":
          return {
            ...state,
            userLibrary: state.userLibrary.map((item,index)=>
              index===0?
                 {
                  ...item,
                  list:action.payload.list
                 }:item)
          };
      
          case "REMOVE_FROM_LIKED_VIDEOS":
            return {
              ...state,
              userLibrary: state.userLibrary.map((item,index)=>
              index===0?
                 {
                  ...item,
                  list:action.payload.list
                 }:item),
              
              // allVideos: state.allVideos.map((videoItem) =>
              //   videoItem.id === action.payload.videoId
              //     ? {
              //         ...videoItem,
              //         isLiked: false
              //       }
              //     : videoItem
              // )
            };
      
      case "CREATE_PLAYLIST":
        return {
          ...state,
          userLibrary: state.userLibrary.concat(action.payload)
        };
  
      case "APPEND_TO_PLAYLIST":
        return {
          ...state,
          userLibrary: state.userLibrary.map((playlistItem) =>
            playlistItem._id === action.payload.playlistId
              ? {
                  ...playlistItem,
                  list: action.payload.list
                }
              : playlistItem
          )
        };
  
      case "REMOVE_ITEM_FROM_PLAYLIST":
        return {
          ...state,
          userLibrary: state.userLibrary.map((playlistItem) =>
            playlistItem._id === action.payload.playlistId
              ? {
                  ...playlistItem,
                  list:action.payload.list
                }
              : playlistItem
          )
        };
  
      case "DELETE_PLAYLIST":
        return {
          ...state,
          userLibrary:state.userLibrary.filter((playlistItem)=>playlistItem._id!==action.payload.playlistId)
        }
      case "SET_PLAYLIST_ITEM":
        return {
          ...state,
          showComponent: "playlist",
          currentPlayListItem: action.payload.id
        };
      case "SHOW_COMPONENT":
        return {
          ...state,
          showComponent: action.payload,
          currentPlayListItem: ""
        };
  
      default:
        return state;
    }
  }
  function checkIfItemExistsInList(list, productItem) {
    return list.find((item) => item.id === productItem.id) !== undefined;
  }
  function updateVideoListWithLikedState(likedVideos, allVideos) {
    return allVideos.map((item) => {
      if (checkIfItemExistsInList(likedVideos, item)) {
        return { ...item, isLiked: true };
      }
      return { ...item, isLiked: false };
    });
  }
  