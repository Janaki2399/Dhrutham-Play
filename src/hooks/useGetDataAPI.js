import { useNavigate } from "react-router";
import { useDataContext } from "../contexts/data-context";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
import { useState } from "react";
import { API_STATUS, API_URL } from "../constants";

export const useGetDataAPI = () => {
  const { token } = useAuth();
  const { dispatch } = useDataContext();
  const navigate = useNavigate();
  const [categoriesStatus, setCategoriesStatus] = useState(API_STATUS.IDLE);
  const [librariesStatus, setLibrariesStatus] = useState(API_STATUS.IDLE);
  const [categoriesErrorMessage, setCategoriesErrorMessage] = useState("");
  const [librariesErrorMessage, setLibrariesErrorMessage] = useState("");

  const getCategoriesWithoutVideoDetails = async () => {
    try {
      setCategoriesStatus(API_STATUS.LOADING);
      const { data, status } = await axios.get(
        `https://dhrutham-play-backend.herokuapp.com/categories`
      );

      if (status === 200) {
        setCategoriesStatus(API_STATUS.SUCCESS);
        dispatch({
          type: "SET_CATEGORIES_WITHOUT_VIDEO_DETAILS",
          payload: { categories: data.categories },
        });
      }
    } catch (error) {
      setCategoriesStatus(API_STATUS.ERROR);
      setCategoriesErrorMessage(
        "Something went wrong.Could not fetch categories"
      );
    }
  };

  const getLibrariesWithoutVideoDetails = async () => {
    try {
      setLibrariesStatus(API_STATUS.LOADING);
      const { data, status } = await axios.get(
        "https://dhrutham-play-backend.herokuapp.com/library",
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        setLibrariesStatus(API_STATUS.SUCCESS);
        dispatch({ type: "SET_LIBRARY", payload: data.library });
      }
    } catch (error) {
      setLibrariesStatus(API_STATUS.ERROR);
      setLibrariesErrorMessage(
        "Something went wrong.Could not fetch libraries"
      );
    }
  };

  return {
    getCategoriesWithoutVideoDetails,
    getLibrariesWithoutVideoDetails,
    categoriesStatus,
    librariesStatus,
    categoriesErrorMessage,
    librariesErrorMessage,
  };
};
