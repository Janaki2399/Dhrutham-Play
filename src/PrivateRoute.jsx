import { useAuth } from "./contexts/auth-context";
import { Route } from "react-router";
import {Navigate} from "react-router-dom";
export function PrivateRoute({path,element}){
    const {isUserLoggedIn,setUserLogin}=useAuth();
    return (
        isUserLoggedIn?<Route path={path} element={element}/>:<Navigate state={{from:path}} to="/login"/>
    )
}