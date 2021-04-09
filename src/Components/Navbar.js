import { useDataContext} from "../contexts/data-context"
import {Link} from "react-router-dom";

export function Navbar(){

    const {dispatch}=useDataContext();

    return (
        <div className="nav navbar-height">
            <div className="font-size-3">Logo</div>
            <div className="nav-list">
                  <Link className="anchor-link margin-right" to="/">Home</Link>
                  <Link className="anchor-link" to="/library">My Library</Link>
            </div>   
        </div>
    )
}