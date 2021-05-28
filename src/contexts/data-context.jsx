import { createContext, useContext, useReducer } from "react";
import { reducerFunction } from "./reducerFunction";
import axios from "axios";
const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunction, {
    selectedCategory: {},
    userLibrary: {},
  });

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
