export function reducerFunction(state, action) {
  switch (action.type) {
    case "SET_LIBRARY":
      return {
        ...state,
        userLibrary: action.payload,
      };

    case "SET_CATEGORIES_WITHOUT_VIDEO_DETAILS":
      return {
        ...state,
        categoriesWithoutVideoDetails: action.payload.categories,
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
                  list: item.list.concat({ _id: action.payload.videoId }),
                }
              : item
          ),
        },
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
        categoriesWithoutVideoDetails: {},
        userLibrary: {},
      };
    default:
      return state;
  }
}
