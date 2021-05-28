export function reducerFunction(state, action) {
  switch (action.type) {
    case "SET_LIBRARY":
      return {
        ...state,
        userLibrary: action.payload,
      };

    case "SET_SELECTED_LIST":
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case "REMOVE_ITEM_FROM_SELECTED_PLAYLIST":
      return {
        ...state,
        selectedCategory: {
          ...state.selectedCategory,
          list: state.selectedCategory.list.filter(
            (item) => item._id !== action.payload
          ),
        },
      };

    // case "ADD_ALL_VIDEOS":
    //   return {
    //     ...state,
    //     // allVideos:action.payload.map((item)=>({...item,isLiked:false}))
    //     allVideos: updateVideoListWithLikedState(
    //       state.likedVideos,
    //       action.payload
    //     ),
    //   };
    case "ADD_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: action.payload,
      };
    case "APPEND_ITEM_TO_LIKED_VIDEOS":
      return {
        ...state,
        userLibrary: {
          ...state.userLibrary,
          list: state.userLibrary.list.map((item, index) =>
            index === 0
              ? {
                  ...item,
                  list: item.list.concat(action.payload),
                }
              : item
          ),
        },
      };

    case "REMOVE_FROM_LIKED_VIDEOS":
      return {
        ...state,
        userLibrary: {
          ...state.userLibrary,
          list: state.userLibrary.list.map((item, index) =>
            index === 0
              ? {
                  ...item,
                  list: item.list.filter(
                    (item) => item._id !== action.payload._id
                  ),
                }
              : item
          ),
        },
      };

    case "CREATE_PLAYLIST":
      return {
        ...state,
        userLibrary: state.userLibrary.concat(action.payload),
      };

    case "APPEND_TO_PLAYLIST":
      return {
        ...state,
        userLibrary: {
          ...state.userLibrary,
          list: state.userLibrary.list.map((item, index) =>
            item._id === action.payload.playlistId
              ? {
                  ...item,
                  list: item.list.concat(action.payload.videoId),
                }
              : item
          ),
        },
        // return {
        //   ...state,
        //   userLibrary: state.userLibrary.map((playlistItem) =>
        //     playlistItem._id === action.payload.playlistId
        //       ? {
        //           ...playlistItem,
        //           list: action.payload.list,
        //         }
        //       : playlistItem
        //   ),
      };

    case "REMOVE_ITEM_FROM_PLAYLIST":
      return {
        ...state,
        userLibrary: {
          ...state.userLibrary,
          list: state.userLibrary.list.map((item, index) =>
            item._id === action.payload.playlistId
              ? {
                  ...item,
                  list: item.list.filter(
                    (item) => item._id !== action.payload.videoId
                  ),
                }
              : item
          ),
        },
      };

    case "DELETE_PLAYLIST":
      return {
        ...state,
        userLibrary: {
          ...state.userLibrary,
          list: state.userLibrary.list.filter(
            (playlistItem) => playlistItem._id !== action.payload.playlistId
          ),
        },
      };
    case "RESET":
      return {
        selectedCategory: {},
        userLibrary: {},
      };
    default:
      return state;
  }
}
