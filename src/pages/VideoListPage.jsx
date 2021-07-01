import { useDataContext } from "../contexts/data-context";
import { Modal } from "../Components/VideoList//Modal";
import { useParams } from "react-router";
import { SideBarNav } from "../Components/VideoList/SidebarNav";
import { ViewVideo } from "../Components/VideoList/ViewVideo";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/auth-context";
import { API_STATUS } from "../constants";

export function VideoListPage({ listType }) {
  const { id } = useParams();
  const { videoId } = useParams();
  const { token } = useAuth();
  const { state, dispatch } = useDataContext();
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [viewVideoId, setViewVideoId] = useState(videoId);
  const [videoObject, setVideoObject] = useState({});
  const [selectedList, setSelectedList] = useState({});

  useEffect(() => {
    (async function () {
      try {
        setStatus(API_STATUS.LOADING);
        const { data, status } = await axios.get(
          `https://dhrutham-play-backend.herokuapp.com/${listType}/${id}/${viewVideoId}`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        if (status === 200) {
          setStatus(API_STATUS.SUCCESS);

          // dispatch({ type: "SET_SELECTED_LIST", payload: data[listType] });
          setSelectedList(data[listType]);
          setVideoObject(data.video);
        }
      } catch (error) {
        setStatus(API_STATUS.ERROR);
        alert(error);
      }
    })();
  }, [viewVideoId, token, id, dispatch, listType]);

  // if (status === API_STATUS.LOADING) {
  //   return <div className="loader" />;
  // }

  return (
    <div>
      {status === API_STATUS.LOADING && <span className="loader" />}
      {modal && <Modal videoId={videoId} setModal={setModal} />}
      <div className="grid">
        <main>
          {viewVideoId !== "" && (
            <ViewVideo
              videoObject={videoObject}
              setModal={setModal}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          )}
        </main>
        {selectedList.list && selectedList.list.length > 0 && (
          <SideBarNav
            setVideoId={setViewVideoId}
            isUserPlayList={listType}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        )}
      </div>
    </div>
  );
}
