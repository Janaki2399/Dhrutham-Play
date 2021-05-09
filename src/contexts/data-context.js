import { createContext, useContext, useReducer } from "react";
import { reducerFunction } from "./reducerFunction";
import {v4} from "uuid";
import axios from "axios";
import {allVideos} from "../data";
const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, {
    allVideos,
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
    <DataContext.Provider
      value={{
        state,
        dispatch,
        addToListAndServer,
        removeFromListAndServer
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
