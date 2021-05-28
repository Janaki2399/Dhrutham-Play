import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "./pages/Login";
import { useDataContext } from "./contexts/data-context";
import { Category } from "./pages/Category";
import { VideoListPage } from "./pages/VideoListPage";
import { Library } from "./pages/Library";
import { SignUp } from "./pages/SignUp";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./contexts/auth-context";

function App() {
  const { state, dispatch } = useDataContext();
  const { token } = useAuth();
  useEffect(() => {
    if (token) {
      (async function () {
        try {
          const { data, status } = await axios.get(
            "https://dhrutham-play-backend.herokuapp.com/library",
            {
              headers: {
                authorization: token,
              },
            }
          );
          console.log({ data });
          if (status === 200) {
            dispatch({ type: "SET_LIBRARY", payload: data.library });
          }
        } catch (error) {
          alert(error);
        }
      })();
    }
  }, [token]);
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Category />} />
        <PrivateRoute path="/library" element={<Library />} />
        <Route
          path="/categories/:id/:videoId"
          element={<VideoListPage listType={"categories"} />}
        />
        <PrivateRoute
          path="/playlist/:id/:videoId"
          element={<VideoListPage listType={"playlist"} />}
        />
      </Routes>
    </div>
  );
}

export default App;
