import { useDataContext } from "../contexts/data-context";
import { Modal } from "../Components/VideoList//Modal";
import { useParams } from "react-router";
import { SideBarNav } from "../Components/VideoList/SidebarNav";
import { ViewVideo } from "../Components/VideoList/ViewVideo";
import {useState,useEffect} from "react";
import axios from "axios";
export function VideoListPage({ listType }) {
  const { id }=useParams();
  const { videoId } = useParams();
 
  const { state,dispatch } = useDataContext();
  const [modal, setModal] = useState(false);

  // const getSelectedCategoryVideos = (id, data) =>
  //   data.find((item) => item.id === id);

  // const selectedCategoryObject = getSelectedCategoryVideos(id, list);
  // const [selectedCategory,setSelectedCategory]=useState({});
  const [viewVideoId, setViewVideoId] = useState(videoId);
  const [videoObject,setVideoObject]=useState({});
  useEffect(() => {
    (async function () {
      try {
        const { data, status } = await axios.get(
          `https://dhrutham-play-backend.janaki23.repl.co/${listType}/${id}/${viewVideoId}`
        );
          
        if (status === 200) {
          dispatch({type:"SET_SELECTED_LIST",payload:data[listType]});
          // setSelectedCategory(data[listType]);
          setVideoObject(data.video);
        }
      } catch (error) {
        alert(error);
      }
    })();
  }, [viewVideoId]);
  return (
    <div>
      {modal && <Modal videoId={videoId} setModal={setModal} />}
      <div className="grid">
        <main>
          {viewVideoId !== "" && (
            <ViewVideo videoObject={videoObject} setModal={setModal}/>
          )}
        </main>
         {state.selectedCategory.list && state.selectedCategory.list.length >0 &&<SideBarNav
          // playlistId={state.selectedCategory._id}
          // list={state.selectedCategory.list}
          // setSelectedCategory={state.setSelectedCategory}
          setVideoId={setViewVideoId}
          isUserPlayList={listType }
        />}
      </div>
    </div>
  );
}
