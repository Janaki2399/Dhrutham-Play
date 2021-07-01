import { useNavigate } from "react-router";
import { useDataContext } from "../contexts/data-context";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
import { useState } from "react";
import { API_STATUS, API_URL } from "../constants";
import { useToast } from "../contexts/toast-context";

export const useUserActionAPI = () => {
  const { token } = useAuth();
  const { state, dispatch } = useDataContext();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [likeStatus, setLikeStatus] = useState(API_STATUS.IDLE);
  const [unLikeStatus, setUnLikeStatus] = useState(API_STATUS.IDLE);
  const [deleteVideoStatus, setDeleteVideoStatus] = useState(API_STATUS.IDLE);
  const [addVideoStatus, setAddVideoStatus] = useState(API_STATUS.IDLE);
  const [newPlaylistStatus, setNewPlaylistStatus] = useState(API_STATUS.IDLE);

  const likeVideo = async (videoId) => {
    try {
      setLikeStatus(API_STATUS.LOADING);
      const { data, status } = await axios.post(
        `https://dhrutham-play-backend.herokuapp.com/playlist/${state.userLibrary.list[0]._id}`,
        {
          _id: videoId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        setLikeStatus(API_STATUS.SUCCESS);
        dispatch({
          type: "APPEND_ITEM_TO_LIKED_VIDEOS",
          payload: { _id: videoId },
        });
      }
    } catch (error) {
      setLikeStatus(API_STATUS.ERROR);
      showToast("Something went wrong");
    }
  };

  const unLikeVideo = async (videoId, selectedList, setSelectedList) => {
    try {
      setUnLikeStatus(API_STATUS.LOADING);
      const { data, status } = await axios.delete(
        `https://dhrutham-play-backend.herokuapp.com/playlist/${state.userLibrary.list[0]._id}/${videoId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        setUnLikeStatus(API_STATUS.SUCCESS);
        dispatch({
          type: "REMOVE_FROM_LIKED_VIDEOS",
          payload: { _id: videoId },
        });

        if (selectedList._id === state.userLibrary.list[0]._id) {
          setSelectedList((prevState) => {
            return {
              ...prevState,
              list: prevState.list.filter((video) => video._id !== videoId),
            };
          });
        }
      }
    } catch (error) {
      setUnLikeStatus(API_STATUS.ERROR);
      showToast("Something went wrong");
    }
  };

  const addVideoToPlaylist = async (videoId, playlistId, playlistName) => {
    try {
      setAddVideoStatus(API_STATUS.LOADING);
      const { data, status } = await axios.post(
        `https://dhrutham-play-backend.herokuapp.com/playlist/${playlistId}`,
        {
          _id: videoId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        setAddVideoStatus(API_STATUS.SUCCESS);
        dispatch({
          type: "APPEND_TO_PLAYLIST",
          payload: { playlistId: playlistId, videoId: videoId },
        });
        showToast(`Added to ${playlistName} `);
      }
    } catch (error) {
      setAddVideoStatus(API_STATUS.ERROR);
      showToast("Something went wrong");
    }
  };

  const deleteVideoFromPlaylist = async ({
    videoId,
    playlistId,
    playlistName,
    setSelectedList,
  }) => {
    try {
      setDeleteVideoStatus(API_STATUS.LOADING);
      const { data, status } = await axios.delete(
        `https://dhrutham-play-backend.herokuapp.com/playlist/${playlistId}/${videoId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        setDeleteVideoStatus(API_STATUS.SUCCESS);
        showToast(`Removed from ${playlistName}`);
        dispatch({
          type: "REMOVE_ITEM_FROM_PLAYLIST",
          payload: {
            playlistId,
            videoId,
          },
        });
        setSelectedList((prevState) => {
          return {
            ...prevState,
            list: prevState.list.filter((video) => video._id !== videoId),
          };
        });
      }
    } catch (error) {
      setDeleteVideoStatus(API_STATUS.ERROR);
      showToast("Something went wrong");
    }
  };

  const createNewPlaylistAndAddVideo = async (playlistObject) => {
    try {
      setNewPlaylistStatus(API_STATUS.LOADING);
      const { data, status } = await axios.post(
        `https://dhrutham-play-backend.herokuapp.com/library`,
        playlistObject,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        setNewPlaylistStatus(API_STATUS.SUCCESS);
        dispatch({ type: "SET_LIBRARY", payload: data.library });
      }
    } catch (error) {
      setNewPlaylistStatus(API_STATUS.ERROR);
      showToast("Something went wrong");
    }
  };
  const deletePlaylist = async (playlistId, playlistName) => {
    try {
      const { data, status } = await axios.delete(
        `https://dhrutham-play-backend.herokuapp.com/playlist/${playlistId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        showToast(`Deleted ${playlistName}`);
        dispatch({ type: "DELETE_PLAYLIST", payload: { playlistId } });
      }
    } catch (error) {
      showToast("Something went wrong");
    }
  };
  return {
    likeVideo,
    unLikeVideo,
    addVideoToPlaylist,
    deleteVideoFromPlaylist,
    createNewPlaylistAndAddVideo,
    deletePlaylist,
    likeStatus,
    unLikeStatus,
    addVideoStatus,
    deleteVideoStatus,
    newPlaylistStatus,
  };
};
