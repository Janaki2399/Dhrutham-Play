import {Link} from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import {useNavigate} from "react-router-dom";

export function Navbar(){
    const {isUserLoggedIn,setUserLogIn}=useAuth();
    const navigate=useNavigate();
    const logout =()=>{
        setUserLogIn(false);
        navigate("/");
      }
    return (
        <div className="nav navbar-height">
            <Link className="font-size-3 anchor-link text-color-primary cursor-pointer " to="/">Dhrutham Play</Link>
            <div className="nav-list">
                   {!isUserLoggedIn 
                   ?<Link to="/login" className=" nav-item anchor-link margin-right"> Login</Link>
                   :<div className="nav-item cursor-pointer margin-right" onClick={logout}>Logout</div> }
                  <Link className=" nav-item anchor-link" to="/library">My Library</Link>
            </div>   
        </div>
    )
}