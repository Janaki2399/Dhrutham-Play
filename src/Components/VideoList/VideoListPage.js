import { useDataContext } from "../../contexts/data-context";
import { LikeButton } from "../LikeButton";
import { SaveButton } from "../SaveButton";
import { Modal } from "./Modal";
import { useParams } from "react-router";
import { useState } from "react";
import { SideBarNav } from "./SidebarNav";
import { ViewVideo } from "./ViewVideo";

export function VideoListPage({ list }) {
  const { id } = useParams();

  const { state } = useDataContext();
  const [modal, setModal] = useState(false);

  const getSelectedCategoryVideos = (id, data) =>
    data.find((item) => item.id === id);

  const selectedCategoryObject = getSelectedCategoryVideos(id, list);
  const [videoId, setVideoId] = useState(
    selectedCategoryObject.list.length > 0
      ? selectedCategoryObject.list[0].videoId
      : ""
  );

  return (
    <div>
      {modal && <Modal videoId={videoId} setModal={setModal} />}
      <div className="grid">
        <main>
          {videoId !== "" && (
            <ViewVideo videoId={videoId} setModal={setModal} />
          )}
        </main>
        <SideBarNav
          playlistId={selectedCategoryObject.id}
          list={selectedCategoryObject.list}
          setVideoId={setVideoId}
          isUserPlayList={list === state.userLibrary ? true : false}
        />
      </div>
    </div>
  );
}
