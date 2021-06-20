import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/data-context";

export function Navbar() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const { state, dispatch } = useDataContext();

  const logout = () => {
    setToken(null);
    localStorage?.removeItem("login");
    dispatch({ type: "RESET" });
    navigate("/");
  };

  return (
    <div className="nav navbar-height">
      <Link
        className="font-size-3 anchor-link text-color-primary cursor-pointer "
        to="/"
      >
        Dhrutham Play
      </Link>
      <div className="nav-list">
        {!token ? (
          <Link to="/login" className=" nav-item anchor-link margin-right">
            {" "}
            Login
          </Link>
        ) : (
          <div
            className="nav-item cursor-pointer margin-right"
            onClick={logout}
          >
            Logout
          </div>
        )}
        <Link className=" nav-item anchor-link" to="/library">
          My Library
        </Link>
      </div>
    </div>
  );
}
