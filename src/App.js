import './App.css';
import {Routes,Route} from 'react-router-dom';
import {Navbar } from './Components/Navbar'
import { useDataContext } from './contexts/data-context';
import { Category } from './Components/Category/Category';
import { VideoListPage } from './Components/VideoList/VideoListPage';
import {Library} from './Components/Library/Library';
import {categoryPlayListData} from "./data";

function App() {
  const {state,dispatch}=useDataContext();
 
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const {
  //         data: { videos },
  //         status
  //       } = await axios.get("./api/videos");
  //       if (status === 200) {
  //         dispatch({ type: "ADD_ALL_VIDEOS", payload: videos });
  //         // setVideoId(videos[0].id);
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  
  //   })();
  // }, []);
  return (
    <div className="App">
     <Navbar />
     
     <Routes >
       <Route path='/' element={<Category/>}/>
       <Route path='/library' element={<Library/>}/>
       <Route path='/likedVideos' element={<likedVideos/>}/>
       <Route path='/category/:id' element={<VideoListPage list={categoryPlayListData}/>}/>
       <Route path='/playlist/:id' element={<VideoListPage list={state.userLibrary}/>}/>
     </Routes>
    
  </div>
  );
}

export default App;
