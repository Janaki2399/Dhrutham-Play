import { useDataContext } from "../../contexts/data-context";
import { LikeButton } from "../LikeButton";
import { SaveButton } from "../SaveButton";
import { Modal } from "./Modal";
import { useParams } from "react-router";
import { SideBarNav } from "./SidebarNav";
import { ViewVideo } from "./ViewVideo";
import {useState,useEffect} from "react";
import axios from "axios";
export function LibraryPlayList({ listType }) {
  const { id }=useParams();
  const { videoId } = useParams();
 
  const { state } = useDataContext();
  const [modal, setModal] = useState(false);

  const getSelectedCategoryVideos = (id, data) =>
    data.find((item) => item._id === id);

const getSelectedVideo=(id,list)=>{
    list.find((item) => item._id === id);
}

  const selectedCategoryObject = getSelectedCategoryVideos(id, list);
  const selectedVideo=getSelectedVideo(videoId,selectedCategoryObject.list);
//   const [selectedCategory,setSelectedCategory]=useState({});
//   const [viewVideoId, setViewVideoId] = useState(videoId);
//   const [videoObject,setVideoObject]=useState({});
//   useEffect(() => {
//     (async function () {
//       try {
//         const { data, status } = await axios.get(
//           `https://dhrutham-play-backend.janaki23.repl.co/${listType}/${id}/${viewVideoId}`
//         );
          
//         if (status === 200) {
//           setSelectedCategory(data[listType]);
//           setVideoObject(data.video);
//         }
//       } catch (error) {
//         alert(error);
//       }
//     })();
//   }, [viewVideoId]);
  return (
    <div>
      {modal && <Modal videoId={videoId} setModal={setModal} />}
      <div className="grid">
        <main>
          {viewVideoId !== "" && (
            <ViewVideo videoObject={selectedVideo} setModal={setModal} setSelectedCategory={setSelectedCategory}  playlistId={selectedCategory._id}/>
          )}
        </main>
         {selectedCategory.list && selectedCategory.list.length >0 &&<SideBarNav
          playlistId={selectedCategory._id}
          list={selectedCategory.list}
          setVideoId={setViewVideoId}
          isUserPlayList={listType }
        />}
      </div>
    </div>
  );
}
