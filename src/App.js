import './App.css';
import {Routes,Route} from 'react-router-dom';
import {Navbar } from './Components/Navbar'
import { useDataContext } from './contexts/data-context';
import { Category } from './Components/Category/Category';
import { VideoListPage } from './Components/VideoList/VideoListPage';
import {Library} from './Components/Library/Library';
import {categoryPlayListData} from "./data";
import {useEffect} from "react";
import axios from "axios";
function App() {
  const {state,dispatch}=useDataContext();
 
  useEffect(() => {
    (async function () {
      try {
        const {
          data,
          status
        } = await axios.get("https://dhrutham-play-backend.janaki23.repl.co/library");
        if (status === 200) {
          dispatch({ type: "SET_LIBRARY", payload: data.library });
          // setVideoId(videos[0].id);
        }
      } catch (error) {
        alert(error);
      }
  
    })();
  }, []);
  return (
    <div className="App">
     <Navbar />
     
     <Routes >
       <Route path='/' element={<Category/>}/>
       <Route path='/library' element={<Library/>}/>
       <Route path='/likedVideos' element={<likedVideos/>}/>
       <Route path='/categories/:id/:videoId' element={<VideoListPage listType={"categories"}/>}/>
       <Route path='/library/:id/:videoId' element={<VideoListPage listType={"library"}/>}/>
     </Routes>
    
  </div>
  );
}

export default App;
