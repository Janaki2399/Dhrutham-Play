import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "./pages/Login";
import { useDataContext } from "./contexts/data-context";
import { Category } from "./pages/Category";
import { VideoListPage } from "./pages/VideoListPage";
import { Library } from "./pages/Library";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { useEffect } from "react";
import axios from "axios";
import { useToast } from "./contexts/toast-context";
import { Toast } from "./Components/Toast";
import { useAuth } from "./contexts/auth-context";
import { useGetDataAPI } from "./hooks/useGetDataAPI";

function App() {
  const { state, dispatch } = useDataContext();
  const { toast } = useToast();
  const { token } = useAuth();

  const {
    getCategoriesWithoutVideoDetails,
    getLibrariesWithoutVideoDetails,
    categoriesStatus,
    librariesStatus,
    categoriesErrorMessage,
    librariesErrorMessage,
  } = useGetDataAPI();
  useEffect(() => {
    getCategoriesWithoutVideoDetails();
  }, []);

  useEffect(() => {
    if (token) {
      getLibrariesWithoutVideoDetails();
    }
  }, [token]);

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} />
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
      {toast !== "" && <Toast message={toast} />}
    </div>
  );
}

export default App;
