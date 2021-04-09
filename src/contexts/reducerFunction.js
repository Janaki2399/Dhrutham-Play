import { videoData } from "../data";

export function reducerFunction(state, action) {
    switch (action.type) {
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
        case "APPEND_ITEM_TO_LIKED_VIDEOS":
          return {
            ...state,
            userLibrary: state.userLibrary.map((item,index)=>
              index===0?
                 {
                  ...item,
                  list:item.list.concat(action.payload)
                 }:item),
            allVideos: state.allVideos.map((videoItem) =>
              videoItem.id === action.payload.videoId
                ? {
                    ...videoItem,
                    isLiked: true
                  }
                : videoItem
            )
          };
      
          case "REMOVE_FROM_LIKED_VIDEOS":
            return {
              ...state,
              userLibrary: state.userLibrary.map((item,index)=>
              index===0?
                 {
                  ...item,
                  list:item.list.filter((item)=>item.videoId !== action.payload.videoId)
                 }:item),
              
              allVideos: state.allVideos.map((videoItem) =>
                videoItem.id === action.payload.videoId
                  ? {
                      ...videoItem,
                      isLiked: false
                    }
                  : videoItem
              )
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
            playlistItem.id === action.payload.playlistId
              ? {
                  ...playlistItem,
                  list: playlistItem.list.concat({videoId:action.payload.videoId})
                }
              : playlistItem
          )
        };
  
      case "REMOVE_ITEM_FROM_PLAYLIST":
        return {
          ...state,
          userLibrary: state.userLibrary.map((playlistItem) =>
            playlistItem.id === action.payload.playlistId
              ? {
                  ...playlistItem,
                  list: playlistItem.list.filter(
                    (videoItem) => videoItem.videoId !== action.payload.videoId
                  )
                }
              : playlistItem
          )
        };
  
      case "DELETE_PLAYLIST":
        return {
          ...state,
          userLibrary:state.userLibrary.filter((playlistItem)=>playlistItem.id!==action.payload.playlistId)
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
  