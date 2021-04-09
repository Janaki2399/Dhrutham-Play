import { createContext, useContext, useReducer } from "react";
import { reducerFunction } from "./reducerFunction";
import {v4} from "uuid";
import axios from "axios";
const dataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, {
    allVideos: [{
      id: "ShZ978fBl6Y",
      name: "Calum Scott - You Are The Reason",
      isLiked:false
    },
    {
      id: "60ItHLz5WEA",
      name: "Alan Walker - Faded",
      isLiked:false
    },
    {
      id: "BKx_B1VZ2kw",
      name: "Ae Watan - Full Video | Raazi |",
      isLiked:false
    },
    {
      id:"BKx_B1VZ2kw",
      name: "Imagine Dragons - Believer (with lyrics)",
      isLiked:false
    },
    {
      id: "ALZHF5UqnU4",
      name: "Marshmello - Alone (Official Music Video)",
      category:"songs",
      isLiked:false
    },
    {
      id:"nSDgHBxUbVQ",
      name: "Ed Sheeran - Photograph (Official Music Video)",
      category:"songs",
      isLiked:false
    },
    {
      id:"fo_If5EpwZs",
      name: "How To Make A Crème Caramel | MasterChef Canada | MasterChef World",
      isLiked:false
    },
    {
      id:"_wIEVElP8Cw",
      name: "How To Make A Cheesecake | MasterChef Canada | MasterChef World",
      isLiked:false
    },
    {
      id:"DtfwHUiCLag",
      name: "The Pizza Challenge 🍕| MasterChef Canada | MasterChef World,",
      isLiked:false
    },
  
  ],
    categoryPlaylist: [
      {
        id:v4(),
        name:"songs",
        level:"beginner",
        list:[
          {
            videoId:"ShZ978fBl6Y"
          },
          {
            videoId:"60ItHLz5WEA"
          },
          {
            videoId:"BKx_B1VZ2kw"
          },
          {
            videoId:"ALZHF5UqnU4"
          },
          {
            videoId:"nSDgHBxUbVQ"
          }
        ]
      },{
        id:v4(),
        name:"cooking",
        level:"intermediate",
        list:[
          {
            videoId:"fo_If5EpwZs"
          },
          {
            videoId:"_wIEVElP8Cw"
          },
          {
            videoId:"DtfwHUiCLag"
          }
        ]
      }
    ],
    userLibrary:[{
      id:v4(),
      name:"liked videos",
      list:[]
    }
    ],
  });

  async function addToListAndServer({ url, list, postItem, dispatchType }) {
    try {
      const { data, status } = await axios.post(`${url}`, postItem);

      if (status === 201) {
        dispatch({ type: dispatchType, payload: data[list] });
      }
    } catch (error) {
      alert(error);
    }
  }
  async function removeFromListAndServer({ url, item, dispatchType }) {
    try {
      const { status } = await axios.delete(`${url}/${item.id}`);
      if (status === 204) {
        dispatch({ type: dispatchType, payload: item });
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <dataContext.Provider
      value={{
        state,
        dispatch,
        addToListAndServer,
        removeFromListAndServer
      }}
    >
      {children}
    </dataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(dataContext);
}
